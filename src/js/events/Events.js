// Dealing with events coming from interface.input and others
// it uses a FIFO Array ([].push(x),[].shift())

export default Events;

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
            world: {
                player: { // 1 -> 100
                    move: {
                        up: 1,
                        down: 2,
                        left: 3,
                        right: 4
                    }
                }
            },
            interface: { // 1001 to 2000
                fullscreen: 1001,
                mute: 1002
            },
            game: { // 2001 -> 3001
                stop: 2001
            }
        }
    };

    // Private
    const fifo = [];

    events.add = function (elmt) {
        if (events.isEventGood(elmt)) {
            if (events.handle([elmt], events.instants)) {
                console.log("EVENTS INSTANT " + elmt);
            }
            fifo.push(elmt);
            console.log("EVENTS ADDED #" + fifo.length + " " + elmt);
            return elmt;
        }
    }

    events.getNext = function () {
        const res = fifo.shift();
        // console.log("EVENT #" + (fifo.length + 1) + " REMOVED " + res);
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

    // Check is event exists in events.model
    events.isEventGood = function (event) {
        let tree = event.split("."), tmp = events.model;
        while (tmp !== undefined && tree.length > 0) {
            tmp = tmp[tree[0]];
            tree = tree.splice(1);
        }

        if (tmp === undefined)
            console.log("EVENTS DIRTY " + event);

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