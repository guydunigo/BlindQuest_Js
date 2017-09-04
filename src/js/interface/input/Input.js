// Interfaces different kind of input : keyboard, touch, voice, ...
export default Input;

import Keyboard from "./Input_Keyboard.js"

// throw ni; param : kind of input
const Input = function () {
    const input = {
        moves: {
            up: [],
            down: [],
            left: [],
            right: []
        },
        devs: {}
    }

    Keyboard(input);

    return input;
};