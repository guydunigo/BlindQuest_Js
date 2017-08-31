// We launch the game here and prepare things
import World from "./world.js"

const main = function () {
    document.getElementById("msg")
        .textContent = "Game loaded, have fun!"

    console.log(World("test.txt").data);
}

document.addEventListener("DOMContentLoaded", main);