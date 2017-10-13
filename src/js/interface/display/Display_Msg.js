export default Display_Msg;

const Display_Msg = function () {
    return {
        write(msg) {
            document.getElementById("msg").textContent = msg;
        }
    };
};