// Audio interface keeping implementation away from the main code.
// (probably using a library (like howlerJs))
export default Audio;

const Cur_square = function () {
    let square = undefined;

    const stop = function () {
        if (square !== undefined) {
            // console.log(`\tAUDIO SQUARE STOP ${square.type}`);
        }
        square = undefined;
    }
    const play = function (square) {
        stop();

        square = square;
        // console.log(`\tAUDIO SQUARE PLAY ${square.type}`);
    }

    return {
        square,
        play,
        stop
    }
}

const Prox = function () {
    let list = [];

    const stop = function () {
        if (list.length > 0) {
            // console.log(`\tAUDIO PROX STOP ${list.map((x) => x.type)}`);
        }
        list = []
    }
    const play = function (prox_squares) {
        stop();

        list = prox_squares;
        // console.log(`\tAUDIO PROX PLAY ${list.map((x) => x.type)}`);
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
            // console.log(`\tAUDIO ACTION STOP ${square}`);
        }
        square = "";
    }
    const play = function (action_type) {
        stop();

        square = action_type;
        // console.log(`\tAUDIO ACTION PLAY ${action_type}`);
    }

    return {
        square,
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