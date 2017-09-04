// Trying to make a modular (easily extensible) rules system
export default loadRules;

import loadMoves from "./Rules_Moves.js";

const loadRules = function(bq) {
    const rules = bq.world.rules = {
        moves: {}
    };

    loadMoves(bq)

    return rules;
}