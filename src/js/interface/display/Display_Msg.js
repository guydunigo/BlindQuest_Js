// Interfaces different kind of input : keyboard, touch, voice, ...
export default Display_Msg;

// import Keyboard from "./Input_Keyboard.js"

const Display_Msg = function () {
    return {
        write(msg) {
            document.getElementById("msg").textContent = msg;
        }
    };
};