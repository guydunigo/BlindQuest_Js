export default ShowProxMap;

import opts from "../config.js";
import dispMap from "../dev_tools/Display_Map.js";

const ShowProxMap = function (bq) {
    if (opts.DEV_TOOLS.SHOW_PROX_MAP) {
        const rule = {
            name: "bq.world.player.moved showProxMap",
            main: undefined,
            events: [
                "bq.world.player.moved"
            ],
            instant: true,
            data: {
                type_length: 2,
                radius: 5,
                square_size: "10px",
            }
        }

        rule.main = function (bq, event) {
            event;

            const pos = bq.world.player.square;
            const prox_map = bq.world.getSubMap(pos.x - rule.data.radius,
                pos.y - rule.data.radius,
                pos.x + rule.data.radius,
                pos.y + rule.data.radius);

            const table = dispMap(
                prox_map,
                rule.data.type_length,
                rule.data.square_size,
                bq,
                [rule.data.radius, rule.data.radius]);

            if (table !== undefined) {
                table.id = "proxMap";

                table.style.position = "fixed";
                table.style.top = "45vh";
                table.style.left = "0";
                // table.style.fontSize = "0.5em";
                table.style.zIndex = 100;
                table.style.textAlign = "center";

                const tmp = document.getElementById("proxMap");
                if (tmp != undefined)
                    tmp.parentNode.removeChild(tmp);

                document.body.appendChild(table);
            }
        };

        bq.events.register(rule);

        return rule;
    }
}
