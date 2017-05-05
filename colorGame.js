var numbSquares = 6;
var colors = [];
var pickedColor;
var scoreKeeper = 100;

var body = document.querySelector("body");
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var message = document.getElementById("message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeBtns = document.querySelectorAll(".mode");
var allButtons = document.querySelectorAll('button');
var score = document.getElementById("score");
var dingSound = document.createElement("audio");



function init() {
	for (let i=0; i < modeBtns.length; i++) {
		modeBtns[i].addEventListener("click", function() {
			modeBtns[0].classList.remove("selected");
			modeBtns[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "Easy" ? numbSquares = 3:numbSquares = 6;
			reset();
		});
		score.textContent = 0;
	}

	for (var i=0; i<squares.length; i++) {
		// add click listeners to squares
		squares[i].addEventListener("click", function() {
			if (this.style.background === pickedColor) {
				message.textContent = "Correct!";
				dingSound.setAttribute("src", "Ding Sound Effect.mp3");
				body.appendChild(dingSound);
				dingSound.play();
				body.style.background = "url(https://i.giphy.com/Rgn6cUfaN5zW.gif)";
				body.style.backgroundSize = "cover";
				changeColors();
				h1.style.background = pickedColor;
				resetButton.textContent = "Play again?";
				resetButton.removeAttribute("disabled");
				for (var i = 0; i < squares.length; i++) {
					squares[i].classList.remove("glyphicon", "glyphicon-remove", "wrong_square");
				}
				score.textContent = scoreKeeper;
				scoreKeeper = 100;
			}
			else {
				dingSound.setAttribute("src", "wrong_buzzer.mp3");
				body.appendChild(dingSound);
				dingSound.play();
				scoreKeeper -= 20;
				this.style.background = "#232323";
				message.textContent = "Try again";
				for (var i = 0; i < allButtons.length; i++) {
					allButtons[i].setAttribute("disabled", "");
				}
				this.classList.add("glyphicon", "glyphicon-remove", "wrong_square");
			}
		});
	}

	resetButton.addEventListener("click", function(){
		reset();
		document.querySelector("body").style.background = "#232323";
		score.textContent = 0;
		for (var i = 0; i < allButtons.length; i++) {
			allButtons[i].removeAttribute("disabled");
		}
		for (var k = 0; k < squares.length; k++) {
			squares[k].classList.remove("glyphicon", "glyphicon-remove", "wrong_square");

		}
	});
	reset();
}

function reset() {
	// generate all new colors
	colors = generateRandomColors(numbSquares);
	// pick random color from array
	pickedColor = pickColor();
	// update displays
	colorDisplay.textContent = pickedColor;
	message.textContent = "";
	resetButton.textContent = "New Colors";
	// change colors of all squares
	resetColors();
	// reset background of h1
	h1.style.background = "steelblue";
}

function resetColors() {
	for (var i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.background = colors[i];
		}
		else {
			squares[i].style.display = "none";
		}
	};
}

function changeColors() {
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.background = pickedColor;
	};
}

function pickColor() {
	var random = Math.floor(Math.random()*colors.length);
	return colors[random];
}

function generateRandomColors(num) {
	var arr = [];
	var r,g,b, color;
	for (var i = 0; i < num; i++) {
		//pick random number between 0-255
		r = Math.floor(Math.random()*256);
		g = Math.floor(Math.random()*256);
		b = Math.floor(Math.random()*256);

		color = "rgb(" + r + ", " + g + ", " + b + ")";
		arr.push(color);
	};

	return arr;
}
init();
