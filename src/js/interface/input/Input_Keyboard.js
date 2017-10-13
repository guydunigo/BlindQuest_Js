export default Keyboard;

import opts from "../../config.js";

const Keyboard = function (events, consoleInterface) {
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
            },
            game: {
                reset: "r",
                help: "h",
            },
        },
        keydown: undefined
    }

    kb.keydown = function (event) {
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
            case kb.conf.game.reset:
                events.add("bq.game.reset");
                break;
            case kb.conf.game.help:
            default:
                events.add("bq.game.help");
                msg = "NOEVENT ";
        };
        if (opts.DEBUG.KB) {
            consoleInterface.write("\tINPUT KB " + msg + event.key);
        }
    }

    document.addEventListener("keydown", kb.keydown);

    return kb;
}