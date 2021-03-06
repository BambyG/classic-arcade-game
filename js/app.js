// Enemies our player must avoid
class Enemy {
	constructor(x, y, speed) {
		this.x = x;
		this.y = y;
		this.speed = speed;
		// The image/sprite for our enemies, this uses
		// a helper we've provided to easily load images        
		this.sprite = 'images/enemy-bug.png';
	}
	// Update the enemy's position, required method for game
	// Parameter: dt, a time delta between ticks
	update(dt) {
		this.x += this.speed * dt;
		// multiply any movement by the dt parameter
		// which will ensure the game runs at the same speed for
		// all computers.
		//restart enemy arrival and apply random speed 
		if (this.x > 500) {
			this.x = -10;
			this.speed = 135 + Math.floor(Math.random() * 500);
		}
		//put the player back to its initial position when it touches 
		if (player.x < this.x + 50 && player.x + 30 > this.x && player.y < this.y + 60 && player.y + 30 > this.y) {
			player.x = 200;
			player.y = 400;
			let lives = document.getElementById('lives')
			let numberLives = lives.innerHTML;
			numberLives--
			lives.innerHTML = numberLives;
			//You lost message when the user don't have any lives
			//Removing the canvas 
			//Displaying a replay button
			if (parseInt(numberLives) == 0) setTimeout(() => {
				let b = document.getElementsByClassName('message')[0]
				let score = document.getElementById('cumulatedPoints').innerHTML
				b.innerHTML = "<p class='message'>Sorry, you lost! <br><span class ='scoreresult'>With " + numberLives + " lives and " + score + " points(s).</span></p>"
				let btn = document.createElement("BUTTON")
				btn.setAttribute("onclick", "refreshPage()");
				btn.className += 'replayButton'
				let t = document.createTextNode("REPLAY")
				btn.appendChild(t);
				b.appendChild(btn);
				document.getElementsByTagName("canvas")[0].style.display = "none";
			}, 500);
		}
	}
	// Draw the enemy on the screen, required method for game
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
}
// write your own player class
class Player {
	constructor(x, y, speed) {
		// Variables applied to each of our instances go here,
		// we've provided one for you to get started        
		this.x = x;
		this.y = y;
		this.speed = speed;
		// The image/sprite for our enemies, this uses
		// a helper we've provided to easily load images        
		this.sprite = 'images/char-cat-girl.png';
	}
	// Update the enemy's position, required method for game
	// Parameter: dt, a time delta between ticks
	update() {
		if (this.x > 400) {
			this.x = 400
		}
		if (this.x < 0) {
			this.x = 0
		}
		if (this.y > 400) {
			this.y = 400
		}
		if (this.y === 0) {
			//show the heart
			let heart = document.getElementById('hearty');
			let plusOne = document.getElementById('plusOne');
			heart.className = 'animated infinite bounce is_visible';
			plusOne.className = 'animated infinite bounce is_visible';
			//make the heart disapear after 500 millesconds 
			setTimeout(function() {
				heart.className = 'not_visible';
				plusOne.className = 'not_visible';
			}, 500)
			//back to start position
			this.y = 400;
			this.x = 200;
			//if users wins add +1 to the score  
			let score = document.getElementById('cumulatedPoints');
			let number = score.innerHTML;
			number++
			score.innerHTML = number;
			//if user wins add a life after 500 milleseconds synchro with the heart bouncing
			setTimeout(function() {
				let lives = document.getElementById('lives')
				let numberLives = lives.innerHTML;
				numberLives++
				lives.innerHTML = numberLives;
			}, 500)
		}
	}
	// Draw the enemy on the screen, required method for game
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
	// Make the player move depending on the pressed key
	handleInput(pressedKey) {
		switch (pressedKey) {
			case 'left':
				this.x -= this.speed + 50;
				break;
			case 'up':
				this.y -= this.speed + 30;
				break;
			case 'right':
				this.x += this.speed + 50;
				break;
			case 'down':
				this.y += this.speed + 30;
				break;
		}
	}
}
// instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let player = new Player(200, 400, 50);
let enemyPosition = [50, 135, 220];
let allEnemies = []
enemyPosition.forEach(function(xx) {
	let enemy = new Enemy(0, xx, 100 + Math.floor(Math.random() * 400));
	allEnemies.push(enemy);
});
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};
	player.handleInput(allowedKeys[e.keyCode]);
});
/*Refreshes the page*/
function refreshPage() {
	window.location.reload();
}