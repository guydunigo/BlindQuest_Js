// Will deal with input, audio and display interfaces
export default Interface;

import Input from "./input/Input.js";
import Audio from "./audio/Audio.js";
import Display from "./display/Display.js";

const Interface = function (events) {
    const inter = {
        input: Input(events),
        audio: Audio(),
        disp: Display(),
    };

    return inter;
};