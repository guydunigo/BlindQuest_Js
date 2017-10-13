export default Display_PopUp;

const Display_PopUp = function () {
    let p;
    p = {
        get isUp() {
            return (document.getElementById("popUp") !== null);
        },
        write(msg) {
            const txt = document.createElement("p");

            const tmp_list = msg.split("\n");
            tmp_list.forEach(function (line) {
                txt.appendChild(document.createTextNode(line));
                txt.appendChild(document.createElement("br"));
            })

            p.popUp(txt);
        },
        popUp(dom_elmt) {
            const popup = document.createElement("div");

            popup.appendChild(dom_elmt);

            popup.id = "popUp";
            popup.style.position = "fixed";
            popup.style.background = "#333E";
            popup.style.top = "10vh";
            popup.style.left = "10vw";
            popup.style.zIndex = "1000";
            popup.style.minWidth = "80%";
            //popup.style.minHeight = "80%";
            popup.style.maxWidth = "80%";
            popup.style.maxHeight = "80%";
            popup.style.padding = "20px";
            popup.style.margin = "auto";

            p.remove()

            document.body.appendChild(popup);
        },
        remove() {
            const tmp = document.getElementById("popUp");
            if (tmp != undefined)
                tmp.parentNode.removeChild(tmp);
        }
    };

    return p;
};