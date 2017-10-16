// Defines the World class
export default World;

import opts from "../config.js";

import Env from "./env/Env.js";
import Player from "./player/Player.js";
import Square from "./Square.js";

const clearBehind = function (submap, c_x, c_y, radius) {
    const center_xy = radius;
    let vu = [0, 0]/* unit vector */, hyp = 0;
    let safety_counter = 0;
    let tmp_x = 0, tmp_y = 0;

    vu = [c_x - center_xy, c_y - center_xy];
    hyp = Math.sqrt(vu[0] * vu[0] + vu[1] * vu[1]);
    vu[0] = vu[0] / hyp;
    vu[1] = vu[1] / hyp;

    tmp_x = c_x + vu[0];
    tmp_y = c_y + vu[1];

    while (safety_counter < 100000
        && 0 <= tmp_x && tmp_x <= 2 * radius
        && 0 <= tmp_y && tmp_y <= 2 * radius) {
        submap[Math.round(tmp_y)][Math.round(tmp_x)] = opts.ENV.CODES.border;

        tmp_x += vu[0];
        tmp_y += vu[1];
        safety_counter++;
    }

    return submap;
}

/* Try to open the given filename and extract the world */
// returns : {name:String,data:Array(Array(Number))}
const loadWorldFile = function (world, fileContent) {
    checkWorld(fileContent.world);

    world.name = fileContent.world.name;
    world.data = fileContent.world.data;

    // move that to player constructor ?
    if (fileContent.world.player !== undefined) {
        const p = fileContent.world.player;
        if (p.pos !== undefined) {
            world.player.placeOn(Square(world, ...p.pos));
        }
        if (p.life !== undefined) {
            world.player.life = p.life;
        }
        if (p.damages !== undefined) {
            world.player.damages = p.damages;
        }
    }
    else {
        world.player.placeOn(findStartSquare(world));
    }

    world.isReady = true;

    return world;
};

/* Open world (download json, from fs, local drag,...) */
// returns : json file
const fetchWorldFile = function (name) {
    // throw ni; handle 404
    return fetch(new Request(name)).then((response) => response.json());
};

const checkWorld = function (world) {
    // throw ni + ?tryRepair?

    // Non-empty world name
    if (world.name.length == 0)
        throw new Error("Empty world name.");

    // Every world line must be the same length (rectangles only, sorry circles and co.)
    const refLineSize = world.data[0].length;
    world.data.forEach(
        (line, indexY) => {
            if (line.length != refLineSize)
                throw new Error(`Line ${indexY} isn't the same length as the previous ones.`);
        }
    )
};

const findStartSquare = function (world) {
    let pos = undefined;

    world.data.forEach(function (y, indexY) {
        y.map(function (x, indexX) {
            if (x === world.env.codes.start) {
                pos = [indexX, indexY];
            }
        })
    })
    if (pos === undefined) {
        throw new Error("No start square was found.");
    }

    return Square(world, ...pos);
}

const step = function (world) {
    world;
    // world.steps++;
}

const World = function (bq, filename) {
    const world = {
        isReady: false,
        name: "",
        data: [[]],
        env: {},
        player: {},
        // steps: 0,

        get height() { return world.data.length },
        get width() { return world.data[0].length },
        correctX(x) {
            let i = x;
            if (i < 0) {
                i = world.width - 1 + (i % world.width);
            }
            else if (i > world.width - 1) {
                i %= world.width;
            }
            return i;
        },
        correctY(y) {
            let i = y;
            if (i < 0) {
                i = world.height - 1 + (i % world.height);
            }
            else if (i > world.height - 1) {
                i %= world.height;
            }
            return i;
        },
        getSquare(x, y) {
            return Square(world, x, y);
        },
        getSquareCode(x, y) {
            let i = world.correctX(x), j = world.correctY(y);
            return world.data[j][i];
        },
        getSquareType(x, y) {
            return world.env.code2Type(world.getSquareCode(x, y));
        },
        getSubMap(x1, y1, x2_or_radius, y2) {
            let res = [], tmp, i, j;

            if (y2 === undefined) {
                x1 -= x2_or_radius;
                y1 -= x2_or_radius;
                y2 = y1 + x2_or_radius * 2
                x2_or_radius = x1 + x2_or_radius * 2
            }

            for (j = y1; j <= y2; j++) {
                tmp = []
                for (i = x1; i <= x2_or_radius; i++) {
                    tmp.push(world.data[world.correctY(j)][world.correctX(i)]);
                }
                res.push(tmp);
            }

            return res;
        },
        // Submap but with *hidden* squares behind walls, etc...
        // walking from the center and circling
        // thow ni : non squary submaps
        getProxMap(x, y, radius) {
            const t_start = Date.now();
            let submap = world.getSubMap(x, y, radius);
            if (radius > 1) {
                const center_xy = radius;
                let c_rad = 1, c_x = center_xy, c_y = center_xy - 1, c_code = 0, prev_blocker = false, move = [1, 0];
                while (c_rad < radius) {
                    c_code = submap[c_y][c_x];
                    // if it is defined as a sound blockers, squares behind => border
                    if (Object.keys(opts.ENV.SOUND_BLOCKERS).includes(String(c_code))) {

                        submap = clearBehind(submap, c_x, c_y, radius);

                        // If the previous square was good too, do this with a virtual square between both :
                        if (prev_blocker === true) {
                            submap = clearBehind(submap, c_x - move[0] / 2, c_y - move[1] / 2, radius);
                        }

                        prev_blocker = true;
                    }
                    else {
                        prev_blocker = false;
                    }

                    // move :
                    // if we are at top left of the row, change row :
                    if (c_x === center_xy - c_rad && c_y === center_xy - c_rad) {
                        c_rad++;
                        if (Object.keys(opts.ENV.SOUND_BLOCKERS).includes(String(submap[c_y][c_x + 1]))) {
                            submap = clearBehind(submap, c_x + 1 / 2, c_y, radius);
                        }
                        move = [0, -1];
                    }
                    else if (c_y === center_xy - c_rad && c_x === center_xy - c_rad + 1) {
                        move = [1, 0];
                    }
                    else if (c_y === center_xy - c_rad && c_x === center_xy + c_rad) {
                        move = [0, 1];
                    }
                    else if (c_y === center_xy + c_rad && c_x === center_xy + c_rad) {
                        move = [-1, 0];
                    }
                    else if (c_y === center_xy + c_rad && c_x === center_xy - c_rad) {
                        move = [0, -1];
                    }

                    c_x += move[0]; c_y += move[1];
                }
            }

            if (opts.DEBUG.TIME.GETPROXMAP) {
                bq.interface.disp.console.write("WORLD GETPROXMAP " + (Date.now() - t_start) + "ms");
            }

            return submap;
        },
        getNewCode: undefined,
        isSquareCodeGood(code) {
            return !(opts.BAD_SQUARES_CODES.has(code))
        },
        // Launch music, etc...
        launch() {
            bq.events.add("bq.world.player.moved");
        },
        step
    }
    // Return a new code based on the "good" close squares 
    world.getNewCode = function (square) {
        // N,S,W,E,NW,NE,SW,SE
        const dir_list = [
            [0, -1], [0, 1], [-1, 0], [1, 0],
            [-1, -1], [1, -1], [-1, 1], [1, 1]
        ]
        let res = world.env.codes.plain;
        let code;

        for (const i of dir_list) {
            code = square.apply(i).code;
            if (world.isSquareCodeGood(code)) {
                res = code;
                break;
            }
        }
        return res;
    }

    world.env = Env();
    world.player = Player(bq);

    return fetchWorldFile(filename).then((response) => Promise.resolve(loadWorldFile(world, response)));
};