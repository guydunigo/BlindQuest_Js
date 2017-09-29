// We launch the game here and prepare things
import Bq from "./Blindquest.js"

const main = function () {
    const b = Bq("maps/carte_test.json");
    console.log(b);
}

document.addEventListener("DOMContentLoaded", main);