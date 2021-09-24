function append(cnt, e) { cnt.appendChild(document.createElement(e)) }
function appendTxt(cnt, s) { cnt.appendChild(document.createTextNode(s)) }
function create(s) { return document.createElement(s) }

var style = create('style')
style.innerHTML = `

body{
	background-color:#fff;
	font:normal normal normal 16px/1.5 Arial,sans-serif;
	margin-left:10px;margin-right:10px;max-width:800px;
}

pre{
	white-space:pre-wrap;
	background-color:#ffe;
	margin-left:0px;
	margin-top:0px;
	border:1px solid gray;
	border-radius:5px;
	padding:5px;
	font:normal normal normal 14px/1.3 monospace;
	width:calc(100vw - 400px);
	min-height:90px;
	max-width:380px;
}
textarea {
	background-color:#ffe;
	margin-left:12px;
	border:1px solid gray;
	border-radius:5px;
	padding:5px;
	font:normal normal normal 14px/1.3 Courier New,monospace;
	width:320px;
	resize:none;
}
textarea.run {background-color:#eed}
canvas.run {outline-style:solid;outline-color:#f00;outline-width:1px}

canvas {
	margin-left:12px;
	border:1px solid gray;
	width:320px;
	height:320px;
}
@media only screen and (max-width: 600px) {
	textarea {
		margin-left:0px;
		width:calc(100vw - 28px);
		max-width:480px
	}
	pre{
		width:calc(100vw - 28px);
		max-width:480px
	}
	canvas {
		margin-left:0px;
		width:calc(100vw - 28px);
		height:calc(100vw - 28px);
		max-width:480px
	}
	body{
		margin-left:8px;margin-right:8px
	}
}

h3{background-color:#beb;padding:5px;padding-left:12px}
h3:not(:first-child) { margin-top:40px}

tt {padding:1px;background-color:#dfd;}

button {
  background-color: #dfd;
  cursor: pointer;
  padding: 4px 4px;
  font-size: 110%;
  border:1px solid gray;
  border-radius:5px;
}
button:enabled:hover {background-color:#cec}
button:enabled:active {background-color:#484} 

button.stop {
	display:none;
    margin-right: 8px;
}

pre i {color: #080}
pre b {color: #821}
hr {margin-top:30px;margin-bottom:30px;}

span.high {background-color:#faa}

.flex {
  display: inline-flex;
  flex-wrap: wrap;
}


`
document.body.appendChild(style)

var phone = window.matchMedia("(max-width: 600px)")

var txt_locale = window['txt_locale']
if (txt_locale == null) txt_locale = ""

var txt_tutor = window['txt_tutor']
var tut = document.getElementById('tut')

var isInit
var pres
var actBtn
var inp

function showRun() {
	if (actBtn) actBtn.out.className = ""
	for (var i = 0; i < pres.length; i++) {
		pres[i].btn.stop.style.display = "none"
		pres[i].btn.disabled = false
	}
	actBtn = null
}

function tutMsgFunc(msg, d) {
	if (msg == "stopped") {
		showRun()
	}
	else if (msg == "ready") {
		if (!isInit) {
			tutUpd()
			isInit = true
		}
		else {
			showRun()
		}
	}
	else if (msg == "src_nl") {
		gotSrcNl(d[0], d[1], d[2], d[3])
	}
	else if (msg == "src") {
		actBtn.pre.innerHTML = d[0]
	}
	else if (msg == "src_err") {
		gotSrcErr(d[0], d[1], d[2], d[3])
	}
	else if (msg == "src2") {
		pres[d[1]].innerHTML = d[0]
	}
	else if (msg == "nowasm") {
		tut.innerHTML = "<b>Sorry. This tutorial needs WebAssembly support in your browser.</b>"
	}
	else if (msg == "input") {
		easyinp(prompt())
	}
}

function canvClear(canv) {
	var c = canv.getContext('2d')
	var sz = canv.width
	c.lineWidth = 1
	c.clearRect(0, 0, sz, sz)

	c.beginPath()
	var i
	for (i = 1; i < 10; i++) {
		c.moveTo(0.5, 0.5 + 60 * i)
		c.lineTo(sz - 0.5,	0.5 + 60 * i)
	}
	for (i = 1; i < 10; i++) {
		c.moveTo(0.5 + 60 * i, 0.5)
		c.lineTo(0.5 + 60 * i, sz - 0.5)
	}
	c.strokeStyle = "#ddd"
	c.stroke()
}

var pre

function tutUpd() {
	while (tut.firstChild) tut.removeChild(tut.firstChild)
	var lang = navigator.language.substring(0, 2)
	if (txt_locale.indexOf(lang) == -1) lang = ""
	lang += " "
	pres = []
	var smpls = txt_tutor.split("\n\n")
	if (smpls[0].charAt(0) === '\n') smpls[0] = smpls[0].slice(1)
	var k = lang.length + 1
	for (var i = 0; i < smpls.length; i++) {
		var s = smpls[i]
		if (s.startsWith("*")) {
			if (s.startsWith("*" + lang)) {
				var b = create('h3')
				b.appendChild(document.createTextNode(s.substring(k)))
				tut.appendChild(b)
			}
		}
		else if (s.startsWith("+")) {
			if (s.startsWith("+" + lang)) {
				var b = create('p')
				var s0 = s.substring(k)
				var sn = ""
				var st = true
				for (var h = 0; h < s0.length; h++) {
					var c = s0[h]
					if (c == '*') {
						if (s0[h + 1] == '*') {
							sn += c
							h++
						}
						else {
							if (st) sn += "<tt>"
							else sn += "</tt>"
							st = !st
						}
					}
					else if (c == '<') sn += "&lt;"
					else sn += c
				}
				b.innerHTML = sn
				tut.appendChild(b)
			}
		}
		else if (s == "-") tut.appendChild(create('hr'))
		else if (s.startsWith("@")) {
			if (s.startsWith("@" + lang)) {
				var ar  = s.substring(k).split("@")
				var p = create('p')
				var link = create('a')
				link.href = ar[0]
				link.target = '_blank'
				link.appendChild(document.createTextNode(ar[1]))
				p.appendChild(link)
				tut.appendChild(p)
			}
		}
		else if (s.startsWith("##")) {
			var ca = create("canvas")
			ca.tabindex = 0
			ca.style.marginBottom = "12px"
			ca.style.border = "0px"
			if (s[2] != "\n") {
				var h = Number(s.substring(2, 4))
				ca.width = 600
				ca.height = 6 * h
				ca.style.height = h * 3.2 + "px"
			}
			var c = ca.getContext('2d')
			c.clearRect(0, 0, 600, 600)
			tut.appendChild(ca)
			easyrun(s, ca)
		}
		else {
			pre = create('pre')
			pre.innerHTML = s
			pre.contentEditable = true

			pre.autocorrect = false
			pre.autocomplete = false
			pre.autocapitalize = false
			pre.spellcheck = false

			pre.onkeydown = function(e) {
				preKey(this, e)
			}
			kaFormat(s, pres.push(pre) - 1)

			var out
			if (s.search("print ") != -1) {
				out = create("textarea")
				out.readOnly = true
				if (phone.matches) {
					out.rows = 6
				}
				else {
					var n = s.split("\n").length; 
					n -= 1
					if (n < 4) n = 4
					out.rows = n
				}
			}
			else {
				pre.style.minHeight = "310px"
				out = create("canvas")
				out.width = 600
				out.height = 600
				canvClear(out)
			}

			var btn = create("button")
			btn.innerHTML = "Run"
			btn.style.float = "right"
			btn.onclick = function() {
				runClick(this)
			}
			var btn2 = create("button")
			btn2.innerHTML = "Stop"
			btn2.style.float = "right"
			btn2.className = "stop"
			btn2.onclick = function() {
				kaStop()
			}
			var flex = create("div")
			flex.className = "flex"

			var div
			div = create("div")
			div.appendChild(btn)
			div.appendChild(btn2)
			div.appendChild(pre)
			flex.appendChild(div)

			div = create("div")
			div.appendChild(out)
			flex.appendChild(div)

			tut.appendChild(flex)

			btn.stop = btn2
			btn.pre = pre
			pre.btn = btn
			btn.out = out
		}
	}

	if (window.hook) {
		hook()
	}
	var dom = window.location.host
	var h
	append(tut, "p")
	append(tut, "hr")
	append(tut, "p")
	appendTxt(tut, "The examples were created with ")

	h = create("a")
	h.target = "_blank"
	h.href = "https://" + dom
	appendTxt(h, dom)
	tut.appendChild(h)
	appendTxt(tut, ". This tutorial is also integrated in the ")
	h = create("a")
	h.target = "_blank"
	h.href = "https://" + dom + "/ide/"
	appendTxt(h, "IDE")
	tut.appendChild(h)

	append(tut, "p")
	h = create("small")
	appendTxt(h, "christof.kaser@gmail.com")
	tut.appendChild(h)
}

// ------------------

var tailSrc
var cnd = create("span")
cnd.act = false
cnd.err = false
appendTxt(cnd, " ")
cnd.className = "high"

function caret(nd, n) {
	var r = document.createRange()
	r.setStart(nd, n)
	r.setEnd(nd, n)
	var sel = window.getSelection()
	sel.removeAllRanges()
	sel.addRange(r)
}

function removeCnd() {
	if (cnd.act) {
		cnd.act = false
		if (document.contains(cnd)) {

			var n1 = cnd.previousSibling
			var n2 = cnd.nextSibling

			var s = n1.nodeValue + n2.nodeValue
			var p = cnd.parentNode
			p.removeChild(n1)
			p.removeChild(n2)
			var nd = document.createTextNode(s)
			p.insertBefore(nd, cnd)
			caret(nd, n1.nodeValue.length)

			cnd.parentNode.removeChild(cnd)
		}
		if (cnd.err) {
			cnd.firstChild.nodeValue = " "
			cnd.err = false
		}
	}
}
function getCaret() {
	var sel = window.getSelection()
	if (!sel || sel.anchorNode == inp) return 0
	var pos = 0
	for (var i = 0; i < inp.childNodes.length; i++) {
		var nd = inp.childNodes[i]
		while (nd.nodeType == Node.ELEMENT_NODE && nd.childNodes.length > 0) nd = nd.childNodes[0]
		if (nd == sel.anchorNode) {
			pos += sel.anchorOffset
			break
		}
		if (nd.length != null) pos += nd.length;  // chrome
	}
	return pos
}

function setCaret(pos) {
	if (pos < 0) return
	var nd, i
	for (i = 0; i < inp.childNodes.length; i++) {
		nd = inp.childNodes[i]
		while (nd.nodeType == Node.ELEMENT_NODE && nd.childNodes.length > 0) nd = nd.childNodes[0]
		if (nd.length > pos) break
		pos -= nd.length
	}
	if (i == inp.childNodes.length) pos = nd.length

	var p = nd.parentNode

	var n = document.createTextNode(nd.nodeValue.substr(0, pos))
	p.insertBefore(n, nd)
	cnd.act = true
	p.insertBefore(cnd, nd)
	n = document.createTextNode(nd.nodeValue.substr(pos))
	p.insertBefore(n, nd)
	p.removeChild(nd)

	caret(n, 0)
}

function scrollToLine(lc, nln) {
	var lpp = nln * inp.clientHeight / inp.scrollHeight
	var ltop = nln * inp.scrollTop / inp.scrollHeight
	if (lc < ltop || lc > ltop + lpp - 1) {
		inp.scrollTop = (lc - 1) * inp.scrollHeight / nln
	}
}

function scrollToPos(pos) {
	var lines = inp.innerText.split("\n")
	var ln = lines.length
	var a = 0
	var lc
	for (lc = 0; lc < ln; lc++) {
		a += lines[lc].length + 1
		if (a > pos) break
	}
	scrollToLine(lc, ln)
}

function showError(err, pos) {
	cnd.firstChild.nodeValue = " " + err + " "
	cnd.err = true
	scrollToPos(pos)
	inp.focus()
}

function gotSrcNl(src, res, pos, err) {
	inp.innerHTML = src.substr(0, res)
	appendTxt(inp, src.substr(res) + tailSrc)
	setCaret(pos)
	if (err) showError(err, pos)
	else if (tailSrc.length < 10) {
		inp.scrollTop = inp.scrollHeight - inp.clientHeight
	}
}
	
function gotSrcErr(src, res, pos, err) {
	inp.innerHTML = src.substr(0, res)
	appendTxt(inp, src.substr(res))
	showRun()
	setCaret(pos)
	showError(err, pos)
}

// ------------------

function preKey(pre, e) {
	inp = pre
	var k = e.keyCode
	if (cnd.act) {
		removeCnd()
		if (k == 8) {
			e.preventDefault()
			return
		}
	}
	if (e.ctrlKey) {
		if (k == 82 || k == 13) {
			runClick(pre.btn)
			e.preventDefault()
		}
	}
	else if (k == 9) {
		document.execCommand('insertHTML', false, '  ')
		e.preventDefault()
	}
	else if (k === 13) {
		var p = getCaret()
		var inps = inp.innerText
		if (p != 0 && inps[p - 1] != '\n') {
			while (p < inps.length && inps[p] != '\n') p++
		}
		var s =inps.substring(0, p)
		tailSrc = inps.substring(p)
		if ((s.length == 0 || s[s.length - 1] == '\n') && tailSrc[0] != '\n') {
			tailSrc = "\n" + tailSrc
		}
		kaFormat(s)
		e.preventDefault()
	}
}

function runClick(btn) {
	if (btn.disabled) return
	actBtn = btn
	inp = btn.pre
	removeCnd()
	setTimeout(function() { 
			if (actBtn != null) {
				for (var i = 0; i < pres.length; i++) {
					pres[i].btn.stop.style.display = "inline"
				}
			}
		}, 1000);
	for (var i = 0; i < pres.length; i++) {
		pres[i].btn.disabled = true
	}
	tailSrc = null
	btn.out.className = "run"
	if (btn.out.constructor.name == "HTMLCanvasElement") {
		canvClear(btn.out)
		easygo(btn.pre.innerText, btn.out)
	}
	else {
		easygo(btn.pre.innerText, null, btn.out)
	}
}

window.addEventListener("keydown", function(e) {
	if (e.keyCode == 82 && e.ctrlKey || e.keyCode == 116) {
		e.preventDefault()
	}
})

easyinit(null, null, tutMsgFunc)

