const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const isPortrait = window.innerWidth < window.innerHeight;

const interval = 1000 / 60;
const bound = 400;				// Must be sqrt-able, for example: 9, 16, 25, 36, 49, 64, 81, 100, 121, ...
const sqrt = Math.sqrt(bound);
const tickChange = 5;
const minTime = 10;
const maxTime = 100;
const squareWidth = 15;
const squareHeight = 15;
const squareColor = "#000";
const borderColor = "#aaa";

// Body
const bodyMargin = "0";
const bodyBackColor = "#fff";
const bodyTextColor = "#000";
const bodyFont = "15px Segoe UI";

// Canvas
const canvasBackColor = "#fff";
const canvasPosition = "fixed";

// Message
const msgTextColor = "#000";
const msgFont = "15px Consolas";
const msgPad = 50;
const msgSpacing = 20;