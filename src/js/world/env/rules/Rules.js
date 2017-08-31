// Trying to make a modular (easily extensible) rules system
export default Rules;

import Moves from "./Rules_Moves.js";

const Rules = function(bq) {
    return {
        move: Moves(bq)
    };
}