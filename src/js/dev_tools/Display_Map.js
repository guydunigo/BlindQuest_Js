export default dispMap;

import opts from "../config.js";

const formatType = function (type, type_length) {
    let res;
    if (type.length < type_length) {
        res = type + " " * (type_length - type.length);
    }
    else if (type.length) {
        res = type.slice(0, type_length);
    }

    return res;
}

export const dispMapTxt = function (map, type_length, bq, player_pos = undefined) {
    const table = document.createElement("table");
    let line, cell, content, tmp;

    map.forEach(function (l, li) {
        line = document.createElement("tr");
        l.forEach(function (c, ci) {
            cell = document.createElement("td");
            if (opts.DEV_TOOLS.SHOW_MAP_COLORS) {
                cell.style.color = opts.ENV.COLORS[bq.world.env.code2Type(c)];
            }
            content = document.createTextNode(formatType(bq.world.env.code2Type(c), type_length));
            if (player_pos !== undefined && ci == player_pos.x && li == player_pos.y) {
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

    return table;
};

export const dispMapColor = function (map, square_size, bq, player_pos = undefined) {
    const table = document.createElement("table");
    let line, cell;

    map.forEach(function (l, li) {
        line = document.createElement("tr");
        l.forEach(function (c, ci) {
            cell = document.createElement("td");
            cell.style.height = (cell.style.width = square_size);
            if (opts.DEV_TOOLS.SHOW_MAP_COLORS) {
                cell.style.backgroundColor = opts.ENV.COLORS[bq.world.env.code2Type(c)];
            }

            if (opts.ENV.ROUND.has(bq.world.env.code2Type(c))) {
                cell.style.borderRadius = "100%";
            }
            if (player_pos !== undefined && ci === player_pos[0] && li === player_pos[1]) {
                cell.style.boxShadow = "-2px -2px red, 2px 2px red";
            }
            line.appendChild(cell);
        });
        table.appendChild(line);
    });

    return table;
};

const dispMap = function (map, type_length, square_size, bq, player_pos = undefined) {
    let table;

    switch (opts.DEV_TOOLS.SHOW_MAP_TYPE) {
        case "txt":
            table = dispMapTxt(map, type_length, bq, player_pos);
            break;
        case "square":
            table = dispMapColor(map, square_size, bq, player_pos);
            break;
        default:
            break;
    }

    return table;
}