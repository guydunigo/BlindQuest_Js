// Interfaces different kind of input : keyboard, touch, voice, ...
export default Display;

import Msg from "./Display_Msg.js"

const Display = function () {
    const disp = {
        msg: Msg(),
        write: undefined
    };

    disp.write = function (msg, debugMsg = undefined) {
        disp.msg.write(msg);
        console.log(debugMsg === undefined ? msg : debugMsg);
    }

    return disp;
};