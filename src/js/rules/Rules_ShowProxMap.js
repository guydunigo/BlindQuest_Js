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
            radius: 3
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
        event;
        const div = document.createElement("div");
        const table = document.createElement("table");
        let line, cell, content, tmp;

        div.id = "proxMap";
        const pos = bq.world.player.square;
        const prox_map = bq.world.getSubMap(pos.x - rule.data.radius,
            pos.y - rule.data.radius,
            pos.x + rule.data.radius,
            pos.y + rule.data.radius);

        prox_map.forEach(function (l, li) {
            line = document.createElement("tr");
            l.forEach(function (c, ci) {
                cell = document.createElement("td");
                content = document.createTextNode(formatType(code2Type(c)));
                if (ci == rule.data.radius && li == rule.data.radius) {
                    tmp = document.createElement("strong");
                    tmp.style.color = "red";
                    tmp.appendChild(content);
                    content = tmp;
                }
                cell.appendChild(content);
                line.appendChild(cell);
            });
            table.appendChild(line);
        });

        div.style.position = "fixed";
        div.style.top = "0px";

        div.appendChild(table);

        tmp = document.getElementById("proxMap");
        if (tmp != undefined)
            tmp.parentNode.removeChild(tmp);

        document.body.appendChild(div);
    };

    bq.events.register(rule);

    return rule;
}
