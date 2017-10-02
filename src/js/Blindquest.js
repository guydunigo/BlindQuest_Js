// Main game loop
export default Bq;

import opts from "./config.js";

import Events from "./events/Events.js";
import Rules from "./rules/Rules.js";
import Interface from "./interface/Interface.js";
import World from "./world/World.js";

import StateMsg from "./rules/Rules_StateMsg.js";

const Bq = function (filename = undefined) {
    const bq = {
        state: 0,
        world: {},
        interface: {},
        rules: {},
        events: {},
        launch: undefined,
        play: undefined,
        states: {
            loaded: 1,
            launched: 2,
            paused: 3,
            stopped: 4
        }
    };

    bq.launch = function () {
        bq.events.add("bq.game.launching");
        if (bq.state === bq.states.loaded) {
            bq.world.launch();
            bq.state = bq.states.launched;
            bq.events.add("bq.game.launched");
            return bq.play();
        }
        else {
            bq.interface.disp.write("BlindQuest is not fully loaded !");
            return bq;
        }
    }

    // Game loop :
    bq.play = function () {
        const events = bq.events.getPendings();

        if (bq.state === bq.states.launched) {
            bq.world.step(bq.world);
            bq.events.handle(events);
        }

        if (bq.state !== bq.states.stopped) {
            // I find this way of doing the loop quite funny ^^
            // It can't provide a reliable time tracking though
            setTimeout(() => bq.play(), opts.TIMEBASE);
        }

        return bq;
    }

    bq.events = Events(bq);
    bq.interface = Interface(bq.events);

    // throw ni; temporary :
    StateMsg(bq);
    bq.events.add("bq.game.loading");

    World(bq, filename === undefined ? opts.BQ.FILENAME: filename).then(function (world) { bq.world = world; return Promise.resolve(); })
        .then(function () { bq.rules = Rules(bq); return Promise.resolve(); })
        .then(function () { bq.state = bq.states.initialized; return Promise.resolve(); })
        .then(function () { bq.events.add("bq.game.loaded"); return Promise.resolve(); })
        .then(function () { bq.launch(); return Promise.resolve(); })

    return bq;
};