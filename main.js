var c;
var ctx;

var gen;
var tTime;
var tickTime;
var squares = new Array(bound);

function initBodyCanvas () {
	b = document.body;
	b.style.background = bodyBackColor;
	b.style.color = bodyTextColor;
	b.style.font = bodyFont;
	
	c = document.getElementById("myCanvas");
	c.style.background = canvasBackColor;
	c.style.position = canvasPosition;
	onResize();
	c.style.left = (window.innerWidth - c.width) / 2;
	c.style.top = (window.innerHeight - c.height) / 2;
	
	ctx = c.getContext("2d");
}

function initGame () {
	gen = 0;
	tTime = 0;
	for (var i = 0; i < bound; i++) squares[i] = Math.floor(Math.random() * 2);
}

function getNeighbours (index) {
	var neigh = 0;
	
	var u = index - sqrt;
	var ul = index - sqrt - 1;
	var ur = index - sqrt + 1;
	var l = index - 1;
	
	var b = index + sqrt;
	var bl = index + sqrt - 1;
	var br = index + sqrt + 1;
	var r = index + 1;
	
	var x = index % sqrt;
	
	var left = false;
	if (x != 0) left = true;
	var right = false;
	if (x != sqrt - 1) right = true;
	
	if (u >= 0 && squares[u] == 1) neigh++;
	if (ul >= 0 && left && squares[ul] == 1) neigh++;
	if (ur >= 0 && right && squares[ur] == 1) neigh++;
	if (l >= 0 && left && squares[l] == 1) neigh++;
	
	if (b < bound && squares[b] == 1) neigh++;
	if (bl < bound && left && squares[bl] == 1) neigh++;
	if (br < bound && right && squares[br] == 1) neigh++;
	if (r < bound && right && squares[r] == 1) neigh++;
	
	return neigh;
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

function drawMessage (msg, x, y) {
	ctx.font = msgFont;
	ctx.fillStyle = msgTextColor;
	ctx.fillText(msg, x, y + 12);
}

function draw () {
	// Invalidate
	c.width = c.width;
	
	// Prepare variables
	var padX = (c.width - squareWidth * sqrt) / 2;
	var padY = (c.height - squareHeight * sqrt) / 2;
	
	// Draw
	drawMessage("Generation: " + gen, padX, padY - msgPad);
	drawMessage("Tick Interval: " + tickTime, padX, padY - msgPad + msgSpacing);
	for (var i = 0; i < bound; i++) {
		var x = padX + (i % sqrt) * squareWidth;
		var y = padY + Math.floor(i / sqrt) * squareHeight;
		if (squares[i] == 1) fillRect(x, y, squareWidth, squareHeight, squareColor);
		drawRect(x, y, squareWidth, squareHeight, borderColor);
	}
}

function timerTick () {
	if (tTime > 0) tTime--;
	else {
		// Draw current genertion
		draw();
		
		// Prepare next generation
		gen++;
		var temp = new Array(bound);
		for (var i = 0; i < bound; i++) {
			var neigh = getNeighbours(i);
			if (squares[i] == 1) {
				// Live cell
				if (neigh == 2 || neigh == 3) temp[i] = 1;
				else temp[i] = 0;
			}
			else {
				// Dead cell
				if (neigh == 3) temp[i] = 1;
				else temp[i] = 0;
			}
		}
		squares = temp;
		
		// Reset timer
		tTime = tickTime;
	}
}

window.onload = function () {
	window.onresize = onResize;
	window.onkeydown = onKeyDown;
	
	tickTime = 30;

	initBodyCanvas();
	initGame();
	
	setInterval(timerTick, interval);
}

function onResize () {
	c.width = window.innerWidth;
	c.height = window.innerHeight;
}

function onKeyDown (e) {
	switch (e.keyCode) {
		case 38:	// Arrow up
			if (tickTime < maxTime)  {
				tickTime += tickChange;
				draw();
			}
			break;
		case 40:	// Arrow down
			if (tickTime > minTime) {
				tickTime -= tickChange;
				draw();
			}
			break;
		case 82:	// R
			initGame();
			break;
		default:
			break;
	}
}