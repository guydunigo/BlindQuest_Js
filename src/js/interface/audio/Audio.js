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

const Env = function () {
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
            console.log(`AUDIO ENV STOP ${names}`);
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
                console.log("AUDIO ERROR " + soundName + " : " + msg);
            }
        });

        sound.play();
        if (opts.DEBUG.AUDIO && opts.DEBUG.AUDIO_PLAY) {
            console.log(`AUDIO ENV PLAY ${soundName} VOL ${volume}`);
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
                console.log("AUDIO ENV PLAY " + stringifyList([player_sound, ...prox_sounds]));
            }
        }
    }
}

const Actions = function () {
    let act_sounds = [];

    const stopAll = function () {
        act_sounds.forEach((s) => s.stop());

        if (act_sounds.length > 0 && opts.DEBUG.AUDIO && opts.DEBUG.AUDIO_STOP) {
            const names = stringifyList(act_sounds);
            console.log(`AUDIO ACTION STOP ${names}`);
        }

        act_sounds.length = 0;
    }
    const play = function (soundName, volume = 1, callback = undefined) {
        act_sounds = keepPlayingTracks(act_sounds);

        const sound = new Howl({
            src: [audioFold + "webm/" + soundName + ".webm",
            audioFold + "mp3/" + soundName + ".mp3"],
            onloaderror: function (id, msg) {
                console.log("AUDIO ERROR " + soundName + " : " + msg);
            },
            volume: volume * opts.AUDIO.VOLUME_ACTION,
        });
        act_sounds.push(sound);

        sound.play();
        if (opts.DEBUG.AUDIO && opts.DEBUG.AUDIO_PLAY) {
            console.log(`AUDIO ACTION PLAY ${soundName}`);
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
                console.log("AUDIO ENV PLAY " + stringifyList(act_sounds));
            }
        }
    }
}

const Heart = function () {
    const soundName = "heartbeat_2";
    let heartbeat = new Howl({
        src: [audioFold + "webm/" + soundName + ".webm",
        audioFold + "mp3/" + soundName + ".mp3"],
        autoplay: false,
        loop: true,
        onloaderror: function (id, msg) {
            console.log("AUDIO ERROR " + soundName + " : " + msg);
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
            console.log("AUDIO HEART PLAY " + heartbeat.volume());
        }
    }

    return {
        // heartbeat,
        play,
        pause
    }
}

const Audio = function () {
    let ismute = false;

    const audio = {
        players: {
            env: Env(),
            actions: Actions(),
            heart: Heart(),
        },
        get isMute() { return ismute; },
        set isMute(val) {
            ismute = val;
            if (opts.DEBUG.AUDIO) {
                console.log("AUDIO " + (audio.isMute ? "MUTE" : "DE-MUTE"));
            }
            Howler.mute(val);
            return ismute;
        },
        toggleMute: undefined
    }
    
    audio.toggleMute = function () {
        audio.isMute ^= true;
    };

    return audio;
};