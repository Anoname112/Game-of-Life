function getElement (id) {
	return document.getElementById(id);
}

function fillRect (x, y, w, h, s) {
	ctx.fillStyle = s == null ? "#fff" : s;
	ctx.fillRect(x, y, w, h);
}

function drawRect (x, y, w, h, s) {
	ctx.strokeStyle = (s == null) ? "#000" : s;
	ctx.strokeRect(x, y, w, h);
	ctx.stroke();
}

function drawMessage (msg, x, y, align) {
	ctx.textAlign = (align == null) ? "start" : align;
	ctx.font = msgFont;
	ctx.fillStyle = msgTextColor;
	ctx.fillText(msg, x, y + 12);
	ctx.textAlign = "start";
}

function floor (value, floor) {
	return Math.floor(value / floor) * floor;
}

function clamp (value, min, max) {
	return Math.max(Math.min(value, max), min);
}
