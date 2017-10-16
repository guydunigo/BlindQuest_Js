// Main game loop
export default Bq;

import opts from "./config.js";

import Events from "./events/Events.js";
import Rules from "./rules/Rules.js";
import Interface from "./interface/Interface.js";
import World from "./world/World.js";

import StateMsg from "./rules/Rules_StateMsg.js";

const Bq = function () {
    const bq = {
        state: 0,
        // src might be set temporarily before bq.load is called to override default value (eg. load world or save).
        // After bq.load, it is set back to undefined.
        src: undefined,
        world: { not_loaded: true },
        interface: { not_loaded: true },
        rules: { not_loaded: true },
        events: { not_loaded: true },
        reset: undefined, // set and reset are on a boat...
        load: undefined,
        launch: undefined,
        play: undefined,
        prev_time: Date.now(),
        states: {
            init: 0,
            loaded: 1,
            launched: 2,
            paused: 3,
            stopped: 4,
            won: 5
        }
    };

    bq.load = function (bq) {
        const t_start = Date.now();

        if ((!opts.DEBUG.DISABLE) && opts.DEBUG.BQ) {
            console.log(bq);
        }

        bq.events = Events(bq);
        if (!bq.interface.not_loaded) {
            document.removeEventListener("keydown", bq.interface.input.kb.keydown);
            bq.interface.audio.stopAll();
        }
        bq.interface = Interface(bq.events);

        // throw ni; temporary :
        StateMsg(bq);
        bq.events.add("bq.game.state.loading");

        if (bq.src === undefined) {
            bq.src = opts.BQ.FILENAME;
        }

        World(bq).then(function (world) { bq.world = world; return Promise.resolve(); })
            .then(function () { bq.rules = Rules(bq); return Promise.resolve(); })
            .then(function () { bq.events.add("bq.game.state.loaded"); return Promise.resolve(); })
            .then(function () { bq.launch(); return Promise.resolve(); })
            .then(function () {
                if (opts.DEBUG.TIME.LOAD) {
                    bq.interface.disp.console.write("BQ LOADED IN " + (Date.now() - t_start) + "ms");
                }
                return Promise.resolve();
            });
    }

    // Couldn't find a proper name : "(re)load", "(re)set" ?
    bq.reset = function (bq) {
        if (bq.state === bq.states.stopped || bq.state === bq.states.won) {
            bq.load(bq);
        }
        bq.events.add("bq.game.state.init");
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
        if (opts.DEBUG.TIME.BET_LOOPS && (-opts.BQ.TIMEBASE + Date.now() - bq.prev_time) > opts.DEBUG.TIME.LIMIT / 100 * opts.BQ.TIMEBASE) {
            bq.interface.disp.console.write("BQ LOOP AFTER " + (Date.now() - bq.prev_time) + "ms");
        }
        bq.prev_time = Date.now();

        const events = bq.events.getPendingsUniq(true);
        const t_start = Date.now();

        if (bq.state === bq.states.launched) {
            bq.world.step(bq.world);
            bq.events.handle(events);
        }

        if (bq.state === bq.states.launched || bq.state === bq.states.paused) {
            // I find this way of doing the loop quite funny ^^
            // It can't provide a reliable time tracking though
            setTimeout(() => bq.play(), opts.BQ.TIMEBASE - (Date.now() - t_start));
        }
        else if (bq.state === bq.states.init) {
            bq.load(bq);
        }

        if (opts.DEBUG.TIME.LOOP && events.length > opts.DEBUG.TIME.LIMIT) {
            bq.interface.disp.console.write("BQ LOOP DONE IN " + (Date.now() - t_start) + "ms");
        }

        return bq;
    }

    bq.load(bq);

    return bq;
};