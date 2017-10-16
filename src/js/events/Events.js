// Dealing with events coming from interface.input and others
// it uses a FIFO Array ([].push(x),[].shift())

export default Events;

import opts from "../config.js";

import loadRulesHandlers from "./Events_rules.js";

/* throw ni;
const getParents = function (tree, event) {
    const res = [];
    let tmp = [];
    for (const key of Object.keys(tree)) {
        // If it is a direct child :
        if (tree[key] === event) {
            res.push(key);
            break;
        }
        // Or look in the sub trees
        else if (Object.values(tree[key]).length !== 0) {
            tmp = getParents(tree[key], event);
            if (tmp.length > 0) {
                res.push(key, ...tmp);
                break;
            }
        }
    }
    return res;
}*/

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
        handle: undefined
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
                stop: 2008,
                pause: 2009,
                reset: 2010,
                help: 2011,
                save: 2012
            }
        }
    };

    // Private
    const fifo = [];

    events.add = function (elmt) {
        if (events.isEventGood(elmt)) {
            if (events.handle([elmt], events.instants)) {
                if (opts.DEBUG.EVENTS && opts.DEBUG.EVENTS_EXEC) {
                    bq.interface.disp.console.write("EVENTS INSTANT " + elmt);
                }
            }
            // throw ni; check for an existing rule before adding
            fifo.push(elmt);
            if (opts.DEBUG.EVENTS && opts.DEBUG.EVENTS_ADD) {
                bq.interface.disp.console.write("EVENTS ADDED #" + fifo.length + " " + elmt);
            }
            return elmt;
        }
    }

    events.getNext = function () {
        const res = fifo.shift();
        // bq.interface.disp.console.write("EVENT #" + (fifo.length + 1) + " REMOVED " + res);
        return res;
    }

    events.isIdle = () => fifo.length === 0;

    events.getPendings = function () {
        const res = [];
        while (!events.isIdle()) {
            res.push(events.getNext());
        }
        return res;
    };

    // Get pendings but returns only once each event
    //  if resend_dups it true, call events.add to the doubles.
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