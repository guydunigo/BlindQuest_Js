export default Keyboard;

const Keyboard = function (events) {
    const kb = {
        conf: {
            moves: {
                up: "ArrowUp",
                down: "ArrowDown",
                left: "ArrowLeft",
                right: "ArrowRight"
            },
        }
    }

    /*const genEventHandler = function() {
        return function (event) {
            switch(event.key) {
                case kb.conf.moves.up:
                    events.add(events.types.moves.up);
                    break;
                case kb.conf.moves.down:
                    events.add(events.types.moves.down);
                    break;
                case kb.conf.moves.left:
                    events.add(events.types.moves.left);
                    break;
                case kb.conf.moves.right:
                    events.add(events.types.moves.right);
                    break;
            };
        }
    }*/

    document.addEventListener("keydown", function (event) {
        switch(event.key) {
            case kb.conf.moves.up:
                events.add(events.types.moves.up);
                break;
            case kb.conf.moves.down:
                events.add(events.types.moves.down);
                break;
            case kb.conf.moves.left:
                events.add(events.types.moves.left);
                break;
            case kb.conf.moves.right:
                events.add(events.types.moves.right);
                break;
            default:
                console.log("INPUT KB NOEVENT " + event.key)
        };
    });

    return kb;
}