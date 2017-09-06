// Main game loop
export default Bq;

import Events from "./events/Events.js"
import Interface from "./interface/Interface.js";
import loadWorld from "./world/World.js";

// miliseconds beetween each game loop
const TIMEBASE = 1000;

const Bq = function (filename) {
    const bq = {
        state: "",
        world: {},
        interface: {},
        launch: undefined,
        play: undefined,
        states: {
            initialized: 1,
            running: 2,
            paused: 3,
            stopped: 4
        }
    };

    bq.events = Events(bq);
    bq.interface = Interface(bq.events);

    loadWorld(bq, filename);

    bq.launch = function () {
        bq.world.launch();
        bq.state = bq.states.running;
        return bq.play();
    }

    bq.play = function () {
        //console.log("\nPLAY\n\n");

        const events = bq.events.getPendings();

        bq.world.step(bq);
        /*bq.interface.step(
            bq.events.filterEventsFrom("interface", events)
        );*/
        bq.events.handle(events);

        if (bq.state !== bq.states.stopped) {
            // I find this way of doing the loop quite funny ^^
            // It can't provide a reliable time tracking though
            setTimeout(() => bq.play(), TIMEBASE);
        }

        return bq;
    }

    // throw ni; temporary :
    bq.events.register({
        name: "game.stop",
        events: ["game.stop"],
        main: function (bq) {
            bq.state = bq.states.stopped;
        }
    });

    bq.state = bq.states.initialized;

    return bq;
};