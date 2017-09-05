export default Keyboard;

const Keyboard = function (events) {
    // The conf can be edited anytime during the game
    // through : bq.interface.input.kb.conf.xxx = "z"
    const kb = {
        conf: {
            world: {
                player: {
                    move: {
                        up: "ArrowUp",
                        down: "ArrowDown",
                        left: "ArrowLeft",
                        right: "ArrowRight"
                    }
                }
            },
            interface: {
                fullscreen: "f"
            }
        }
    }

    document.addEventListener("keydown", function (event) {
        let msg = "";
        switch (event.key) {
            case kb.conf.world.player.move.up:
                events.add("world.player.move.up");
                break;
            case kb.conf.world.player.move.down:
                events.add("world.player.move.down");
                break;
            case kb.conf.world.player.move.left:
                events.add("world.player.move.left");
                break;
            case kb.conf.world.player.move.right:
                events.add("world.player.move.right");
                break;
            case kb.conf.interface.fullscreen:
                events.add("interface.fullscreen")
                break;
            default:
                msg = "NOEVENT ";
        };
        console.log("INPUT KB " + msg + event.key);
    });

    return kb;
}