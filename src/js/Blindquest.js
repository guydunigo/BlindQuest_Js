// Main game loop
export default Bq;

import Events from "./events/Events.js";
import Rules from "./rules/Rules.js";
import Interface from "./interface/Interface.js";
import World from "./world/World.js";

// miliseconds beetween each game loop
const TIMEBASE = 200;

const Bq = function (filename) {
    const bq = {
        state: "",
        world: {},
        interface: {},
        rules: {},
        events: {},
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
    bq.world = World(bq, filename);
    bq.rules = Rules(bq);

    bq.launch = function () {
        bq.world.launch();
        bq.state = bq.states.running;
        return bq.play();
    }

    bq.play = function () {
        //console.log("\nPLAY\n\n");

        const events = bq.events.getPendings();

        bq.world.step(bq.world);

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
        name: "bq.game.stop",
        events: ["bq.game.stop"],
        main: function (bq) {
            bq.state = bq.states.stopped;
        }
    });

    bq.state = bq.states.initialized;

    return bq;
};