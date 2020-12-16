/* Sea Raiders */

console.log("in scripts");

/* The following declares a variety of variables */

	// Canvas variables
	let canvas = document.getElementById("myCanvas");
	let ctx = canvas.getContext("2d");

	// Ball Variables
	let ball = [];
	let ballSpeed = - 2;

    let score = 0;

    // Enemy variables
    let enemy = [];
    let enemySpeed = 0.25;
    enemy[0] = {
        x: Math.floor(Math.random() * canvas.width) - 75,
        y: -180
    };

	// Ship Variables
	let shipX = canvas.width / 2;
	let shipMovement = 20;

	// Miscellaneous Variables
	let gameOn = false;

	// Image Variables
	let background1 = new Image(); // Create new img element
	background1.src = 'images/background1.png'; // Set source path
	background1.addEventListener('load', startGame);

	let pirateship = new Image(); // Create new img element
	pirateship.src = 'images/pirateship.png'; // Set source path
	pirateship.addEventListener('load', startGame);

    let enemyImg = new Image();
    enemyImg.src = 'images/enemy.png';
	enemyImg.addEventListener('load', startGame);

	// Variables for sound fx and music

	let hit = document.getElementById("hit");
	let fire = document.getElementById("fire");

	// Splash Screen and animation Variables

	let splashScreenOn = true;
	let srcX = 0;
	let srcY = 0;
	let x = 0;
	let y = 0;
	let spriteWidth = 300;
	let spriteHeight = 400;

	let splashScreenImg1 = new Image();  
	splashScreenImg1.src = 'images/splashscreen.png';
	splashScreenImg1.addEventListener('load', startGame);

/* The following are eventlistners */

document.addEventListener("keydown", keyDownHandler, false);
document.getElementById("myCanvas").addEventListener("touchmove", touchMove, false);
document.getElementById("myCanvas").addEventListener("mousemove", touchMove, false);
document.getElementById("myCanvas").addEventListener("touchstart", touchStart, false);
document.getElementById("myCanvas").addEventListener("mousedown", touchStart, false);
document.getElementById("myCanvas").addEventListener("mousedown", clickFire, false);


/* The following are functions */

// The following section allows the game to be used on a phone

function touchMove(event) {
	event.preventDefault();
		let x = event.clientX || event.touches[0].clientX;
			if(gameOn){
				shipX = x - 50;
			}
}

// The following section starts the game when the screen it touched or clicked

function touchStart(){
	
	if(splashScreenOn == true || gameOn == false){
		splashScreenOn = false;
		gameOn = true;
	}
}

// This is a function that allows the user to fire by clicking the screen

function clickFire(){
	if(gameOn == true){
		if(shipX != canvas.width / 2){
			if (ball.length < 5){
			 playFire();
			 	ball.push({
					 x: shipX + 38,
					 y: canvas.height - 20
            	});
			}
		}
	}
}

// The following section runs when the game first loads

function startGame() {
    myTimer = setInterval(gameLoop, 16);
}

// The following section makes the game run

function gameLoop() {
	
    if(splashScreenOn) {
		displaySplashScreen();
	} 

    if (gameOn == true) {
        gameUpdate();
        gameDraw();
	}

	if(splashScreenOn == false && gameOn == false){
        gameDraw();
   }
}

// The following section draws everything on the canvas including the ball and score

function gameDraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
	console.log(canvas.width);
	console.log(canvas.height);
	
	ctx.drawImage(background1, 0, 0);
	
	ctx.fillStyle = "#000000";
    ctx.font = "18px Verdana";
    ctx.fillText("Balls: " + ball.length, 20, 40);
    ctx.fillText("Array length: " + enemy.length, 20, 60);
    ctx.fillText("Score: " + score, 20, 80);
    
    
        for (let i = 0; i < enemy.length; i++) {
            ctx.drawImage(enemyImg, enemy[i].x, enemy[i].y)
            
        }
	
		for (let i = 0; i < ball.length; i++) {
			ctx.beginPath();
			ctx.ellipse(ball[i].x, ball[i].y, 5, 5, 2 * Math.PI, 0, 2 * Math.PI);
			ctx.closePath();
			ctx.lineWidth = 3;
			ctx.fill();
			ctx.fillStyle = "000000";
		}
	
	ctx.drawImage(pirateship, shipX, canvas.height - 30);
    
}

// The following section updates the variables for the ball location

function gameUpdate() {
	
	for (let i = 0; i < ball.length; i++) {
		ball[i].y = ball[i].y + ballSpeed;
		
		if (ball[i].y <= 0){
			ball.shift();
		}
		
	}
    
    for (let i = 0; i < enemy.length; i++) {
        enemy[i].y += enemySpeed;
        
        if (enemy[i].y == -5) {
            enemy.push({
                x: 50 + (Math.floor(Math.random() * (canvas.width - 120))),
                y: -180
            });
            }
        
        if (enemy[i].y >= canvas.height) {
            enemy.splice(i, 1);
        }
        
    for (let l = 0; l < ball.length; l++) {
        if (ball[l].x >= enemy[i].x && 
            ball[l].x <= enemy[i].x + enemyImg.width &&
            ball[l].y >= enemy[i].y &&
            ball[l].y <= enemy[i].y + (enemyImg.height - ((enemyImg.height / 3) * 2))){
            playHit;
            score++;
            enemy.splice(i, 1);
            ball.shift();
            }
        }
    }
}

// The following diplays the splashscreen

function displaySplashScreen(){

	ctx.clearRect(0, 0, canvas.width, canvas.height);
    	x = (canvas.width / 2) - (spriteWidth / 2);
    	y = (canvas.height / 2) - (spriteHeight / 2);

		ctx.drawImage(splashScreenImg1, srcX, srcY, spriteWidth, spriteHeight, 
			x, y, spriteWidth, spriteHeight);
	
		srcX = srcX + spriteWidth;
	
    	if (srcX > splashScreenImg1.width - spriteWidth) {
			srcX = 0;
		}
		
}

// The following section makes the keys functional

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        shipX = shipX + shipMovement;
    } else if (e.keyCode == 37) {
        shipX = shipX - shipMovement;
    } else if (e.keyCode == 32) {
		playFire();
		if (ball.length < 5){
			ball.push({
				x: shipX + 38,
				y: canvas.height - 20
         	});
		}
	} else {
        gameOn = true;
		splashScreenOn = false;
    }
}

function playFire(e) { 
  	fire.play();
}

function playHit(e) { 
	hit.play();
}
