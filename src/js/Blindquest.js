// Main game loop
export default Bq;

import Events from "./events/Events.js"
import Interface from "./interface/Interface.js";
import loadWorld from "./world/World.js";

// miliseconds beetween each game loop
const TIMEBASE = 5000;

const Bq = function (filename) {
    const bq = {
        world: {},
        interface: {},
        launch: undefined,
        play: undefined
    };

    bq.events = Events();
    bq.interface = Interface(bq.events);

    loadWorld(bq, filename);

    bq.launch = function () {
        bq.world.launch();
        return bq.play();
    }

    bq.play = function () {
        console.log("\nPLAY\n\n");

        const events = bq.events.getPendings();

        bq.world.step(
            bq.events.filterEventsFrom("world", events)
        );
        bq.interface.step(
            bq.events.filterEventsFrom("interface", events)
        );

        // I find this way of doing the loop quite funny ^^
        // It can't provide a reliable time tracking though
        setTimeout(() => bq.play(), TIMEBASE);

        return bq;
    }

    return bq;
};