// We launch the game here and prepare things
import Bq from "./Blindquest.js"

const main = function () {
    document.getElementById("msg")
        .textContent = "Game loaded, have fun!"

    const b = Bq("maps/carte_test.json");
    console.log(b);
}

document.addEventListener("DOMContentLoaded", main);