export default Keyboard;

const Keyboard = function (events) {
    // The conf can be edited anytime during the game
    // through : bq.interface.input.kb.conf.xxx = "z"
    const kb = {
        conf: {
            world: {
                player: {
                    up: "ArrowUp",
                    down: "ArrowDown",
                    left: "ArrowLeft",
                    right: "ArrowRight"
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
            case kb.conf.world.player.up:
                events.add(events.world.player.up);
                break;
            case kb.conf.world.player.down:
                events.add(events.world.player.down);
                break;
            case kb.conf.world.player.left:
                events.add(events.world.player.left);
                break;
            case kb.conf.world.player.right:
                events.add(events.world.player.right);
                break;
            case kb.conf.interface.fullscreen:
                events.add(events.interface.fullscreen)
                break;
            default:
                msg = "NOEVENT ";
        };
        console.log("INPUT KB " + msg + event.key);
    });

    return kb;
}