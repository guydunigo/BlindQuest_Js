// Trying to make a modular (easily extensible) rules system
export default loadRules;

import loadMove from "./Rules_Move.js";

const loadRules = function (bq) {
    const rules = bq.world.rules = {
        move: {}
    };

    loadMove(bq)

    return rules;
}