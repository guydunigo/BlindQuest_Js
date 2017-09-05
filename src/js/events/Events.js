// Dealing with events coming from interface.input and others
// it uses a FIFO Array ([].push(x),[].shift())

export default Events;

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
}

const Events = function () {
    const events = {
        world: {},
        interface: {},
        add: undefined,
        getNext: undefined,
        isIdle: undefined,
        getPendings: undefined,
        filterEventsFrom: undefined
    };

    // those codes' only purpose is to difference them,
    //  they are not meant to be used directly
    //  (ie : bq.events.world.player.up instead of 1)
    events.world = { // 1 -> 1000
        player: { // 1 -> 100
            up: 1,
            down: 2,
            left: 3,
            right: 4
        }
    }
    events.interface = { // 1001 to 2000
        fullscreen: 1001
    }

    // Private
    const fifo = [];

    events.add = function (elmt) {
        fifo.push(elmt);
        console.log("EVENT #" + fifo.length + " ADDED " + elmt);
        return elmt;
    }

    events.getNext = function () {
        const res = getParents(events, fifo.shift());
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
    }

    events.filterEventsFrom = function (category, events) {
        const res = [];
        let tmp;
        for (const ev of events) {
            if (ev[0] === category) {
                [, ...tmp] = ev;
                res.push(tmp);
            }
        }
        return res;
    }

    return events;
};