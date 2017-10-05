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
        world: { not_loaded: true },
        interface: { not_loaded: true },
        rules: { not_loaded: true },
        events: { not_loaded: true },
        reset: undefined, // set and reset are on a boat...
        launch: undefined,
        play: undefined,
        states: {
            loaded: 1,
            launched: 2,
            paused: 3,
            stopped: 4
        }
    };

    // Couldn't find a proper name : "(re)load", "(re)set" ?
    // throw ni; recursive reset ?
    bq.reset = function (bq) {
        if (!bq.events.not_loaded) {
            bq.events.add("bq.game.state.stop");
        }

        bq.rules.dd = false;

        const t_start = Date.now();

        console.log(bq);
        bq.events = Events(bq);
        if (!bq.interface.not_loaded) {
            document.removeEventListener("keydown", bq.interface.input.kb.keydown);
            bq.interface.audio.stopAll();
        }
        bq.interface = Interface(bq.events);

        // throw ni; temporary :
        StateMsg(bq);
        bq.events.add("bq.game.state.loading");

        World(bq, filename === undefined ? opts.BQ.FILENAME : filename).then(function (world) { bq.world = world; return Promise.resolve(); })
            .then(function () { bq.rules = Rules(bq); return Promise.resolve(); })
            .then(function () { bq.events.add("bq.game.state.loaded"); return Promise.resolve(); })
            .then(function () { bq.launch(); return Promise.resolve(); })
            .then(function () {
                if (opts.DEBUG.BQ) {
                    console.log("BQ LOADED IN " + (Date.now() - t_start) + "ms");
                }
                return Promise.resolve();
            });
    };

    bq.launch = function () {
        bq.events.add("bq.game.state.launching");
        if (bq.state === bq.states.loaded) {
            bq.world.launch();
            bq.events.add("bq.game.state.launched");
            return bq.play();
        }
        else {
            bq.interface.disp.write("BlindQuest is not fully loaded !");
            return bq;
        }
    };

    // Game loop :
    bq.play = function () {
        const events = bq.events.getPendingsUniq(true);
        const t_start = Date.now();

        if (bq.state === bq.states.launched) {
            bq.world.step(bq.world);
            bq.events.handle(events);
        }

        if (bq.state === bq.states.launched || bq.state === bq.states.paused) {
            // I find this way of doing the loop quite funny ^^
            // It can't provide a reliable time tracking though
            setTimeout(() => bq.play(), opts.TIMEBASE);
        }

        if (opts.DEBUG.BQ && opts.DEBUG.BQ_PLAY_LOOP) {
            console.log("BQ LOOP DONE IN " + (Date.now() - t_start) + "ms");
        }

        return bq;
    }

    bq.reset(bq);

    return bq;
};