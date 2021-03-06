// Dealing with events coming from interface.input and others
// Fires events and call the rules attached to them
// it uses a FIFO Array ([].push(x),[].shift())

export default Events;

import opts from "../config.js";

import loadRulesHandlers from "./Events_rules.js";

// Events constructor
// Args :
//     bq : the bq object
// Returns : the events object
const Events = function (bq) {
    const events = {
        model: {},
        rules: {},
        instants: {},
        add: undefined,
        getNext: undefined,
        isIdle: undefined,
        getPendings: undefined,
        getPendingsUniq: undefined,
        isEvendGood: undefined,
        getParentsTree: undefined,
        filterEventsFrom: undefined,
        eventIsA/*belle a les yeux bleus*/: undefined,
        register: undefined,
        handle: undefined,
        // Cleans the events related stuff (in case of a whole reset for instance)
        // Args : none
        // Returns : nothing
        clean() { /* throw ni; */ }
    };

    // hierarchy of events, use it between quotes with js notation
    // ie : ev = "world.player.move.up"
    // btw : numbers are irrelevant actually
    events.model = {
        bq: {
            world: { // 1 -> 1000
                player: { // 1 -> 100
                    move: {
                        up: 1,
                        down: 2,
                        left: 3,
                        right: 4
                    },
                    moved: 5,
                    bonus: 6,
                    fight_started: 7,
                    attack: 8,
                    damaged: 9,
                    end_fight: 10,
                    life_changed: 11,
                    kill: 12,
                }
            },
            interface: { // 1001 to 2000
                fullscreen: 1001,
                mute: 1002
            },
            game: { // 2001 -> 3001
                state: {
                    init: 2001,
                    launching: 2002,
                    launched: 2003,
                    loading: 2004,
                    loaded: 2005,
                    paused: 2006,
                    stopped: 2007,
                    won: 2008,
                },
                stop: 2009,
                pause: 2010,
                reset: 2011,
                help: 2012,
                save: 2013,
                load: 2014,
            }
        }
    };

    // Private
    const fifo = [];

    // Checks the given event, executes the instants rules and adds it to the pending events list
    // Args :
    //     elmt(string) : event string, eg. "bq.world.player.move.up"
    // Returns : elmt if succeded
    events.add = function (elmt) {
        if (events.isEventGood(elmt)) {
            if (events.handle([elmt], events.instants)) {
                if (opts.DEBUG.EVENTS && opts.DEBUG.EVENTS_EXEC) {
                    bq.interface.disp.console.write("EVENTS INSTANT " + elmt);
                }
            }
            fifo.push(elmt);
            if (opts.DEBUG.EVENTS && opts.DEBUG.EVENTS_ADD) {
                bq.interface.disp.console.write("EVENTS ADDED #" + fifo.length + " " + elmt);
            }
            return elmt;
        }
    }

    // Returns : the next event to be handled in the fifo
    // Args : none
    events.getNext = function () {
        const res = fifo.shift();
        if (opts.DEBUG.EVENTS && opts.DEBUG.EVENTS_REMOVE) {
            bq.interface.disp.console.write("EVENT #" + (fifo.length + 1) + " REMOVED " + res);
        }
        return res;
    }

    // Returns : bool : true is the fifo is empty
    // Args : none
    events.isIdle = () => fifo.length === 0;

    // Returns : string[] : the whole events list in the fifo
    // Args : none
    events.getPendings = function () {
        const res = [];
        while (!events.isIdle()) {
            res.push(events.getNext());
        }
        return res;
    };

    // Returns : string[] : the whole events list in the fifo but only once each event
    // Args :
    //     resend_dups(bool) : if true : adds the duplicates back to the fifo
    events.getPendingsUniq = function (readd_dups = false) {
        const evts = events.getPendings();
        const res = [];

        evts.forEach(function (evt) {
            if (!res.includes(evt)) {
                res.push(evt);
            }
            else if (readd_dups && opts.EVENTS.REPORT_DUPLICATES) {
                events.add(evt);
            }
        });

        return res;
    }

    // Check is event exists in events.model
    events.isEventGood = function (event) {
        let tree = event.split("."), tmp = events.model;
        while (tmp !== undefined && tree.length > 0) {
            tmp = tmp[tree[0]];
            tree = tree.splice(1);
        }

        if (tmp === undefined) {
            if (opts.DEBUG.EVENTS && opts.DEBUG.EVENTS_DIRTY) {
                bq.interface.disp.console.write("EVENTS DIRTY " + event);
            }
        }

        return (tmp !== undefined);
    };

    // Returns a list with the events hierarchy :
    // ie : "world.player.move.up"
    //   >> [ "world", "world.player", "world.player.move", "world.player.move.up" ]
    events.getParentsTree = function (event) {
        const parents = event.split("."), res = [];
        let tmp;
        parents.forEach(function (par) {
            tmp = "";
            if (res.length > 0) {
                tmp = res[res.length - 1] + ".";
            }
            res.push(tmp + par);
        });

        return res;
    }

    // Returns a list containing only the events in the given category
    // the category must be an "absolute" path : world.player
    events.filterEventsFrom = function (category, evts) {
        const res = [];
        let tree;
        evts.forEach(function (ev) {
            tree = events.getParentsTree(ev);
            for (const e of tree) {
                if (category === e) {
                    res.push(ev);
                    break;
                }
            }
        })
        return res;
    };

    events.eventIsA = function (evType, event) {
        const evPar = event.split(".");
        let res = false;
        for (const ev of evPar) {
            if (ev === evType) {
                res = true;
            }
        }

        return res;
    };

    loadRulesHandlers(bq, events);

    return events;
};
