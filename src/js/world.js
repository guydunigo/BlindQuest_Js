// Defines the World class
export default World;

import TEST_MAP from "./tests/test_world.js";
import env from "./tests/test_env.js";

/* Try to open the given filename and extract the world */
// returns : {name:String,data:Array(Array(Number))}
const loadWorld = function (filename) {
    const fileContent = fetchWorld(filename);

    checkWorldPreExtract(fileContent.raw_data);

    const world = extractWorld(fileContent.raw_data);

    checkWorldPostExtract(world);

    return world;
}

/* Open world (download json, from fs, local drag,...) */
// returns : {filename:String,raw_data:String}
const fetchWorld = function (name) {
    // throw ni
    name;
    return TEST_MAP;
}

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
}

/* Check world file content conformity (stability/security ?) */
const checkWorldPreExtract = function (raw_data) {
    // throw ni + ?tryRepair?
    return raw_data;
}
const checkWorldPostExtract = function (world) {
    // throw ni + ?tryRepair?

    // Non-empty world name
    if (world.name.length == 0)
        throw new Error("Empty world name.");

    // Every world line must be the same length (rectangles only, sorry)
    const refLineSize = world.data[0].length;
    world.data.map(
        (line, indexY) => {
            if (line.length != refLineSize)
                throw new Error(`Line ${indexY} isn't the same length as the previous ones.`);
        }
    )
}

const World = function (filename) {
    const world = loadWorld(filename);
    world.env = env;

    return world;
}