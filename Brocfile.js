// Broccoli utils
const funnel = require("broccoli-funnel");
const merge = require("broccoli-merge-trees");
//const concat = require("broccoli-concat");
// Js
const Rollup = require("broccoli-rollup");
const babel = require("broccoli-babel-transpiler");
// Dev utils
const LiveReload = require("broccoli-livereload");
const env = require("broccoli-env").getEnv();
// Options
const root = "src";
const imgsFold = "misc/imgs";
const createSourceMap = (env === "development") ? true : false;

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
    // browserPolyfill: true, // doesn"t work
    sourceMap: createSourceMap,
    compact: "true",
    presets: [["env", {
        target: {
            browsers: "last 2 versions"
        }
    }]]
});

// /* -------------- Grab the polyfill for babel -------------- */
// const babelPolyfillPath = "node_modules/babel-polyfill/dist";
// const babelPolyfillFileName = "polyfill.min.js";
// const babelPolyfill = funnel(babelPolyfillPath, {
//     files: [babelPolyfillFileName],
//     destDir: "babel-polyfill"
// });
// /* --------------------------------------------------------- */
// js = merge([babelPolyfill, js]);
// js = concat(js, {
//     headerFiles: ["babel-polyfill/" + babelPolyfillFileName],
//     inputFiles: ["**/*.js"],
//     outputFile: "script.js",
//     sourceMapConfig: { enabled: createSourceMap }
// })
// /* --------------------------------------------------------- */

/* --------------------------- imgs --------------------------- */
const imgs = funnel(imgsFold, {
    files: ["logo.png"],
    destDir: "imgs"
});

/* --------------------------- end --------------------------- */
let tree = merge([html,/*css,*/js, imgs]);

if (env === "development") {
    tree = new LiveReload(tree, {
        target: "index.html"
    });
}

module.exports = tree;