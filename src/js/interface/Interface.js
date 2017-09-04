// Will deal with input, audio and display interfaces
export default Interface;

import Audio from "./audio/Audio.js";

const Interface = function () {
    const inter = {
        input: {},
        audio: Audio(),
        disp: {}
    };

    return inter;
};