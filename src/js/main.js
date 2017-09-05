// We launch the game here and prepare things
import Bq from "./Blindquest.js"

const main = function () {
    document.getElementById("msg")
        .textContent = "Game loaded, have fun!"

    const b = Bq("test.txt");

    console.log(b);

    b.play();
}

document.addEventListener("DOMContentLoaded", main);