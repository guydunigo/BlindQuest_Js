// Dealing with events coming from interface.input and others
// it uses a FIFO Array ([].push(x),[].shift())

export default Events;

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

const Events = function () {
    const events = {
        model: {},
        rules: {},
        add: undefined,
        getNext: undefined,
        isIdle: undefined,
        getPendings: undefined,
        isEvendGood: undefined,
        filterEventsFrom: undefined,
        eventIsA/*belle a les yeux bleus*/: undefined,
        register: undefined
    };

    // hierarchy of events, use it between quotes with js notation
    // ie : ev = "world.player.move.up"
    // btw : numbers are irrelevant actually
    events.model = {
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
            fullscreen: 1001
        }
    };

    // Private
    const fifo = [];

    events.add = function (elmt) {
        if (events.isEventGood(elmt)) {
            fifo.push(elmt);
            console.log("EVENT #" + fifo.length + " ADDED " + elmt);
        }
        return elmt;
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

    // Returns a list containing only the events in the given category
    // the category must be an "absolute" path : world.player
    events.filterEventsFrom = function (category, events) {
        const cats = category.split(".");
        let tmp1 = events, tmp2, evParents;
        let res1 = events, res2;

        cats.forEach(function (cat) {
            res2 = []; tmp2 = [];
            tmp1.forEach(function (ev, index) {
                evParents = ev.split(".");
                if (evParents[0] === cat) {
                    tmp2.push(evParents.splice(1));
                    res2.push(res1[index]);
                }
            });
            tmp1 = tmp2;
            res1 = res2;
        });
        return res1;
    };

    events.eventIsA = function (evType, event) {
        const evPar = event.split(".");
        let res = false;
        for (const ev of evPar) {
            if (ev === evType)
                res = true;
        }

        return res;
    };

    // Possible memory loss ? rule duplicating ?
    //   throw ni; test modifying the one in events and see if it changes in env too.
    events.register = function (rule) {
        const goodTargets = [];
        rule.events.forEach(function (targ) {
            if (events.isEventGood(targ)) {
                goodTargets.push(targ);
            }
        });

        goodTargets.forEach(function (targ) {
            if (events.rules[targ] instanceof Array) {
                events.rules.push(targ);
            }
            else {
                events.rules[targ] = [rule];
            }
            console.log("EVENTS REGISTER " + rule.name + " TO " + targ);
        })
    };

    return events;
};