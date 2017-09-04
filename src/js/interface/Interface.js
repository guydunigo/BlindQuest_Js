// Will deal with input, audio and display interfaces
export default Interface;

import Input from "./input/Input.js"
import Audio from "./audio/Audio.js";

const Interface = function () {
    const inter = {
        input: Input(),
        audio: Audio(),
        disp: {}
    };

    return inter;
};