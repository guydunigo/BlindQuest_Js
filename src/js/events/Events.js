// Dealing with events coming from interface.input and others
// it uses a FIFO Array ([].push(x),[].shift())

export default Events;

const Events = function () {
    const events = {
        types: {},
        add: undefined,
        getNext: undefined,
        isIdle: undefined
    };

    // those codes' only purpose is to difference them,
    //  they are not meant to be used directly
    //  (ie : bq.events.types.moves.up instead of 1)
    events.types = {
        moves: { // from 1 to 10
            up: 1,
            down: 2,
            left: 3,
            right: 4
        }
    }

    // Private
    const fifo = [];

    events.add = function(elmt) {
        fifo.push(elmt);
        console.log("EVENT ADDED " + elmt);
        return elmt;
    }

    events.getNext = function() {
        const tmp = fifo.shift();
        console.log("EVENT REMOVED " + tmp);
        return tmp;
    }

    events.isIdle = () => fifo.length === 0;

    return events;
};