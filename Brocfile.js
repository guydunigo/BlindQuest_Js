// Broccoli utils
const funnel = require("broccoli-funnel");
const merge = require("broccoli-merge-trees");
const concat = require("broccoli-concat");
// Js
const Rollup = require("broccoli-rollup");
const babel = require("broccoli-babel-transpiler");
// Dev utils
const LiveReload = require("broccoli-livereload");
const env = require("broccoli-env").getEnv();
// Options
const root = "src";
const imgsFold = "misc/imgs";
const audioFold = "sounds/";
const mapsFold = "maps";

const createSourceMap = (env === "development");

/* --------------------------- html --------------------------- */
const html = funnel(root, {
    files: ["index.html"],
    destDir: "/"
});

/* --------------------------- css --------------------------- */
// const css = funnel(root, {
//         files: ["stylesheet.css"],
//         destDir: "/"
// })

/* --------------------------- js --------------------------- */
let js = funnel(root, {
    include: ["**/*.js"]
});
js = new Rollup(js, {
    inputFiles: ["**/*.js"],
    rollup: {
        entry: "js/main.js",
        dest: "script.js",
        sourceMap: createSourceMap,
        format: "es"
    }
});
js = babel(js, {
    browserPolyfill: true, // doesn"t work
    sourceMap: createSourceMap,
    compact: !createSourceMap,
    comments: createSourceMap,
    presets: [["env", {
        target: {
            browsers: "last 2 versions"
        }
    }]]
});

/* -------------- Grab the howler lib -------------- */
const howlerPath = 'node_modules/howler/dist';
let howlerFileName = 'howler.min.js';
if (createSourceMap) {
    howlerFileName = 'howler.js'
}
const howler = funnel(howlerPath, {
    files: [howlerFileName],
    destDir: 'howler'
});
js = merge([howler, js]);
/* --------------------------------------------------------- */
js = concat(
    js,
    {
        headerFiles: ["howler/" + howlerFileName],
        inputFiles: ['**/*.js'],
        outputFile: 'script.js',
        sourceMapConfig: { enabled: createSourceMap }
    }
)

/* --------------------------------------------------------- */

/* --------------------------- imgs --------------------------- */
const imgs = funnel(imgsFold, {
    files: ["logo_small.png"],
    destDir: "imgs"
});

/* --------------------------- audio --------------------------- */
const audio = funnel(audioFold, {
    exclude: ["wav", "tmp"],
    destDir: "audio"
});

/* --------------------------- maps --------------------------- */
const maps = funnel(mapsFold, {
    destDir: "maps"
});

/* --------------------------- end --------------------------- */
let tree = merge([html,/*css,*/js, imgs, audio, maps]);

// if (env === "development") {
//     tree = new LiveReload(tree, {
//         target: "index.html"
//     });
// }

module.exports = tree;