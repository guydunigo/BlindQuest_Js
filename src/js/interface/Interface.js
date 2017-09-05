// Will deal with input, audio and display interfaces
export default Interface;

import Input from "./input/Input.js"
import Audio from "./audio/Audio.js";

const Interface = function (events) {
    const inter = {
        input: Input(events),
        audio: Audio(),
        disp: {},
        step(interEvents) {
            for (const ev of interEvents) {
                console.log("INTERFACE EXEC " + ev);
            }
        }
    };

    return inter;
};