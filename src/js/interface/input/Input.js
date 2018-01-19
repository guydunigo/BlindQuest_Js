// Interfaces different kind of input : keyboard, touch, voice, ...
export default Input;

import Keyboard from "./Input_Keyboard.js"
import Buttons from "./Input_Buttons.js"

const conf = {
    world: {
        player: {
            move: {
                up: undefined,
                down: undefined,
                left: undefined,
                right: undefined
            },
            attack: undefined
        }
    },
    interface: {
        fullscreen: undefined,
        mute: undefined,
        pause: undefined
    },
    game: {
        reset: undefined,
        help: undefined,
        save: undefined,
        load: undefined
    },
}; conf;

const Input = function (events, consoleInterface, popupInterface) {
    const input = {
        kb: Keyboard(events, consoleInterface),
        btns: Buttons(events, consoleInterface, popupInterface)
    }

    return input;
};