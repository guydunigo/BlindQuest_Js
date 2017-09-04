// We launch the game here and prepare things
import Bq from "./Blindquest.js"

const main = function () {
    document.getElementById("msg")
        .textContent = "Game loaded, have fun!"

    console.log(Bq("test.txt"));
}

document.addEventListener("DOMContentLoaded", main);