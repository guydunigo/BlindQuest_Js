export default ShowProxMap;

import opts from "../config.js";
import dispMap from "../dev_tools/Display_Map.js";

const ShowProxMap = function (bq) {
    if (opts.DEV_TOOLS.SHOW_WHOLE_MAP) {
        const rule = {
            name: "bq.world.player.moved showProxMap",
            main: undefined,
            events: [
                "bq.world.player.moved"
            ],
            instant: true,
            data: {
                type_length: 2,
                square_size: "10px",
            }
        }

        rule.main = function (bq, event) {
            event;

            const table = dispMap(
                bq.world.data,
                rule.data.type_length,
                rule.data.square_size,
                bq,
                [bq.world.player.square.x, bq.world.player.square.y]
            );

            if (table !== undefined) {
                table.id = "map";

                table.style.position = "fixed";
                table.style.top = "0";
                table.style.right = "0";
                table.style.zIndex = 100;
                table.style.textAlign = "center";
                table.style.color = "white";
                table.style.fontSize = "0.5em";

                const tmp = document.getElementById("map");
                if (tmp != undefined)
                    tmp.parentNode.removeChild(tmp);

                document.body.appendChild(table);
            }
        };

        bq.events.register(rule);

        return rule;
    }
}
