// Root object, deals with the gameloop and such, launches the game when created.
export default Bq;

import opts from "./config.js";

import Events from "./events/Events.js";
import Rules from "./rules/Rules.js";
import Interface from "./interface/Interface.js";
import World from "./world/World.js";

import StateMsg from "./rules/Rules_StateMsg.js";

// bq object contructor : 
// Args :
//     src(string) : path to the map json file
// Returns : the fully loaded and launched bq object
const Bq = function (src) {
    const bq = {
        state: 0,
        // src might be set temporarily before bq.load is called to override default value (eg. load world or save).
        // After bq.load, it is set back to undefined.
        src,
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

    // Loads all the game's componants and launch it
    // Args : none
    // Returns : a promise to the fully loaded and launched bq object
    bq.load = function () {
        const t_start = Date.now();

        if ((!opts.DEBUG.DISABLE) && opts.DEBUG.BQ) {
            console.log(bq);
        }

        if (!bq.events.not_loaded) {
            bq.events.clean();
        }
        if (!bq.interface.not_loaded) {
            bq.interface.clean();
        }
        if (!bq.world.not_loaded) {
            bq.world.clean();
        }
        if (!bq.rules.not_loaded) {
            bq.rules.clean();
        }

        if (bq.src === undefined) {
            bq.src = opts.BQ.FILENAME;
        }

        // --------- Events ---------
        bq.events = Events(bq);

        // --------- Interfaces ---------
        bq.interface = Interface(bq.events);

        // throw ni; temporary :
        StateMsg(bq);
        bq.events.add("bq.game.state.loading");

        // --------- World ---------
        World(bq).then(function (world) { bq.world = world; return Promise.resolve(); })
            // --------- Rules ---------
            .then(function () { bq.rules = Rules(bq); return Promise.resolve(); })

            .then(function () { bq.events.add("bq.game.state.loaded"); return Promise.resolve(); })
            // --------- Finally launching the game ---------
            .then(function () { bq.launch(); return Promise.resolve(); })
            .then(function () {
                if (opts.DEBUG.TIME.LOAD) {
                    bq.interface.disp.console.write("BQ LOADED IN " + (Date.now() - t_start) + "ms");
                }
                return Promise.resolve();
            });
    }

    // Couldn't find a proper name : "(re)load", "(re)set" ?
    //     Triggers the game's whole reset
    // Args : none
    // Returns : nothing
    bq.reset = function () {
        if (bq.state === bq.states.stopped || bq.state === bq.states.won) {
            bq.load(bq);
        }
        bq.events.add("bq.game.state.init");
    };

    // Tries to launch the game :
    //     Launches it only if it is fulled loaded.
    // Args : none
    // Returns : the bq object
    bq.launch = function () {
        bq.events.add("bq.game.state.launching");
        if (bq.state === bq.states.loaded) {
            bq.world.launch();
            bq.events.add("bq.game.state.launched");
            return bq.play();
        }
        else {
            bq.interface.disp.error("BlindQuest is not fully loaded !");
            return bq;
        }
    };

    // Game loop :
    //     Loops unless the gmae is in stopped or won state
    // Returns : bq object
    bq.play = function () {
        if (opts.DEBUG.TIME.BET_LOOPS && (-opts.BQ.TIMEBASE + Date.now() - bq.prev_time) > opts.DEBUG.TIME.LIMIT / 100 * opts.BQ.TIMEBASE) {
            bq.interface.disp.console.write("BQ LOOP AFTER " + (Date.now() - bq.prev_time) + "ms");
        }
        bq.prev_time = Date.now();

        const events = bq.events.getPendingsUniq(true);
        const t_start = Date.now();

        if (bq.state === bq.states.launched) {
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

    bq.load();

    return bq;
};