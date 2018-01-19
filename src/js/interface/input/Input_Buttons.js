export default Buttons;

import opts from "../../config.js";

const btn = {
    conf: {
        world: {
            player: {
                move: {
                    up: undefined,
                    down: undefined,
                    left: undefined,
                    right: undefined
                },
                attack: undefined
            }
        },
        interface: {
            fullscreen: undefined,
            mute: undefined,
            pause: undefined
        },
        game: {
            reset: undefined,
            help: undefined,
            save: undefined,
            load: undefined
        },
    }
}

const Buttons = function (events, consoleInterface, popUpInterface) {
    let popUpId = 0;

    const createBtn = function (name, event) {
        const btn = document.createElement("button");
        btn.appendChild(document.createTextNode(name));
        btn.addEventListener("click", () => {
            events.add(event)
            if (opts.DEBUG.BUTTONS) {
                consoleInterface.write("\tINPUT BTNS " + name + " " + event);
            }
        });

        return btn;
    }

    const menu = document.createElement("div");

    menu.appendChild(createBtn("help", "bq.game.help"));

    const padBtn = document.createElement("button");
    padBtn.appendChild(document.createTextNode("Gamepad"))
    padBtn.addEventListener("click", () => {
        if (!(popUpInterface.isUp(popUpId))) {
            const btns = [
                [
                    createBtn("up", "bq.world.player.move.up"),
                    createBtn("down", "bq.world.player.move.down"),
                    createBtn("left", "bq.world.player.move.left"),
                    createBtn("right", "bq.world.player.move.right"),
                    createBtn("attack", "bq.world.player.attack")
                ],
                [
                    createBtn("fullscreen", "bq.interface.fullscreen"),
                    createBtn("mute", "bq.interface.mute")
                ],
                [
                    createBtn("save", "bq.game.save"),
                    createBtn("load", "bq.game.load"),
                    createBtn("pause", "bq.game.pause"),
                    createBtn("reset", "bq.game.reset")
                ]
            ];

            const pad = document.createElement("div");

            btns.forEach(grp => {
                const div = document.createElement("div");
                div.style.margin = "10px";

                grp.forEach(btn => pad.appendChild(btn));

                pad.appendChild(div);
            })

            popUpId = popUpInterface.popUp(pad);
        }
        else {
            popUpInterface.remove();
        }
    });

    menu.appendChild(padBtn);
    document.body.appendChild(menu);

    return undefined;
}