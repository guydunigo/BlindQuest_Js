// Trying to make a modular (easily extensible) rules system
export default Rules;

import Move from "./Rules_Move.js";
import ToggleFullscreen from "./Rules_ToggleFullscreen.js";

const Rules = function (bq) {
    // throw ni; order them in a tree ?
    const rules = {
        move: Move(bq),
        toggle_fullscreen: ToggleFullscreen(bq)
    };

    return rules;
}