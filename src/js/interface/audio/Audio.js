// Audio interface keeping implementation away from the main code.
// (probably using a library (like howlerJs))
export default Audio;

const Cur_square = function () {
    let name = "";

    const stop = function () {
        console.log(`SQUARE PLAY ${name}`);
        name = "";
    }
    const play = function (square_type) {
        stop();

        name = square_type;
        console.log(`SQUARE PLAY ${square_type}`);
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
        console.log(`PROX STOP ${list}`);
        list = []
    }
    const play = function (prox_squares) {
        stop();

        list = prox_squares;
        console.log(`PROX PLAY ${prox_squares}`);
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
        loadSounds: function (sounds) { console.log("loaded sounds"); return sounds; }
    }

    return audio;
}