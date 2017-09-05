// Interfaces different kind of input : keyboard, touch, voice, ...
export default Input;

import Keyboard from "./Input_Keyboard.js"


const conf = {
    world: {
        player: {
            up: undefined,
            down: undefined,
            left: undefined,
            right: undefined
        },
        interface: {}
    }
}; conf;

// throw ni; param : kind of input
const Input = function (events) {
    const input = {
        kb: undefined
    }

    input.kb = Keyboard(events);

    return input;
};