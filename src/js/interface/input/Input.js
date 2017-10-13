// Interfaces different kind of input : keyboard, touch, voice, ...
export default Input;

import Keyboard from "./Input_Keyboard.js"

const conf = {
    world: {
        player: {
            move: {
                up: undefined,
                down: undefined,
                left: undefined,
                right: undefined
            }
        },
        interface: {
            fullscreen: undefined
        }
    }
}; conf;

// throw ni; param : kind of input
const Input = function (events, consoleInterface) {
    const input = {
        kb: undefined
    }

    input.kb = Keyboard(events, consoleInterface);

    return input;
};