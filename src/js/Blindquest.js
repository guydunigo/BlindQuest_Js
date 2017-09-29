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

    bq.launch = function () {
        if (bq.state === bq.states.initialized) {
            console.log("Starting BlindQuest...");
            bq.world.launch();
            bq.state = bq.states.running;
            return bq.play();
        }
        else {
            console.log("BlindQuest is not fully initialized !");
            return bq;
        }
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

    bq.events = Events(bq);

    // throw ni; temporary :
    bq.events.register({
        name: "bq.game.stop",
        events: ["bq.game.stop"],
        main: function (bq) {
            bq.state = bq.states.stopped;
        }
    });

    bq.interface = Interface(bq.events);
    World(bq, filename).then(function (world) { bq.world = world; return Promise.resolve(); })
        .then(function () { bq.rules = Rules(bq); return Promise.resolve(); })
        .then(function () { bq.state = bq.states.initialized; return Promise.resolve(); })
        .then(function () { bq.launch(); return Promise.resolve(); })

    return bq;
};