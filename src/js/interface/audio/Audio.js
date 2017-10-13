// Audio interface keeping implementation away from the main code.
// (probably using a library (like howlerJs))
export default Audio;

import opts from "../../config.js";

// I think you can use a url here :
const audioFold = "audio/"

const extractName = function (howler_obj) {
    return howler_obj._src.replace(/audio\/webm\/([^.\/]*).*/, (x, y) => y)
};

const stringifyList = function (list) {
    return list.map((x) => extractName(x) + "(" + x.volume() + ")").join(", ");
};

const keepPlayingTracks = function (list) {
    const res = []
    list.forEach(function (elmt) {
        if (elmt.playing()) {
            res.push(elmt);
        }
    });

    return res;
};

const Env = function (consoleInterface) {
    let prox_sounds = [];
    let player_sound = undefined;

    const stopPlayer = function () {
        if (player_sound !== undefined) {
            player_sound.stop();
            player_sound = undefined;
        }
    }
    const stopProx = function () {
        prox_sounds.forEach((s) => s.stop());

        if (prox_sounds.length > 0 && opts.DEBUG.AUDIO && opts.DEBUG.AUDIO_STOP) {
            const names = stringifyList(prox_sounds);
            consoleInterface.write(`AUDIO ENV STOP ${names}`);
        }

        prox_sounds.length = 0;
    }
    const stopAll = function () {
        stopProx();
        stopPlayer();
    }
    const play = function (soundName, volume = 1) {
        const sound = new Howl({
            src: [audioFold + "webm/" + soundName + ".webm",
            audioFold + "mp3/" + soundName + ".mp3"],
            loop: true,
            volume: volume * opts.AUDIO.VOLUME_ENV,
            onloaderror: function (id, msg) {
                consoleInterface.write("AUDIO ERROR " + soundName + " : " + msg);
            }
        });

        sound.play();
        if (opts.DEBUG.AUDIO && opts.DEBUG.AUDIO_PLAY) {
            consoleInterface.write(`AUDIO ENV PLAY ${soundName} VOL ${volume}`);
        }

        return sound;
    };
    const playPlayer = function (soundName, volume = 1) {
        stopPlayer();
        player_sound = play(soundName, volume * opts.AUDIO.VOLUME_ENV_PLAYER);
    }
    const playProx = function (soundName, volume = 1) {
        prox_sounds.push(play(soundName, volume * opts.AUDIO.VOLUME_ENV_PROX));
    }

    return {
        // prox_sounds,
        // play,
        playPlayer,
        playProx,
        stopPlayer,
        stopProx,
        stopAll,
        debug_printAll() {
            if (opts.DEBUG.AUDIO) {
                consoleInterface.write("AUDIO ENV PLAY " + stringifyList([player_sound, ...prox_sounds]));
            }
        }
    }
}

const Actions = function (consoleInterface) {
    let act_sounds = [];

    const stopAll = function () {
        act_sounds.forEach((s) => s.stop());

        if (act_sounds.length > 0 && opts.DEBUG.AUDIO && opts.DEBUG.AUDIO_STOP) {
            const names = stringifyList(act_sounds);
            consoleInterface.write(`AUDIO ACTION STOP ${names}`);
        }

        act_sounds.length = 0;
    }
    const play = function (soundName, volume = 1, callback = undefined) {
        act_sounds = keepPlayingTracks(act_sounds);

        const sound = new Howl({
            src: [audioFold + "webm/" + soundName + ".webm",
            audioFold + "mp3/" + soundName + ".mp3"],
            onloaderror: function (id, msg) {
                consoleInterface.write("AUDIO ERROR " + soundName + " : " + msg);
            },
            volume: volume * opts.AUDIO.VOLUME_ACTION,
        });
        act_sounds.push(sound);

        sound.play();
        if (opts.DEBUG.AUDIO && opts.DEBUG.AUDIO_PLAY) {
            consoleInterface.write(`AUDIO ACTION PLAY ${soundName}`);
        }

        if (callback !== undefined) {
            sound.on("end", callback);
        }
    }

    return {
        // act_sounds,
        play,
        stopAll,
        debug_printAll() {
            if (opts.DEBUG.AUDIO) {
                consoleInterface.write("AUDIO ENV PLAY " + stringifyList(act_sounds));
            }
        }
    }
}

const Heart = function (consoleInterface) {
    const soundName = "heartbeat";
    let heartbeat = new Howl({
        src: [audioFold + "webm/" + soundName + ".webm",
        audioFold + "mp3/" + soundName + ".mp3"],
        autoplay: false,
        loop: true,
        onloaderror: function (id, msg) {
            consoleInterface.write("AUDIO ERROR " + soundName + " : " + msg);
        },
        volume: opts.AUDIO.VOLUME_HEART,
    });
    heartbeat.pause();

    const pause = function () {
        heartbeat.pause();
    }
    const play = function (volume = 1) {
        heartbeat.volume(volume * opts.AUDIO.VOLUME_HEART);

        if (!heartbeat.playing())
            heartbeat.play();

        if (opts.DEBUG.AUDIO && opts.DEBUG.AUDIO_PLAY) {
            consoleInterface.write("AUDIO HEART PLAY " + heartbeat.volume());
        }
    }

    return {
        // heartbeat,
        play,
        pause,
        stopAll() { heartbeat.stop(); }
    }
}

const Audio = function (consoleInterface) {
    let ismute = false;

    const audio = {
        players: {
            env: Env(consoleInterface),
            actions: Actions(consoleInterface),
            heart: Heart(consoleInterface),
        },
        get isMute() { return ismute; },
        set isMute(val) {
            ismute = val;
            if (opts.DEBUG.AUDIO) {
                consoleInterface.write("AUDIO " + (audio.isMute ? "MUTE" : "DE-MUTE"));
            }
            Howler.mute(val);
            return ismute;
        },
        toggleMute: undefined,
        stopAll: undefined,
    }

    audio.toggleMute = function () {
        audio.isMute ^= true;
    };

    audio.stopAll = function () {
        Object.keys(audio.players).forEach((key) => audio.players[key].stopAll());
    }

    return audio;
};