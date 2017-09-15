export default Keyboard;

const DEBUG_KB = false;

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
                fullscreen: "f",
                mute: "m"
            }
        }
    }

    document.addEventListener("keydown", function (event) {
        let msg = "";
        switch (event.key) {
            case kb.conf.world.player.move.up:
                events.add("bq.world.player.move.up");
                break;
            case kb.conf.world.player.move.down:
                events.add("bq.world.player.move.down");
                break;
            case kb.conf.world.player.move.left:
                events.add("bq.world.player.move.left");
                break;
            case kb.conf.world.player.move.right:
                events.add("bq.world.player.move.right");
                break;
            case kb.conf.interface.fullscreen:
                events.add("bq.interface.fullscreen");
                break;
            case kb.conf.interface.mute:
                events.add("bq.interface.mute");
                break;
            default:
                msg = "NOEVENT ";
        };
        if (DEBUG_KB) {
            console.log("\tINPUT KB " + msg + event.key);
        }
    });

    return kb;
}