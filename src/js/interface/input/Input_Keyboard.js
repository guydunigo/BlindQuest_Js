export default Keyboard;

import opts from "../../config.js";

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
                    },
                    attack: " "
                }
            },
            interface: {
                fullscreen: "f",
                mute: "m",
                pause: "p"
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
            case kb.conf.interface.pause:
                events.add("bq.game.pause");
                break;
            case kb.conf.world.player.attack:
                events.add("bq.world.player.attack");
                break;
            default:
                msg = "NOEVENT ";
        };
        if (opts.DEBUG.KB) {
            console.log("\tINPUT KB " + msg + event.key);
        }
    });

    return kb;
}