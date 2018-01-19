// Will deal with input, audio and display interfaces
export default Interface;

import Input from "./input/Input.js";
import Audio from "./audio/Audio.js";
import Display from "./display/Display.js";

const Interface = function (events) {
    const inter = {
        input: undefined,
        audio: undefined,
        disp: Display(),
        clean: undefined,
    };

    inter.audio = Audio(inter.disp.console);
    inter.input = Input(events, inter.disp.console, inter.disp.popup);

    inter.clean = function () {
        document.removeEventListener("keydown", inter.input.kb.keydown);
        inter.audio.stopAll();
    }

    return inter;
};