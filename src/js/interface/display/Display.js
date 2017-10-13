// Interfaces different kind of input : keyboard, touch, voice, ...
export default Display;

import Msg from "./Display_Msg.js";
import PopUp from "./Display_PopUp.js";
import ConsoleLog from "./Display_Console.js";

const Display = function () {
    const disp = {
        msg: Msg(),
        popup: PopUp(),
        console: ConsoleLog(),
        write: undefined,
        writeState: undefined,
    };

    disp.write = function (msg, debugMsg = undefined) {
        disp.msg.write(msg);
        disp.console.write(debugMsg === undefined ? msg : debugMsg);
    }
    disp.writeState = function (
        msg,
        debugMsg = undefined,
        length_total,
        length_limits
    ) {
        disp.msg.write(msg);
        disp.console.writeState(debugMsg === undefined ? msg : debugMsg, length_total, length_limits);
    }

    return disp;
};