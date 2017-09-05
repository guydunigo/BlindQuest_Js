// Main game loop
export default Bq;

import Events from "./events/Events.js"
import Interface from "./interface/Interface.js";
import loadWorld from "./world/World.js";

const Bq = function (filename) {
    const bq = {
        world: {},
        interface: {},
        play: undefined
    };

    bq.events = Events();
    bq.interface = Interface(bq.events);

    loadWorld(bq, filename);

    bq.play = function() {
        console.log("\nPLAY");

        while(!bq.events.isIdle()) {
            console.log("     EXEC " + bq.events.getNext());
        }

        // I find this way of doing the loop quite funny ^^
        setTimeout(() => bq.play(),2000);

        return bq;
    }
    console.log(bq.play);

    return bq;
};