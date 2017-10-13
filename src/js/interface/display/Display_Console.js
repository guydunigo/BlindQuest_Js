export default Display_Console;

import opts from "../../config.js";

const formatDebug = function (msg, length_total, length_limits) {
    const spaces = (length_total - msg.length - length_limits * 2) / 2;
    let lims = "";
    for (let i = 0; i < length_limits; i++) {
        lims += "#";
    }
    let spaces_r = "";
    for (let i = 0; i <= spaces - 1; i++) {
        spaces_r += " ";
    }
    let spaces_l = spaces_r + ((spaces % 1 !== 0) ? " " : "");

    return lims + spaces_l + msg + spaces_r + lims;
}

const Display_Console = function () {
    return {
        write(msg) {
            if (!opts.DEBUG.DISABLE) {
                console.log(msg);
            }
        },
        writeState(msg, length_total = 30, length_limits = 9) {
            if (!opts.DEBUG.DISABLE) {
                console.log(formatDebug(msg, length_total, length_limits));
            }
        },
    };
};