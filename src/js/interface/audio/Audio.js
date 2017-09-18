// Audio interface keeping implementation away from the main code.
// (probably using a library (like howlerJs))
export default Audio;

const DEBUG_AUDIO = true;
const DEBUG_AUDIO_STOP = true;
const DEBUG_AUDIO_PLAY = false;

const AUDIO_START_MUTE = true;

// I think you can use a url here :
const audioFold = "audio/"

const extractName = function (howler_obj) {
    return howler_obj._src.replace(/audio\/webm\/([^.\/]*).*/, (x, y) => y)
};

const stringifyList = function (list) {
    return list.map((x) => extractName(x) + "(" + x.volume() + ")").join(", ");
};

const Env = function () {
    let env_sounds = [];

    const stopAll = function () {
        env_sounds.forEach((s) => s.stop());

        if (env_sounds.length > 0 && DEBUG_AUDIO && DEBUG_AUDIO_STOP) {
            const names = stringifyList(env_sounds);
            console.log(`AUDIO ENV STOP ${names}`);
        }

        env_sounds.length = 0;
    }
    const play = function (soundName, volume = 1) {
        const sound = new Howl({
            src: [audioFold + "webm/" + soundName + ".webm",
            audioFold + "mp3/" + soundName + ".mp3"],
            loop: true,
            volume,
            onloaderror: function (id, msg) {
                console.log("AUDIO ERROR " + soundName + " : " + msg);
            }
        });
        env_sounds.push(sound);

        sound.play();
        if (DEBUG_AUDIO && DEBUG_AUDIO_PLAY) {
            console.log(`AUDIO ENV PLAY ${soundName} VOL ${volume}`);
        }
    }

    return {
        env_sounds,
        play,
        stopAll,
        debug_printAll() {
            if (DEBUG_AUDIO) {
                console.log("AUDIO ENV PLAY " + stringifyList(env_sounds));
            }
        }
    }
}

const Audio = function () {
    let ismute = false;

    const audio = {
        players: {
            env: Env()
        },
        get isMute() { return ismute; },
        set isMute(val) {
            ismute = val;
            if (DEBUG_AUDIO) {
                console.log("AUDIO " + (audio.isMute ? "MUTE" : "DE-MUTE"));
            }
            Howler.mute(val);
            return ismute;
        },
        toggleMute: undefined
    }

    audio.isMute = AUDIO_START_MUTE;

    audio.toggleMute = function () {
        audio.isMute ^= true;
    };

    return audio;
};