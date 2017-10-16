export default Display_PopUp;

const Display_PopUp = function () {
    let p;
    p = {
        get isUp() {
            return (document.getElementById("popUp") !== null);
        },
        write(msg, dom_elmt = undefined) {
            const txt = document.createElement("p");

            const tmp_list = msg.split("\n");
            tmp_list.forEach(function (line) {
                txt.appendChild(document.createTextNode(line));
                txt.appendChild(document.createElement("br"));
            })

            p.popUp(txt, dom_elmt);
        },
        popUp(...dom_elmts) {
            const popup = document.createElement("div");

            const closeBtn = document.createElement("button");
            closeBtn.textContent = "Close [x]";
            closeBtn.style.position = "absolute";
            closeBtn.style.top = "0";
            closeBtn.style.right = "0";
            closeBtn.style.borderRadius = "0";
            closeBtn.style.border = "none";
            closeBtn.style.background = "none";
            closeBtn.style.color = "#fff";
            closeBtn.onclick = p.remove;

            popup.appendChild(closeBtn);

            dom_elmts.forEach(function (elmt) {
                if (elmt != undefined) {
                    popup.appendChild(elmt);
                }
            })

            popup.id = "popUp";
            popup.style.position = "fixed";
            // Default to non transparant
            popup.style.background = "#333";
            // On Firefox Nightly only apparently : a tad transparant. (useful ?)
            popup.style.backgroundColor = "#333A";
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