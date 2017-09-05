// Interfaces different kind of input : keyboard, touch, voice, ...
export default Input;

import Keyboard from "./Input_Keyboard.js"

// throw ni; param : kind of input
const Input = function (events) {
    const input = {
        conf: {
            moves: {
                up: undefined,
                down: undefined,
                left: undefined,
                right: undefined
            }
        },
        devs: {}
    }

    Keyboard(events);

    return input;
};