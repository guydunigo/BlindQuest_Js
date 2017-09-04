// Main game loop
export default Bq;

import Interface from "./interface/Interface.js";
import loadWorld from "./world/World.js";

const Bq = function (filename) {
    const bq = {
        world: {},
        interface: {}
    };

    bq.interface = Interface();

    loadWorld(bq, filename);

    return bq;
};