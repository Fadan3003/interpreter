
        const run = () => {
            document.getElementById("outpoot").innerHTML = `<header style="background-color: gray; user-select: none;"><strong style="color: gray;">H</strong><strong onclick="mini()"> - </strong><strong onclick="oweride()">o </strong><strong onclick="close_app()">x</strong></header>`
            document.getElementById("outpoot").style.backgroundColor = "white";
            fa_events.length = 0
            fa_inputs.length = 0
            try {
                eval(fa_compile(document.getElementById("inf").value))
            } catch (e) {
                const pre = document.createElement("pre")
                pre.style.color = "red"
                pre.textContent = e.message
                document.getElementById("outpoot").appendChild(pre)
            }
        }

        const close_app = () => {
            document.getElementById("outpoot").innerHTML = ``
            document.getElementById("outpoot").style.backgroundColor = "white"
        }


        const mini = () => {
            document.exitFullscreen();
            document.body.innerHTML = localStorage.getItem("HTML")
            document.getElementById("inf").value = localStorage.getItem("inf")
            hl_setup()
            document.body.style.backgroundColor = "white"
        }

        function warn(text, size){
            const sizes = { 1: "0.67em", 2: "0.83em", 3: "1em", 4: "1.17em", 5: "1.5em", 6: "2em" }
            document.getElementById("popupText").style.fontSize = sizes[size] || ""
            document.getElementById("popupText").textContent = text
            document.getElementById("popup").style.display = "block"
            document.getElementById("overlay").style.display = "block"
        }

        function closePopup() {
            document.getElementById("overlay").style.display = "none"
            document.getElementById("popup").style.display = "none"
        }

        let promptCallback = null;

        // prompt { "question", variable }  -> the answer is stored in the variable on "ok"
        function prompt(text, setter) {
            promptCallback = setter || null
            if (setter) setter("", true)   // make sure the variable exists
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
            if (promptCallback) {
                const cb = promptCallback
                promptCallback = null
                cb(value)
            }
        }

        function closePrompt() {
            document.getElementById("overlayPrompt").style.display = "none"
            document.getElementById("popupPrompt").style.display = "none"
            promptCallback = null   // cancel: nothing is stored
        }

        const color = (color) => {
            document.getElementById("outpoot").style.backgroundColor = color
        }

        const show = (text, widht) => {
            if(widht === 1) {
                document.getElementById("outpoot").insertAdjacentHTML("beforeend", `<h6>${text}</h6>`)
            } else if(widht === 2) {
                document.getElementById("outpoot").insertAdjacentHTML("beforeend", `<h5>${text}</h5>`)
            } else if(widht === 3) {
                document.getElementById("outpoot").insertAdjacentHTML("beforeend", `<h4>${text}</h4>`)
            } else if(widht === 4) {
                document.getElementById("outpoot").insertAdjacentHTML("beforeend", `<h3>${text}</h3>`)
            } else if(widht === 5) {
                document.getElementById("outpoot").insertAdjacentHTML("beforeend", `<h2>${text}</h2>`)
            } else if(widht === 6) {
                document.getElementById("outpoot").insertAdjacentHTML("beforeend", `<h1>${text}</h1>`)
            } else {
                alert("the width is not suportet")
            }
        }

        const fa_events = []

        const fa_exec = (e) => {
            if (typeof e === "function") e()
            else if (typeof e === "string") eval(e)
        }

        const fa_run = (i) => fa_exec(fa_events[i])

        // if { cond, then: ..., else: ... }
        const fa_if = (cond, then, other) => {
            if (cond) fa_exec(then)
            else fa_exec(other)
        }

        const btn = (innerText, onclick) => {
            let handler = ""
            if (onclick !== undefined) {
                fa_events.push(onclick)
                handler = `fa_run(${fa_events.length - 1})`
            }
            document.getElementById("outpoot").insertAdjacentHTML("beforeend", `<button class="btn" onclick="${handler}">${innerText}</button>`)
        }

        // input { "placeholder", variable }  -> the text is stored in the variable while typing
        const fa_inputs = []

        const fa_input = (i, value) => fa_inputs[i](value)

        const input = (prompt, setter) => {
            let attrs = ""
            if (setter) {
                setter("", true)   // make sure the variable exists
                fa_inputs.push(setter)
                attrs = ` oninput="fa_input(${fa_inputs.length - 1}, this.value)"`
            }
            document.getElementById("outpoot").insertAdjacentHTML("beforeend", `<input type="text" placeholder="${prompt}"${attrs}>`)
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


        // ---------------------------------------------------------------
        // Fa block syntax:   name { key: value, value, key: name { ... } }
        // is compiled to normal calls before eval:  name(value, value, ...)
        // ---------------------------------------------------------------

        // params = order of the real function arguments
        // lazy   = params that run later (on click), not immediately
        const FA_FUNCS = {
            btn:     { params: ["text", "event"], lazy: ["event"] },
            show:    { params: ["text", "width"] },
            input:   { params: ["prompt", "var"], vars: ["var"] },
            warn:    { params: ["text", "size"] },
            prompt:  { params: ["text", "var"], vars: ["var"] },
            color:   { params: ["color"] },
            case_of: { params: ["if", "do"], lazy: ["do"] },
            if:      { js: "fa_if", params: ["cond", "then", "else"], lazy: ["then", "else"] }
        }

        function fa_skipString(src, i) {
            const q = src[i]
            let j = i + 1
            while (j < src.length) {
                if (src[j] === "\\") j += 2
                else if (src[j] === q) return j + 1
                else j++
            }
            return src.length
        }

        function fa_findClose(src, open) {
            let depth = 0
            for (let i = open; i < src.length; i++) {
                const c = src[i]
                if (c === '"' || c === "'" || c === "`") { i = fa_skipString(src, i) - 1; continue }
                if (src.startsWith("//", i)) { const e = src.indexOf("\n", i); if (e === -1) break; i = e; continue }
                if (src.startsWith("/*", i)) { const e = src.indexOf("*/", i + 2); if (e === -1) break; i = e + 1; continue }
                if (c === "{") depth++
                else if (c === "}") { depth--; if (depth === 0) return i }
            }
            throw new Error("Fa: missing closing }")
        }

        // splits a block body at top-level commas / new lines, drops comments
        function fa_split(body) {
            const parts = []
            let cur = "", depth = 0
            const push = () => { if (cur.trim()) parts.push(cur.trim()); cur = "" }
            for (let i = 0; i < body.length; i++) {
                const c = body[i]
                if (c === '"' || c === "'" || c === "`") { const e = fa_skipString(body, i); cur += body.slice(i, e); i = e - 1; continue }
                if (body.startsWith("//", i)) { const e = body.indexOf("\n", i); i = e === -1 ? body.length : e - 1; continue }
                if (body.startsWith("/*", i)) { const e = body.indexOf("*/", i + 2); i = e === -1 ? body.length : e + 1; cur += " "; continue }
                if ("([{".includes(c)) depth++
                else if (")]}".includes(c)) depth--
                if (depth === 0 && (c === "," || c === "\n")) { push(); continue }
                cur += c
            }
            push()
            return parts
        }

        function fa_value(text, lazy) {
            text = text.trim()
            if (!lazy) return fa_compile(text)

            // event: { warn { "a" }, warn { "b" } }  -> several actions in a row
            if (text[0] === "{" && fa_findClose(text, 0) === text.length - 1) {
                const actions = fa_split(text.slice(1, -1)).map(fa_compile)
                return `() => { ${actions.join("; ")} }`
            }
            // event: warn { "a" }  -> runs on click, not right now
            const m = text.match(/^([A-Za-z_]\w*)\s*\{/)
            if (m && Object.hasOwn(FA_FUNCS, m[1]) && fa_findClose(text, m[0].length - 1) === text.length - 1) {
                return `() => ${fa_compile(text)}`
            }
            return fa_compile(text)
        }

        // is this string literal properly closed? (last quote not escaped)
        function fa_closed(lit) {
            const q = lit[0]
            if (lit.length < 2 || lit[lit.length - 1] !== q) return false
            let k = lit.length - 2, bs = 0
            while (k > 0 && lit[k] === "\\") { bs++; k-- }
            return bs % 2 === 0
        }

        // finds v( ... ) inside s[from, to) -> list of [start, end) ranges
        function fa_vranges(s, from, to) {
            const r = []
            let i = from
            while (i < to - 1) {
                if (s[i] === "\\") { i += 2; continue }
                if (s[i] === "v" && s[i + 1] === "(" && !/[\w$.]/.test(s[i - 1] || "")) {
                    let depth = 0, j = i + 1, q = null
                    for (; j < to; j++) {
                        const c = s[j]
                        if (q) { if (c === "\\") j++; else if (c === q) q = null; continue }
                        if (c === '"' || c === "'" || c === "`") { q = c; continue }
                        if (c === "(") depth++
                        else if (c === ")") { depth--; if (depth === 0) break }
                    }
                    if (j < to) { r.push([i, j + 1]); i = j + 1; continue }
                }
                i++
            }
            return r
        }

        // "Hallo v(name)!"  ->  `Hallo ${name}!`
        function fa_string(lit) {
            if (!fa_closed(lit)) return lit
            const ranges = fa_vranges(lit, 1, lit.length - 1)
            if (!ranges.length) return lit
            const plain = lit[0] === "`"
            const escape = p => {
                if (plain) return p
                let o = ""
                for (let i = 0; i < p.length; i++) {
                    const c = p[i]
                    if (c === "\\") { o += c + (p[i + 1] || ""); i++ }
                    else if (c === "`") o += "\\`"
                    else if (c === "$" && p[i + 1] === "{") o += "\\$"
                    else o += c
                }
                return o
            }
            let out = "`", last = 1
            for (const [a, b] of ranges) {
                const expr = lit.slice(a + 2, b - 1)
                if (!expr.trim()) throw new Error("Fa: v() needs a variable, e.g. v(name)")
                out += escape(lit.slice(last, a)) + "${" + expr + "}"
                last = b
            }
            return out + escape(lit.slice(last, lit.length - 1)) + "`"
        }

        // a variable parameter becomes a setter:  name  ->  (v, init) => { name = v }
        function fa_var(text) {
            const t = text.trim()
            if (!/^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\[[^\]\n]+\])*$/.test(t)) throw new Error(`Fa: "${t}" is not a variable name`)
            return `(v, init) => { if (init) { try { if (${t} !== undefined) return } catch (e) {} } ${t} = v }`
        }

        function fa_call(name, body) {
            const def = FA_FUNCS[name]
            const slots = new Array(def.params.length).fill(undefined)
            const positional = []

            for (const part of fa_split(body)) {
                const m = part.match(/^([A-Za-z_]\w*)\s*:(?!:)\s*([\s\S]+)$/)
                if (m) {
                    const idx = def.params.indexOf(m[1])
                    if (idx === -1) throw new Error(`Fa: ${name} has no "${m[1]}" (available: ${def.params.join(", ")})`)
                    slots[idx] = (def.vars || []).includes(m[1]) ? fa_var(m[2]) : fa_value(m[2], (def.lazy || []).includes(m[1]))
                } else {
                    positional.push(part)
                }
            }
            for (const p of positional) {
                const idx = slots.indexOf(undefined)
                if (idx === -1) throw new Error(`Fa: too many values for ${name} (max ${def.params.length}: ${def.params.join(", ")})`)
                slots[idx] = (def.vars || []).includes(def.params[idx]) ? fa_var(p) : fa_value(p, (def.lazy || []).includes(def.params[idx]))
            }

            let last = slots.length
            while (last > 0 && slots[last - 1] === undefined) last--
            return `${def.js || name}(${slots.slice(0, last).map(s => s === undefined ? "undefined" : s).join(", ")})`
        }

        function fa_compile(src) {
            let out = "", i = 0
            while (i < src.length) {
                const c = src[i]
                if (c === '"' || c === "'" || c === "`") { const e = fa_skipString(src, i); out += fa_string(src.slice(i, e)); i = e; continue }
                if (src.startsWith("//", i)) { const e = src.indexOf("\n", i); const end = e === -1 ? src.length : e; out += src.slice(i, end); i = end; continue }
                if (src.startsWith("/*", i)) { const e = src.indexOf("*/", i + 2); const end = e === -1 ? src.length : e + 2; out += src.slice(i, end); i = end; continue }
                if (/[A-Za-z_$]/.test(c)) {
                    let j = i
                    while (j < src.length && /[\w$]/.test(src[j])) j++
                    const name = src.slice(i, j)
                    let k = j
                    while (k < src.length && /\s/.test(src[k])) k++
                    if (Object.hasOwn(FA_FUNCS, name) && src[k] === "{" && src[i - 1] !== ".") {
                        const close = fa_findClose(src, k)
                        out += fa_call(name, src.slice(k + 1, close))
                        i = close + 1
                    } else {
                        out += name
                        i = j
                    }
                    continue
                }
                out += c
                i++
            }
            return out
        }


        // ---------------------------------------------------------------
        // Autocomplete for the code box (#inf)
        //   - starts while typing (1+ letters), Ctrl+Space shows it any time
        //   - Up/Down choose, Tab/Enter accept, Esc closes
        //   - knows every function in FA_FUNCS and its parameters
        // ---------------------------------------------------------------

        const AC_KEYWORDS = ["const", "let", "function", "if", "else", "for", "while", "return", "true", "false", "null"]

        // optional hints shown next to the suggestion
        const AC_DOCS = {
            btn:     { _: "button",               text: "label of the button", event: "runs when clicked" },
            show:    { _: "text as heading",      text: "the text",            width: "size 1-6" },
            input:   { _: "text field",           prompt: "placeholder text",    var: "variable that stores the text" },
            warn:    { _: "popup with ok button", text: "message",             size: "size 1-6" },
            prompt:  { _: "popup with input",     text: "question",            var: "variable that stores the answer" },
            color:   { _: "background color",     color: "css color" },
            case_of: { _: "run only if true",     if: "condition",             do: "what to run" },
            if:      { _: "if / else",            cond: "condition",           then: "runs if true",  else: "runs if false" }
        }

        let ac = null // { ta, items, index, start, pos }

        function ac_skipStr(s, i) {
            const q = s[i]
            let j = i + 1
            while (j < s.length) {
                if (s[j] === "\\") { j += 2; continue }
                if (s[j] === q) return j + 1
                j++
            }
            return -1 // not closed -> caret is inside the string
        }

        // returns the stack of open { } blocks before the caret, or null inside string/comment
        function ac_scan(before) {
            const stack = []
            let lastIdent = null, lastEnd = -1, i = 0
            while (i < before.length) {
                const c = before[i]
                if (c === '"' || c === "'" || c === "`") { const e = ac_skipStr(before, i); if (e === -1) return null; i = e; continue }
                if (before.startsWith("//", i)) { const e = before.indexOf("\n", i); if (e === -1) return null; i = e; continue }
                if (before.startsWith("/*", i)) { const e = before.indexOf("*/", i + 2); if (e === -1) return null; i = e + 2; continue }
                if (/[A-Za-z_$]/.test(c)) {
                    let j = i
                    while (j < before.length && /[\w$]/.test(before[j])) j++
                    lastIdent = before.slice(i, j); lastEnd = j; i = j
                    continue
                }
                if (c === "{") {
                    const named = lastIdent && Object.hasOwn(FA_FUNCS, lastIdent) && /^\s*$/.test(before.slice(lastEnd, i))
                    stack.push({ name: named ? lastIdent : null, pos: i })
                } else if (c === "}") {
                    stack.pop()
                }
                i++
            }
            return stack
        }

        function ac_suggest(text, pos, force) {
            const before = text.slice(0, pos)
            const stack = ac_scan(before)
            if (!stack) return null

            const m = before.match(/[A-Za-z_$][\w$]*$/)
            const word = m ? m[0] : ""
            const prefix = before.slice(0, before.length - word.length)
            if (prefix.endsWith(".") || /\d$/.test(prefix)) return null
            if (!word && !force) return null

            const top = stack[stack.length - 1]
            const trimmed = prefix.replace(/[ \t]+$/, "")
            const entryStart = trimmed === "" || /[{,\n]$/.test(trimmed)
            const items = []

            // parameters of the function whose { } block we are in
            if (top && top.name && entryStart) {
                const used = fa_split(before.slice(top.pos + 1, before.length - word.length))
                    .map(p => (p.match(/^([A-Za-z_]\w*)\s*:/) || [])[1]).filter(Boolean)
                for (const p of FA_FUNCS[top.name].params) {
                    if (!used.includes(p)) items.push({ name: p, kind: "param", detail: (AC_DOCS[top.name] || {})[p] || "" })
                }
            }
            // functions
            for (const f of Object.keys(FA_FUNCS)) {
                items.push({ name: f, kind: "fn", detail: "{ " + FA_FUNCS[f].params.join(", ") + " }  " + ((AC_DOCS[f] || {})._ || "") })
            }
            // keywords (inside a Fa block only true / false / null)
            for (const k of AC_KEYWORDS) {
                if (Object.hasOwn(FA_FUNCS, k)) continue
                if (top && top.name && !["true", "false", "null"].includes(k)) continue
                items.push({ name: k, kind: "kw", detail: "" })
            }

            const lw = word.toLowerCase()
            const starts = items.filter(it => it.name.toLowerCase().startsWith(lw))
            const rest = lw ? items.filter(it => !it.name.toLowerCase().startsWith(lw) && it.name.toLowerCase().includes(lw)) : []
            let list = starts.concat(rest).slice(0, 8)

            // nothing left to complete
            if (list.length === 1 && list[0].name === word && list[0].kind !== "fn") list = []
            if (!list.length) return null
            return { items: list, start: pos - word.length }
        }

        function ac_insertion(item, textAfter) {
            if (item.kind === "param") { const t = item.name + ": "; return { text: t, caret: t.length } }
            if (item.kind === "fn" && !/^\s*\{/.test(textAfter)) {
                const t = item.name + " {  }"
                return { text: t, caret: t.length - 2 }
            }
            return { text: item.name, caret: item.name.length }
        }

        function ac_popup() {
            let el = document.getElementById("ac-popup")
            if (!el || !el.isConnected) {
                el = document.createElement("div")
                el.id = "ac-popup"
                el.className = "ac-popup"
                document.body.appendChild(el)
            }
            if (!document.getElementById("ac-style")) {
                const st = document.createElement("style")
                st.id = "ac-style"
                st.textContent = `
                    .ac-popup { position: fixed; z-index: 99999; display: none; min-width: 220px; max-width: 360px; max-height: 220px; overflow-y: auto;
                        background: #fff; color: #222; border: 1px solid #999; border-radius: 6px; box-shadow: 0 4px 14px rgba(0,0,0,.25);
                        font: 13px/1.4 Consolas, Menlo, monospace; text-align: left; user-select: none; }
                    .ac-item { display: flex; gap: 8px; align-items: baseline; padding: 3px 8px; cursor: pointer; }
                    .ac-item.active { background: #2563eb; color: #fff; }
                    .ac-kind { font-size: 10px; opacity: .6; min-width: 34px; }
                    .ac-name { font-weight: bold; }
                    .ac-detail { opacity: .65; font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }`
                document.head.appendChild(st)
            }
            return el
        }

        // pixel position of the caret inside the textarea
        function ac_caretXY(ta) {
            const cs = getComputedStyle(ta)
            const mirror = document.createElement("div")
            for (const p of ["fontFamily", "fontSize", "fontWeight", "fontStyle", "letterSpacing", "lineHeight", "textTransform", "wordSpacing", "tabSize",
                             "paddingTop", "paddingRight", "paddingBottom", "paddingLeft",
                             "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth", "boxSizing"]) {
                mirror.style[p] = cs[p]
            }
            mirror.style.width = cs.width
            mirror.style.position = "absolute"
            mirror.style.left = "-9999px"
            mirror.style.top = "0"
            mirror.style.visibility = "hidden"
            mirror.style.whiteSpace = cs.whiteSpace
            mirror.style.wordWrap = cs.whiteSpace === "pre" ? "normal" : "break-word"
            mirror.textContent = ta.value.slice(0, ta.selectionStart)
            const span = document.createElement("span")
            span.textContent = "\u200b"
            mirror.appendChild(span)
            document.body.appendChild(mirror)
            const r = ta.getBoundingClientRect()
            const pos = {
                x: r.left + span.offsetLeft - ta.scrollLeft,
                y: r.top + span.offsetTop - ta.scrollTop,
                h: span.offsetHeight || 18
            }
            mirror.remove()
            return pos
        }

        function ac_render() {
            const el = ac_popup()
            el.textContent = ""
            ac.items.forEach((it, i) => {
                const row = document.createElement("div")
                row.className = "ac-item" + (i === ac.index ? " active" : "")
                const kind = document.createElement("span"); kind.className = "ac-kind"; kind.textContent = it.kind
                const name = document.createElement("span"); name.className = "ac-name"; name.textContent = it.kind === "param" ? it.name + ":" : it.name
                const det = document.createElement("span"); det.className = "ac-detail"; det.textContent = it.detail
                row.append(kind, name, det)
                row.addEventListener("mousedown", e => { e.preventDefault(); ac.index = i; ac_accept() })
                el.appendChild(row)
            })
            el.style.display = "block"
            const pos = ac_caretXY(ac.ta)
            let x = pos.x, y = pos.y + pos.h + 2
            if (x + el.offsetWidth > window.innerWidth - 4) x = Math.max(4, window.innerWidth - el.offsetWidth - 4)
            if (y + el.offsetHeight > window.innerHeight - 4) y = Math.max(4, pos.y - el.offsetHeight - 2)
            el.style.left = x + "px"
            el.style.top = y + "px"
            const active = el.querySelector(".active")
            if (active) active.scrollIntoView({ block: "nearest" })
        }

        function ac_hide() {
            ac = null
            const el = document.getElementById("ac-popup")
            if (el) el.style.display = "none"
        }

        function ac_update(ta, force) {
            if (ta.selectionStart !== ta.selectionEnd) return ac_hide()
            const res = ac_suggest(ta.value, ta.selectionStart, force)
            if (!res) return ac_hide()
            ac = { ta, items: res.items, index: 0, start: res.start, pos: ta.selectionStart }
            ac_render()
        }

        function ac_accept() {
            if (!ac) return
            const { ta, start } = ac
            const item = ac.items[ac.index]
            const ins = ac_insertion(item, ta.value.slice(ta.selectionStart))
            ed_replace(ta, start, ta.selectionStart, ins.text)
            ta.setSelectionRange(start + ins.caret, start + ins.caret)
            ac_hide()
            hl_render()
            ta.focus()
        }

        document.addEventListener("input", e => {
            if (e.target.id !== "inf" || ed_busy) return
            if (e.inputType && e.inputType.startsWith("delete")) return ac_hide()
            ac_update(e.target, false)
        })

        document.addEventListener("keydown", e => {
            if (e.target.id !== "inf") return
            if (e.ctrlKey && e.code === "Space") { e.preventDefault(); return ac_update(e.target, true) }
            if (!ac) return
            if (e.key === "ArrowDown") { e.preventDefault(); ac.index = (ac.index + 1) % ac.items.length; ac_render() }
            else if (e.key === "ArrowUp") { e.preventDefault(); ac.index = (ac.index - 1 + ac.items.length) % ac.items.length; ac_render() }
            else if (e.key === "Tab" || e.key === "Enter") { e.preventDefault(); ac_accept() }
            else if (["Escape", "ArrowLeft", "ArrowRight", "Home", "End", "PageUp", "PageDown"].includes(e.key)) ac_hide()
        }, true)

        document.addEventListener("focusout", e => { if (e.target.id === "inf") ac_hide() })
        document.addEventListener("mousedown", e => { if (!e.target.closest || !e.target.closest(".ac-popup")) ac_hide() })
        document.addEventListener("scroll", e => {
            if (e.target.closest && e.target.closest(".ac-popup")) return
            if (e.target.id === "inf") hl_scroll()
            ac_hide()
        }, true)


        // ---------------------------------------------------------------
        // Editor helpers: undo-friendly editing + auto-closing pairs
        //   ( ) [ ] { } " ' ` ´   -> typing the opener writes both
        //   typing the closer jumps over it, Backspace removes an empty
        //   pair, selected text gets wrapped, Enter inside { } indents
        // ---------------------------------------------------------------

        const ED_PAIRS = { "(": ")", "[": "]", "{": "}", '"': '"', "'": "'", "`": "`", "´": "´" }
        const ED_CLOSERS = ")]}"
        const ED_QUOTES = "\"'`´"
        const ED_INDENT = "    "
        let ed_busy = false

        // replaces [from, to) with text; uses execCommand so Ctrl+Z keeps working
        function ed_replace(ta, from, to, text) {
            ed_busy = true
            try {
                ta.focus()
                ta.setSelectionRange(from, to)
                let ok = false
                try { ok = text === "" ? document.execCommand("delete") : document.execCommand("insertText", false, text) } catch (err) {}
                if (!ok) {
                    ta.setRangeText(text, from, to, "end")
                    ta.dispatchEvent(new Event("input", { bubbles: true }))
                }
            } finally {
                ed_busy = false
            }
        }

        // a char was just typed at ta.selectionStart - 1
        function ed_typed(ta, c) {
            const v = ta.value, pos = ta.selectionStart
            const before = v.slice(0, pos - 1), next = v[pos]
            const isQuote = ED_QUOTES.includes(c)

            // typing a closer that is already there -> just move over it
            if ((ED_CLOSERS.includes(c) || isQuote) && next === c && (!isQuote || ac_scan(before) === null)) {
                ed_replace(ta, pos, pos + 1, "")
                ta.setSelectionRange(pos, pos)
                return
            }
            if (ED_PAIRS[c] === undefined) return
            if (isQuote) {
                if (ac_scan(before) === null) return   // inside a string / comment
                if (/[\w$]$/.test(before)) return      // apostrophe inside a word (don't)
            }
            if (next !== undefined && !/[\s)\]}>,;:.]/.test(next)) return
            ed_replace(ta, pos, pos, ED_PAIRS[c])
            ta.setSelectionRange(pos, pos)
            ac_hide()
        }

        document.addEventListener("input", e => {
            const ta = e.target
            if (ta.id !== "inf" || ed_busy || e.isComposing) return
            if (e.inputType !== "insertText" || !e.data || e.data.length !== 1) return
            if (ta.selectionStart !== ta.selectionEnd || ta.selectionStart < 1) return
            if (ta.value[ta.selectionStart - 1] !== e.data) return
            ed_typed(ta, e.data)
            hl_render()
        })

        // dead keys (´ and ` on a German keyboard) arrive as composition
        document.addEventListener("compositionend", e => {
            const ta = e.target
            if (ta.id !== "inf" || ed_busy || !e.data || e.data.length !== 1) return
            if (ta.selectionStart !== ta.selectionEnd || ta.value[ta.selectionStart - 1] !== e.data) return
            ed_typed(ta, e.data)
            hl_render()
        })

        // selected text + opener -> wrap the selection
        document.addEventListener("beforeinput", e => {
            const ta = e.target
            if (ta.id !== "inf" || e.inputType !== "insertText" || !e.data || e.data.length !== 1) return
            if (ED_PAIRS[e.data] === undefined) return
            const a = ta.selectionStart, b = ta.selectionEnd
            if (a === b) return
            e.preventDefault()
            ed_replace(ta, a, b, e.data + ta.value.slice(a, b) + ED_PAIRS[e.data])
            ta.setSelectionRange(a + 1, b + 1)
            ac_hide()
            hl_render()
        })

        document.addEventListener("keydown", e => {
            const ta = e.target
            if (ta.id !== "inf" || e.defaultPrevented || e.isComposing) return
            if (e.ctrlKey || e.metaKey || e.altKey) return
            const a = ta.selectionStart, b = ta.selectionEnd, v = ta.value
            if (a !== b) return

            // Backspace in the middle of an empty pair: remove both
            if (e.key === "Backspace" && a > 0 && ED_PAIRS[v[a - 1]] !== undefined && ED_PAIRS[v[a - 1]] === v[a]) {
                e.preventDefault()
                ed_replace(ta, a - 1, a + 1, "")
                ta.setSelectionRange(a - 1, a - 1)
                ac_hide(); hl_render()
                return
            }

            // Enter: keep indentation, indent after an opener, split { | } onto 3 lines
            if (e.key === "Enter" && !e.shiftKey) {
                const lineBefore = v.slice(v.lastIndexOf("\n", a - 1) + 1, a)
                const indent = lineBefore.match(/^[ \t]*/)[0]
                const lastCh = lineBefore.trimEnd().slice(-1)
                const opens = lastCh !== "" && "{([".includes(lastCh)
                const m = v.slice(a).match(/^[ \t]*([)\]}])/)
                if (opens && m && ED_PAIRS[lastCh] === m[1]) {
                    e.preventDefault()
                    ed_replace(ta, a, a + m[0].length - 1, "\n" + indent + ED_INDENT + "\n" + indent)
                    const caret = a + 1 + indent.length + ED_INDENT.length
                    ta.setSelectionRange(caret, caret)
                } else if (opens || indent) {
                    e.preventDefault()
                    ed_replace(ta, a, a, "\n" + indent + (opens ? ED_INDENT : ""))
                } else {
                    return
                }
                ac_hide(); hl_render()
            }
        }, true)


        // ---------------------------------------------------------------
        // Syntax highlighting: a colored <pre> sits behind the (transparent)
        // textarea and is kept in sync with its text and scroll position
        // ---------------------------------------------------------------

        const HL_KEYWORDS = new Set(["const", "let", "var", "function", "if", "else", "for", "while", "do", "return", "true", "false", "null",
                                     "new", "class", "switch", "case", "break", "continue", "try", "catch", "throw", "async", "await", "in", "of", "typeof"])

        function hl_html(src) {
            const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
            const span = (cls, s) => `<span class="${cls}">${esc(s)}</span>`
            const re = /(\/\/[^\n]*|\/\*[\s\S]*?(?:\*\/|$))|("(?:\\.|[^"\\\n])*"?|'(?:\\.|[^'\\\n])*'?|`(?:\\[\s\S]|[^`\\])*`?)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_$][\w$]*)|([{}()\[\]])/g
            const hlStr = t => {
                const ranges = fa_vranges(t, 1, fa_closed(t) ? t.length - 1 : t.length)
                if (!ranges.length) return span("hl-str", t)
                let o = "", last = 0
                for (const [a, b] of ranges) { o += span("hl-str", t.slice(last, a)) + span("hl-var", t.slice(a, b)); last = b }
                return o + span("hl-str", t.slice(last))
            }
            const keyAfter = /\s*:(?!:)/y
            const blockAfter = /\s*\{/y
            const stack = []
            let out = "", last = 0, m
            while ((m = re.exec(src))) {
                out += esc(src.slice(last, m.index))
                last = re.lastIndex
                const t = m[0]
                if (m[1] !== undefined) out += span("hl-com", t)
                else if (m[2] !== undefined) out += hlStr(t)
                else if (m[3] !== undefined) out += span("hl-num", t)
                else if (m[4] !== undefined) {
                    let cls = ""
                    let p = m.index - 1
                    while (p >= 0 && (src[p] === " " || src[p] === "\t")) p--
                    keyAfter.lastIndex = re.lastIndex
                    if ((p < 0 || "{,\n".includes(src[p])) && keyAfter.test(src)) cls = "hl-key"
                    else if (Object.hasOwn(FA_FUNCS, t)) {
                        blockAfter.lastIndex = re.lastIndex
                        cls = (!HL_KEYWORDS.has(t) || blockAfter.test(src)) ? "hl-fn" : "hl-kw"
                    }
                    else if (HL_KEYWORDS.has(t)) cls = "hl-kw"
                    out += cls ? span(cls, t) : esc(t)
                } else if ("{([".includes(t)) {
                    out += span("hl-b" + (stack.length % 3), t)
                    stack.push(t)
                } else {
                    const top = stack[stack.length - 1]
                    if (top !== undefined && "{([".indexOf(top) === "})]".indexOf(t)) {
                        stack.pop()
                        out += span("hl-b" + (stack.length % 3), t)
                    } else {
                        out += span("hl-bad", t)
                    }
                }
            }
            out += esc(src.slice(last))
            return out + "\n<span class=\"hl-pad\"></span>"
        }

        function hl_pre() {
            const ta = document.getElementById("inf")
            const pre = ta && ta.previousElementSibling
            return pre && pre.classList.contains("hl-pre") ? pre : null
        }

        function hl_layout() {
            const ta = document.getElementById("inf"), pre = hl_pre()
            if (!ta || !pre) return
            const cs = getComputedStyle(ta)
            for (const p of ["fontFamily", "fontSize", "fontWeight", "fontStyle", "lineHeight", "letterSpacing", "tabSize",
                             "paddingTop", "paddingRight", "paddingBottom", "paddingLeft",
                             "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth", "borderRadius"]) {
                pre.style[p] = cs[p]
            }
            pre.style.left = ta.offsetLeft + "px"
            pre.style.top = ta.offsetTop + "px"
            pre.style.width = ta.offsetWidth + "px"
            pre.style.height = ta.offsetHeight + "px"
        }

        function hl_scroll() {
            const ta = document.getElementById("inf"), pre = hl_pre()
            if (!ta || !pre) return
            pre.scrollTop = ta.scrollTop
            pre.scrollLeft = ta.scrollLeft
        }

        function hl_render() {
            const ta = document.getElementById("inf"), pre = hl_pre()
            if (!ta || !pre) return
            pre.innerHTML = hl_html(ta.value)
            hl_layout()
            hl_scroll()
        }

        // safe to call again (e.g. after mini() rebuilt the page)
        function hl_setup() {
            const ta = document.getElementById("inf")
            if (!ta) return
            if (!document.getElementById("hl-style")) {
                const st = document.createElement("style")
                st.id = "hl-style"
                st.textContent = `
                    .hl-pre { position: absolute; margin: 0; box-sizing: border-box; border-style: solid; border-color: transparent; overflow: hidden;
                        white-space: pre; pointer-events: none; text-align: left; background: none; color: blue; z-index: 2; }
                    .hl-ta { color: transparent !important; caret-color: #000; white-space: pre; }
                    .hl-ta::selection { background: rgba(80, 130, 220, .35); color: transparent; }
                    .hl-pad { display: block; height: 24px; }
                    .hl-kw { color: #af00db; } .hl-str { color: #a31515; } .hl-num { color: #098658; } .hl-com { color: #008000; font-style: italic; }
                    .hl-var { color: #d6336c; font-weight: bold; } .hl-fn { color: #795e26; font-weight: bold; } .hl-key { color: #0b7285; }
                    .hl-b0 { color: #b8860b; } .hl-b1 { color: #af00db; } .hl-b2 { color: #0070c1; }
                    .hl-bad { color: #a00; background: #ffd0d0; border-radius: 2px; }`
                document.head.appendChild(st)
            }
            if (!hl_pre()) {
                const pre = document.createElement("pre")
                pre.className = "hl-pre"
                pre.setAttribute("aria-hidden", "true")
                ta.before(pre)
            }
            ta.classList.add("hl-ta")
            ta.setAttribute("wrap", "off")
            ta.spellcheck = false
            hl_render()
        }

        document.addEventListener("input", e => { if (e.target.id === "inf") hl_render() })
        window.addEventListener("resize", hl_layout)
        hl_setup()
