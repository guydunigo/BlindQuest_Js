// Defines the World class
export default loadWorld;

import TEST_MAP from "../tests/test_world.js";
import loadEnv from "./env/Env.js";
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

    world.data.map(function (y, indexY) {
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

const step = function (bq) {
    bq.world.steps++;
}

const loadWorld = function (bq, filename) {
    bq.world = {
        name: "",
        data: [[]],
        env: {},
        player: {},
        steps: 0,

        get height() { return bq.world.data.length },
        get width() { return bq.world.data[0].length },
        correctX(x) {
            let i = x;
            if (i < 0) {
                i = bq.world.width - 1 + (i % bq.world.width);
            }
            else if (i > bq.world.width - 1) {
                i %= bq.world.width;
            }
            return i;
        },
        correctY(y) {
            let i = y;
            if (i < 0) {
                i = bq.world.height - 1 + (i % bq.world.height);
            }
            else if (i > bq.world.height - 1) {
                i %= bq.world.height;
            }
            return i;
        },
        getSquare(x, y) {
            return Square(bq.world, x, y);
        },
        getSquareCode(x, y) {
            let i = bq.world.correctX(x), j = bq.world.correctY(y);
            return bq.world.data[j][i];
        },
        getSquareType(x, y) {
            let i = bq.world.correctX(x), j = bq.world.correctY(y);
            return bq.world.env.codeToType(bq.world.getSquareCode(i, j));
        },
        // Launch music, etc...
        launch() {
            bq.interface.audio.cur_square.play(bq.world.player.square);
        },
        step
    }

    const tmp = loadWorldFile(filename);
    bq.world.name = tmp.name;
    bq.world.data = tmp.data;

    loadEnv(bq);

    bq.world.player = Player(findStartSquare(bq.world));

    return bq.world;
};