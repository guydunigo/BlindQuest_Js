// Defines the World class
export default World;

import TEST_MAP from "../tests/test_world.js";
import Env from "./env/Env.js";
import Player from "./player/Player.js";
import Square from "./Square.js";

/* Try to open the given filename and extract the world */
// returns : {name:String,data:Array(Array(Number))}
const loadWorldFile = function (filename) {
    const fileContent = fetchWorld(filename);

    checkWorldPreExtract(fileContent.raw_data);

    const world = extractWorld(fileContent.raw_data);

    checkWorldPostExtract(world);

    return world;
};

/* Open world (download json, from fs, local drag,...) */
// returns : {filename:String,raw_data:String}
const fetchWorld = function (name) {
    // throw ni
    name;
    return TEST_MAP;
};

/* Extract the world and the worlds name from the raw_world string */
// Raw data follows : 
//  // First line : World name
//  // Others : square codes separated by spaces
// returns : {name:String,data:Array(Array(Number))}
const extractWorld = function (raw_data) {
    const lines = raw_data.split("\n");

    const name = lines[0];

    const dataLines = lines.slice(1);
    const data = dataLines.map(
        x => x.split(" ").map(y => parseInt(y) || 0)
    );

    return {
        name,
        data
    };
};

/* Check world file content conformity (stability/security ?) */
const checkWorldPreExtract = function (raw_data) {
    // throw ni + ?tryRepair?
    return raw_data;
};
const checkWorldPostExtract = function (world) {
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
    world.steps++;
}

const World = function (bq, filename) {
    const world = {
        name: "",
        data: [[]],
        env: {},
        player: {},
        steps: 0,

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
        // Launch music, etc...
        launch() {
            bq.events.add("bq.world.player.moved");
        },
        step
    }

    const tmp = loadWorldFile(filename);
    world.name = tmp.name;
    world.data = tmp.data;

    world.env = Env();

    world.player = Player(findStartSquare(world));

    return world;
};