export default Keyboard;

const Keyboard = function (events) {
    // The conf can be edited anytime during the game
    // through : bq.interface.input.kb.conf.xxx = "z"
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

    document.addEventListener("keydown", function (event) {
        let msg = "";
        switch (event.key) {
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
                msg = "NOEVENT ";
        };
        console.log("INPUT KB " + msg + event.key);
    });

    return kb;
}