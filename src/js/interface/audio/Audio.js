// Audio interface keeping implementation away from the main code.
// (probably using a library (like howlerJs))
export default Audio;

const Cur_square = function () {
    let name = "";

    const stop = function () {
        if (name !== "")
            console.log(`AUDIO SQUARE STOP ${name}`);
        name = "";
    }
    const play = function (square) {
        stop();

        name = square.type;
        console.log(`AUDIO SQUARE PLAY ${name}`);
    }

    return {
        name,
        play,
        stop
    }
}

const Prox = function () {
    let list = [];

    const stop = function () {
        console.log(`AUDIO PROX STOP ${list}`);
        list = []
    }
    const play = function (prox_squares) {
        stop();

        list = prox_squares;
        console.log(`AUDIO PROX PLAY ${prox_squares}`);
    }

    return {
        name,
        play,
        stop
    }
}

const Action = function () {
    let name = "";

    const stop = function () {
        console.log(`AUDIO ACTION PLAY ${name}`);
        name = "";
    }
    const play = function (action_type) {
        stop();

        name = action_type;
        console.log(`AUDIO ACTION PLAY ${action_type}`);
    }

    return {
        name,
        play,
        stop
    }
}

const Audio = function () {
    const audio = {
        cur_square: Cur_square(),
        prox: Prox(),
        action: Action(),
    }

    return audio;
}