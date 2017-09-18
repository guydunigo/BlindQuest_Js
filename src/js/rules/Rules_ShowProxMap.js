export default ShowProxMap;

const ShowProxMap = function (bq) {
    const rule = {
        name: "bq.world.player.moved showProxMap",
        main: undefined,
        events: [
            "bq.world.player.moved"
        ],
        instant: true,
        data: {
            type_length: 2,
            radius: 2
        }
    }

    const formatType = function (type) {
        let res;
        if (type.length < rule.data.type_length) {
            res = type + " " * (rule.data.type_length - type.length);
        }
        else if (type.length) {
            res = type.slice(0, rule.data.type_length);
        }

        return res;
    }
    const code2Type = bq.world.env.code2Type;

    rule.main = function (bq, event) {

        const div = document.createElement("div");
        div.id = "proxMap";
        const pos = bq.world.player.square;
        const prox_map = bq.world.getSubMap(pos.x - rule.data.radius,
            pos.y - rule.data.radius,
            pos.x + rule.data.radius,
            pos.y + rule.data.radius);

        const res = prox_map.map(function (line) {
            const formattedLine = line.map(function (code) {
                return formatType(code2Type(code));
            });
            return formattedLine.join(" ");
        }).join("\n");

        div.textContent = res;
    };

    bq.events.register(rule);

    return rule;
}
