function fillRect (x, y, w, h, s) {
	ctx.fillStyle = s == null ? "#fff" : s;
	ctx.fillRect(x, y, w, h);
}

function drawRect (x, y, w, h, s) {
	ctx.strokeStyle = (s == null) ? "#000" : s;
	ctx.strokeRect(x, y, w, h);
	ctx.stroke();
}

function drawMessage (msg, x, y) {
	ctx.font = msgFont;
	ctx.fillStyle = msgTextColor;
	ctx.fillText(msg, x, y + 12);
}