var canvas;
//context of the cancvas
var canvasCtx;
var ballX = 50;
var ballY = 50;
//left to right
var ballSpeedX = 10;
//up and down
var ballSpeedY = 5;
var p1Score = 0;
var p2Score = 0;
//player one paddlle
var p1Y = 250;
var p2Y = 250;
//this is for the win screen
var win = false;
//shows the start screem
var start = true;
//freezes the game when start screen is up
var freeze = false;
//paddle thickness
const pT = 10;
const paddleHeight = 80;
//winning score
const wc = 1;

function calMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x: mouseX,
		y: mouseY
	};
}

function gameStart(evt) {
	if (start) {
		start = false;
		freeze = true;
	}
}

function handleMouseClick(evt) {
	if (win) {
		p1Score = 0;
		p2Score = 0;
		win = false;
	}
	freeze = true;
}
window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasCtx = canvas.getContext('2d');
	var framesPerSecond = 30;
	setInterval(function() {
		moveAll();
		drawAll();
	}, 1000 / framesPerSecond);
	canvas.addEventListener('mousedown', gameStart);
	canvas.addEventListener('mousedown', handleMouseClick);
	//this is what makes the paddle move swaping the p1 to p2 will change the side its on
	canvas.addEventListener('mousemove', function(evt) {
		var mousePos = calMousePos(evt);
		p1Y = mousePos.y - (paddleHeight / 2);
	})
}

function ballReset() {
	if (p1Score >= wc || p2Score >= wc) {
		win = true;
	}
	ballSpeedX = -ballSpeedX;
	ballX = canvas.width / 2;
	ballY = canvas.height / 2;
}

function ai() {
	var p2YCenter = p2Y + (paddleHeight / 2);
	if (p2Y < ballY - 35) {
		p2Y += 6;
	} else if (p2YCenter > ballY + 35) {
		p2Y -= 6;
	}
}

function moveAll() {
	if (start) {
		return;
	}
	if (win) {
		return;
	}
	ai();
	ballX = ballX + ballSpeedX;
	ballY = ballY + ballSpeedY;
	//this is if the ball hits the wall then bounce back
	if (ballX < 0) {
		if (ballY > p1Y && ballY < p1Y + paddleHeight) {
			ballSpeedX = -ballSpeedX;
			var deltaY = ballY - (p1Y + paddleHeight / 2);
			ballSpeedY = deltaY * 0.35;
		} else {
			//this is to give a score to the player when the ball reaches the other side
			p2Score++; //!must be BEFORE baallReset()
			//when the ball hits the other side it will go the other direction due to the the number being a negative (this is for the left side)
			ballReset();
		}
	}
	if (ballX > canvas.width) {
		if (ballY > p2Y && ballY < p2Y + paddleHeight) {
			ballSpeedX = -ballSpeedX;
			var deltaY = ballY - (p2Y + paddleHeight / 2);
			ballSpeedY = deltaY * 0.35;
		} else {
			//this is to give a score to the player when the ball reaches the other side
			p1Score++; //!must be BEFORE baallReset()
			//when the ball hits the other side it will go the other direction due to the the number being a negative (this is for the left side)
			ballReset();
		}
	}
	//bounce off right side
	if (ballY < 0) {
		ballSpeedY = -ballSpeedY;
	}
	if (ballY > canvas.height) {
		ballSpeedY = -ballSpeedY;
	}
}

function net() {
	for (var i = 0; i < canvas.height; i += 40) {
		colorRect(canvas.width / 2 - 1, i, 2, 20, '#00FFFF');
	}
}

function drawAll() {
	//this is the background
	colorRect(0, 0, canvas.width, canvas.height, 'black');
	if (win) {
		canvasCtx.fillStyle = "white";
		if (p1Score >= wc) {
			canvasCtx.fillText("Human has won!", 335, 200);
		} else if (p2Score >= wc) {
			canvasCtx.fillText("AI has won!", 350, 200);
		}
		canvasCtx.fillText("click to continue", 335, 310);
		return;
	}
	if (start) {
		canvasCtx.font = ('italic 14pt Arial');
		canvasCtx.fillStyle = ('white');
		canvasCtx.fillText("click to Start the game", 300, 300);
		canvasCtx.fillText("Use the mouse to control the paddle or on moble use your finger", 120, 160);
		canvasCtx.fillText("The first one to 10 wins ", 300, 230);
		return;
	}
	net();
	//this is the paddle left
	colorRect(5, p1Y, pT, paddleHeight, '#00FFFF');
	//this is the paddle right the -5 allows the paddle to stick out slightly 
	colorRect(canvas.width - pT - 5, p2Y, pT, paddleHeight, '#00FFFF');
	//this is the ball
	colorCircle(ballX, ballY, 10, '#00FFFF');
	//this is for the score counter
	canvasCtx.fillText(p1Score, 100, 100);
	canvasCtx.fillText(p2Score, canvas.width - 100, 100);
}

function colorCircle(centerX, centerY, radius, drawColor) {
	canvasCtx.fillStyle = drawColor;
	canvasCtx.beginPath();
	//the pi is the shape of the circle we multiply it so that it comes out as a full circle the true and false will detemin if its on the top of bottom 
	canvasCtx.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
	canvasCtx.fill();
}

function colorRect(leftX, topY, width, height, drawColor) {
	canvasCtx.fillStyle = drawColor;
	canvasCtx.fillRect(leftX, topY, width, height);
}