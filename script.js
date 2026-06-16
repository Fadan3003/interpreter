
        const run = () => {
            document.getElementById("outpoot").innerHTML = `<header style="background-color: gray; user-select: none;"><strong style="color: gray;">H</strong><strong onclick="mini()"> - </strong><strong onclick="oweride()">o </strong><strong onclick="close_app()">x</strong></header>`
            document.getElementById("outpoot").style.backgroundColor = "white";
            eval(document.getElementById("inf").value)
        }

        const close_app = () => {
            document.getElementById("outpoot").innerHTML = ``
            document.getElementById("outpoot").style.backgroundColor = "white"
        }


        const mini = () => {
            document.exitFullscreen();
            document.body.innerHTML = localStorage.getItem("HTML")
            document.getElementById("inf").value = localStorage.getItem("inf")
            document.body.style.backgroundColor = "white"
        }

        function warn(text){
            document.getElementById("popupText").textContent = text
            document.getElementById("popup").style.display = "block"
            document.getElementById("overlay").style.display = "block"
        }

        function closePopup() {
            document.getElementById("overlay").style.display = "none"
            document.getElementById("popup").style.display = "none"
        }

        let promptCallback = null;

        function prompt(text) {
            document.getElementById("promptText").textContent = text
            document.getElementById("promptInput").value = ""
            document.getElementById("popupPrompt").style.display = "block"
            document.getElementById("overlayPrompt").style.display = "block"
        }

        function submitPrompt() {
            const value = document.getElementById("promptInput").value;
            document.getElementById("overlayPrompt").style.display = "none"
            document.getElementById("popupPrompt").style.display = "none"
            last_prompt = value
        }

        function closePrompt() {
            document.getElementById("overlayPrompt").style.display = "none"
            document.getElementById("popupPrompt").style.display = "none"
            if (promptCallback) {
                promptCallback(null);
                promptCallback = null;
            }
        }

        const color = (color) => {
            document.getElementById("outpoot").style.backgroundColor = color
        }

        const show = (text, widht) => {
            if(widht === 1) {
                document.getElementById("outpoot").innerHTML += `<h6>${text}</h6>`
            } else if(widht === 2) {
                document.getElementById("outpoot").innerHTML += `<h5>${text}</h5>`
            } else if(widht === 3) {
                document.getElementById("outpoot").innerHTML += `<h4>${text}</h4>`
            } else if(widht === 4) {
                document.getElementById("outpoot").innerHTML += `<h3>${text}</h3>`
            } else if(widht === 5) {
                document.getElementById("outpoot").innerHTML += `<h2>${text}</h2>`
            } else if(widht === 6) {
                document.getElementById("outpoot").innerHTML += `<h1>${text}</h1>`
            } else {
                alert("the width is not suportet")
            }
        }

        const btn = (innerText, onclick) => {
            document.getElementById("outpoot").innerHTML += `<button class="btn" onclick="${onclick}">${innerText}</button>`
        }

        const input = (prompt) => {
            document.getElementById("outpoot").innerHTML += `<input type="text" placeholder="${prompt}">`
        }

        const case_of = (if_var, eval_var) => {
            if(if_var = true){
                 eval(eval_var)
            }
        }

    
        

        const oweride = () => {
            localStorage.setItem("HTML", document.body.innerHTML);
            localStorage.setItem("inf", document.getElementById("inf").value)
            const out_from = document.getElementById("outpoot").innerHTML
            document.documentElement.requestFullscreen();
            document.body.style.backgroundColor = outpoot.style.backgroundColor;
            document.body.innerHTML = out_from;
            // Popup-Elemente wiederherstellen, damit warn() im Fullscreen funktioniert
            const overlay = document.createElement("div");
            overlay.className = "overlay";
            overlay.id = "overlay";
            overlay.style.display = "none";
            const popup = document.createElement("div");
            popup.className = "popup";
            popup.id = "popup";
            popup.style.display = "none";
            popup.innerHTML = '<h2 id="popupText"></h2><button onclick="closePopup()">ok</button>';
            document.body.appendChild(overlay);
            document.body.appendChild(popup);
            // Prompt-Popup wiederherstellen
            const overlayPrompt = document.createElement("div");
            overlayPrompt.className = "overlay";
            overlayPrompt.id = "overlayPrompt";
            overlayPrompt.style.display = "none";
            const popupPrompt = document.createElement("div");
            popupPrompt.className = "popup";
            popupPrompt.id = "popupPrompt";
            popupPrompt.style.display = "none";
            popupPrompt.innerHTML = '<h2 id="promptText"></h2><input type="text" id="promptInput" style="width: 80%; padding: 5px; margin-bottom: 10px;"><br><button onclick="submitPrompt()">ok</button><button onclick="closePrompt()">cancel</button>';
            document.body.appendChild(overlayPrompt);
            document.body.appendChild(popupPrompt);
        };
