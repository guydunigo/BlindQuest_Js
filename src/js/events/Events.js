// Dealing with events coming from interface.input and others
// it uses a FIFO Array ([].push(x),[].shift())

export default Events;

const Events = function () {
    const events = {
        world: {},
        interface: {},
        add: undefined,
        getNext: undefined,
        isIdle: undefined
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
    events.interface = {

    }

    // Private
    const fifo = [];

    events.add = function (elmt) {
        fifo.push(elmt);
        console.log("EVENT #" + fifo.length + " ADDED " + elmt);
        return elmt;
    }

    events.getNext = function () {
        const tmp = fifo.shift();
        console.log("EVENT #" + (fifo.length + 1) + " REMOVED " + tmp);
        return tmp;
    }

    events.isIdle = () => fifo.length === 0;

    return events;
};