// We launch the game here and prepare things
import Bq from "./Blindquest.js"

const main = function () {
    document.getElementById("msg")
        .textContent = "Game loaded, have fun!"

    let b;
    new Promise(function(resolve) {
        b = Bq("maps/carte_test.json");
        console.log(b);
        resolve();
    }).then(() => b.launch())
}

document.addEventListener("DOMContentLoaded", main);