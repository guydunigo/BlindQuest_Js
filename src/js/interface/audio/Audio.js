// Audio interface keeping implementation away from the main code.
// (probably using a library (like howlerJs))
export default Audio;

const DEBUG_AUDIO = true;
const DEBUG_AUDIO_STOP = false;
const AUDIO_START_MUTE = true;

// I think you can use a url here :
const audioFold = "audio/"

const Env = function () {
    let env_sounds = [];

    const stopAll = function () {
        env_sounds.forEach((s) => s.sound.stop());
        env_sounds.length = 0;
        if (DEBUG_AUDIO && DEBUG_AUDIO_STOP) {
            const names = env_sounds.map((x) => x.square.type).join(",");
            console.log(`AUDIO ENV STOP ${names}`);
        }
    }
    const play = function (square, volume) {
        const soundName = square.sound;
        const sound = {
            square,
            sound: new Howl({
                src: [audioFold + "webm/" + soundName + ".webm",
                audioFold + "mp3/" + soundName + ".mp3"],
                loop: true,
                volume,
                onloaderror: function (id, msg) {
                    console.log("AUDIO ERROR " + msg);
                }
            })
        };
        env_sounds.push(sound);

        sound.play();
        if (DEBUG_AUDIO) {
            console.log(`AUDIO SQUARE PLAY ${sound.square.type}`);
        }
    }

    return {
        env_sounds,
        play,
        stopAll
    }
}

const Action = function () {
    let square = "";

    const stop = function () {
        if (square !== "") {
            if (DEBUG_AUDIO && DEBUG_AUDIO_STOP) {
                console.log(`\tAUDIO ACTION STOP ${square}`);
            }
        }
        square = "";
    }
    const play = function (action_type) {
        stop();

        square = action_type;
        if (DEBUG_AUDIO) {
            console.log(`\tAUDIO ACTION PLAY ${action_type}`);
        }
    }

    return {
        square,
        play,
        stop
    }
}

const Audio = function () {
    let ismute = false;

    const audio = {
        players: {
            env: Env(),
            action: Action()
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