export default Display_PopUp;

const Display_PopUp = function () {
    let p;
    p = {
        isUp(popUpId) {
            const popups = document.getElementsByClassName("popUp");

            let res = popups.length > 0;

            if (res && popUpId !== undefined) {
                res &= (popups[0].id === popUpId);
            }
            return res;
        },
        write(msg, dom_elmt = undefined) {
            const txt = document.createElement("p");

            const tmp_list = msg.split("\n");
            tmp_list.forEach(function (line) {
                txt.appendChild(document.createTextNode(line));
                txt.appendChild(document.createElement("br"));
            })

            return p.popUp(txt, dom_elmt);
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

            popup.className = "popUp";
            // throw ni; check if id hasn't been given ?
            popup.id = Math.random();
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

            return popup.id;
        },
        remove() {
            for (const popup of document.getElementsByClassName("popUp")) {
                popup.parentNode.removeChild(popup);
            };
        }
    };

    return p;
};