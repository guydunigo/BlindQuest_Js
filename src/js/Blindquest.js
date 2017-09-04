// Main game loop
export default Bq;

import loadWorld from "./world/World.js";

const Bq = function(filename) {
    const bq = {
        world: {},
        audio: {},
        interface: {}
    };

    bq.audio;
    bq.interface;

    bq.world = loadWorld(bq,filename);

    return bq;
};