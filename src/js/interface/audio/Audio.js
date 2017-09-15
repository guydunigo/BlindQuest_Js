// Audio interface keeping implementation away from the main code.
// (probably using a library (like howlerJs))
export default Audio;

const DEBUG_AUDIO = true;
const DEBUG_AUDIO_STOP = false;
const AUDIO_START_MUTE = true;

const audioFold = "audio/"

const Cur_square = function () {
    let cur = undefined;

    const stop = function () {
        if (cur !== undefined) {
            if (DEBUG_AUDIO && DEBUG_AUDIO_STOP) {
                console.log(`AUDIO SQUARE STOP ${cur.square.type}`);
            }
            cur.sound.stop();
        }
        cur = undefined;
    }
    const play = function (square) {
        stop();

        const soundName = square.sound;
        cur = {
            square,
            sound: new Howl({
                src: [audioFold + "webm/" + soundName + ".webm",
                audioFold + "mp3/" + soundName + ".mp3"],
                loop: true,
                onloaderror: function (id, msg) {
                    console.log("AUDIO ERROR " + msg);
                }
            })
        }

        cur.sound.play();
        if (DEBUG_AUDIO) {
            console.log(`AUDIO SQUARE PLAY ${cur.square.type}`);
        }
    }

    return {
        cur_square: cur,
        play,
        stop
    }
}

const Prox = function () {
    let list = [];

    const stop = function () {
        if (list.length > 0) {
            if (DEBUG_AUDIO && DEBUG_AUDIO_STOP) {
                console.log(`\tAUDIO PROX STOP ${list.map((x) => x.type)}`);
            }
        }
        list = []
    }
    const play = function (prox_squares) {
        stop();

        list = prox_squares;

        if (DEBUG_AUDIO) {
            console.log(`\tAUDIO PROX PLAY ${list.map((x) => x.type)}`);
        }
    }

    return {
        list,
        play,
        stop
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
            cur_square: Cur_square(),
            prox: Prox(),
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