//Sea Raiders
//Evan Tahair - 20682804
//Francis Boehmer - 20716121

console.log("in scripts");

//The following declares a variety of variables

	// Canvas variables
	let canvas = document.getElementById("myCanvas");
	let ctx = canvas.getContext("2d");

	// Ball Variables
	let ball = [];
	let ballSpeed = - 1;
    let ballMax = 5;

    //splashscreen variables
    let splashScreenOn = true;
    let srcX = 0;
    let srcY = 0;
    let x = 0;
    let y = 270;
    let row = 0;
    let spriteWidth = 550;
    let spriteHeight = 380;
    let splashScreenImg1 = new Image();  
    splashScreenImg1.src = 'images/splashscreen.png';

    // Enemy variables
    let enemySpeed = 0.125;
    let enemy = [];
    enemy[0] = {
        x: Math.floor(Math.random() * canvas.width) - 100,
        y: -180
    };
    let eH;
    let eHealth = 5;
    let enemyHealth = [eHealth];

    //Boss variables
    let bossSpeed = 0.0625;
    let boss = [];
    boss[0] = {
        x: 250,
        y: -300
    };
    let bH;
    let bHealth = 20;
    let bossHealth = [bHealth];
    let bossOn = false; // false = regular enemies(lvl 1-4) true = boss (lvl 5)
    let bossTextY = -65;

	// Ship Variables
	let shipX = canvas.width / 2;
	let shipMovement = 20;

	// Miscellaneous Variables
	let gameOn = false;
    let gameOver = false;
    let gameWin = false;
    let score = 0;
    let playerHealth = 3;
    let lvl = 1;

	// Image Variables
	let pirateship = new Image(); // Create new img element
	pirateship.src = 'images/pirateship.png'; // Set source path
	pirateship.addEventListener('load', startGame);
    let shipL = false;

    let enemyImg = new Image();
    enemyImg.src = 'images/enemy.png';
	enemyImg.addEventListener('load', startGame);

    let bossImg = new Image();
    bossImg.src = 'images/boss.png';
	bossImg.addEventListener('load', startGame);
    
    let ballImg = new Image();
    ballImg.src = 'images/ball.png';
	ballImg.addEventListener('load', startGame);

    let gameOverImg = new Image();
    gameOverImg.src = 'images/GameOver.png';
	gameOverImg.addEventListener('load', startGame);

    let gameWinImg = new Image();
    gameWinImg.src = 'images/Win.png';
	gameWinImg.addEventListener('load', startGame);

    let coinImg = new Image();
    coinImg.src = 'images/Coin.png';
    coinImg.addEventListener('load', startGame);

    let arrowImg = new Image();
    arrowImg.src = 'images/arrow.png';
    arrowImg.addEventListener('load', startGame);

    let spaceImg = new Image();
    spaceImg.src = 'images/space.png';
    spaceImg.addEventListener('load', startGame);

	// Variables for sound fx and music
	let hit = document.getElementById("hit");
	let fire = document.getElementById("fire");
    let explosion = document.getElementById("explosion");
    let hurt = document.getElementById("hurt");
    let bossSound = document.getElementById("bossSound");
    let backMusic = document.getElementById("backMusic");

//Eventlistners
document.addEventListener("keydown", keyDownHandler, false);
document.getElementById("left").addEventListener("click", leftButton, false);
document.getElementById("fireCanon").addEventListener("click", fireButton, false);
document.getElementById("right").addEventListener("click", rightButton, false);
document.getElementById("myCanvas").addEventListener("touchstart", touchStart, false);

myButton.addEventListener('touchstart', preventZoom); 

//The following are functions

//The following controls the buttons
function leftButton() {
    shipX = shipX - shipMovement;
        pirateship = new Image();
        pirateship.src = 'images/pirateshipL.png';
        shipL = true;
}

function fireButton() {
    if (gameOn == true && splashScreenOn == false) {
            playFire();
            if (ball.length < ballMax){
                ball.push({
                    x: shipX + 38,
                    y: canvas.height - 20
                });
            }
    }
}
    
function rightButton() {
    shipX = shipX + shipMovement;
        pirateship = new Image();
        pirateship.src = 'images/pirateship.png';
        shipL = false;
}

function preventZoom(e) {
  var t2 = e.timeStamp;
  var t1 = e.currentTarget.dataset.lastTouch || t2;
  var dt = t2 - t1;
  var fingers = e.touches.length;
  e.currentTarget.dataset.lastTouch = t2;

  if (!dt || dt > 500 || fingers > 1) return; // not double-tap

  e.preventDefault();
  e.target.click();
}

//touch screen 
function touchStart(){
	if(splashScreenOn == true || gameOn == false){
		splashScreenOn = false;
		gameOn = true;
	}
    
            if (gameOver == true) {
            lvl = 1;
            score = 0;
            playerHealth = 3;
            
            enemy = [];
            enemy[0] = {
                x: Math.floor(Math.random() * canvas.width) - 75,
                y: -180
            };
            
            eHealth = 5;
            enemyHealth = [eHealth];
            
            boss = [];
            boss[0] = {
                x: 250,
                y: -300
            };
            bHealth = 20;
            bossHealth = [bHealth];
            
            gameOver = false;
            gameWin = false;
            gameOn = false;
            splashScreenOn = true;
            bossOn = false;
        } else if (gameWin == true) {
            lvl = 1;
            score = 0;
            playerHealth = 3;
            
            enemy = [];
            enemy[0] = {
                x: Math.floor(Math.random() * canvas.width) - 75,
                y: -180
            };
            eHealth = 5;
            enemyHealth = [eHealth];
            
            boss = [];
            boss[0] = {
                x: 250,
                y: -300
            };
            
            bHealth = 20;
            bossHealth = [bHealth];
            
            gameWin = false;
            gameOver = false;
            gameOn = false;
            splashScreenOn = true;
            bossOn = false;
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
    
    if (gameOver == true) {
        gameDraw();
    }
    
    if (gameWin == true) {
        gameDraw();
    }
    
    if (bossOn == true) {
        gameUpdate();
        gameDraw();
    }
    
    //boss and background music
    if (bossOn == true || gameOver == true || gameWin == true) {
        playBoss();
        pausebackMusic();
    } else if(splashScreenOn == true) {
        pausebackMusic();
        pauseBoss();
    } else {
        pauseBoss();
        playbackMusic();
    }
}

// The following section draws everything on the canvas including the ball and score
function gameDraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
	console.log(canvas.width);
	console.log(canvas.height);
    
        //enemy loop
        if (bossOn == false) {
            for (let i = 0; i < enemy.length; i++) {
                ctx.drawImage(enemyImg, enemy[i].x, enemy[i].y);
                ctx.beginPath();
                ctx.fillStyle = "#FF0000";
                ctx.fillRect(enemy[i].x + 10, enemy[i].y - 10, 45, 5);
                ctx.fillStyle = "#00FF00";
                ctx.fillRect(enemy[i].x + 10, enemy[i].y - 10, enemyHealth[i] * 9, 5);
                ctx.stroke();
            }
        }   
        
        //boss
        if (bossOn == true) {
            for (let i = 0; i < boss.length; i++) { 
                ctx.drawImage(bossImg, boss[0].x, boss[0].y);
                ctx.beginPath();
                ctx.fillStyle = "#FF0000";
                ctx.fillRect(boss[0].x + 10, boss[0].y - 15, 160, 10);
                ctx.fillStyle = "#00FF00";
                ctx.fillRect(boss[0].x + 10, boss[0].y - 15, bossHealth * 8, 10);
                ctx.stroke();
                //boss level text
                ctx.font = "50px Bookman Old Style";
                ctx.fillStyle = "#FF0000";
                ctx.fillText("The Leader", 140, bossTextY);
                ctx.fillText("is", 250, bossTextY + 50);
                ctx.fillText("Approaching!", 110, bossTextY + 90);
                bossTextY += 0.3;
            }
        }
        
        //cannon ball loop
		for (let i = 0; i < ball.length; i++) {
			ctx.beginPath();
            ctx.drawImage(ballImg, ball[i].x, ball[i].y - 55)
            ctx.closePath();
			ctx.lineWidth = 3;
			ctx.fill();
			ctx.fillStyle = "#000000";
		}
    
        //header
        ctx.beginPath();
        ctx.fillStyle = "#00D8FF";
        ctx.fillRect(0, 0, canvas.width, 40);
        ctx.stroke();

        //playerHealth bar
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.fillStyle = "#FF0000";
        ctx.strokeStyle = "#FF0000";
        ctx.fillRect(80, 10, playerHealth * 35, 20);
        ctx.rect(79, 9, 107, 22); //w = (line 158 width num) * max playerHealth + 2
        ctx.stroke();
    
    
        //ammo ball silhouette arcs
        for (let i = 0; i < ballMax; i++) {
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "#414141";
            ctx.arc(456 + (i * 20), 21, 7, 0, 2 * Math.PI);
            ctx.stroke();
        }
    
        //coin/score
        ctx.drawImage(coinImg, 290, 10);

        //header words
        ctx.beginPath();
        ctx.font = "18px Verdana";
        ctx.fillStyle = "#414141";
        ctx.fillText("Ammo |", 372, 27);
        ctx.fillText("Level: " + lvl, 200, 27);
        ctx.fillText(score, 320, 27);
        ctx.fillStyle = "#FF0000";
        ctx.fillText("Health", 10, 27);
        ctx.stroke();

    //player-facing direction L/R
	if (shipL == false) {
        ctx.drawImage(pirateship, shipX - 12, canvas.height - 70);
    } else {
        ctx.drawImage(pirateship, shipX, canvas.height - 70);
    }

    //ammo bar
    for (let i = 0; i < (ballMax - ball.length); i++) {
        ctx.beginPath();
        ctx.drawImage(ballImg, (canvas.width - 100) + (i * 20), 15);
        ctx.closePath();
    }
    
    //gameOver
    if (gameOver == true) {
        ctx.drawImage(gameOverImg, 0, 0);
    }
    
    //gameWin
    if (gameWin == true) {
        ctx.drawImage(gameWinImg, 0, 0);
    }
}

// The following section updates the variables for the ball location

function gameUpdate() {
    
	//ball
	for (let i = 0; i < ball.length; i++) {
		ball[i].y = ball[i].y + ballSpeed;
		
		if (ball[i].y <= 70){
			ball.shift();
		}	
	}
    
    //enemy
    if (bossOn == false) {
        for (let i = 0; i < enemy.length; i++) {
            enemy[i].y += enemySpeed;

            if (enemy[i].y == -5) {
                enemy.push({
                    x: 50 + (Math.floor(Math.random() * (canvas.width - 120))),
                    y: -180
                });
                enemyHealth.push(eHealth);
                }

            if (enemy[i].y >= canvas.height) {
                enemy.splice(i, 1);
                enemyHealth.splice(i, 1);
                playerHealth--;
                playHurt();
                if (playerHealth < 0) {
                    playerHealth = 0;
                }
            }

            eH = enemyHealth[i];
            for (let l = 0; l < ball.length; l++) {
                if (ball[l].x >= enemy[i].x + 5 && 
                    ball[l].x <= enemy[i].x + enemyImg.width - 10 &&
                    ball[l].y >= enemy[i].y  + 45 &&
                    ball[l].y <= enemy[i].y  + 105){
                    playHit();
                    ball.shift();
                    enemyHealth.splice(i, 1, (eH - 1));
                    score++;

                    if (enemyHealth[i] == 0) {
                        enemy.splice(i, 1);
                        enemyHealth.splice(i,1);
                        score +=2;
                        playExplosion();
                    }
                }
            }
            if (enemy[i].x <= 0) {
                enemy[i].x = 30;
            }
        }
    }
    
    //score & levels
    if (score < 25) {
        lvl = 1;
    } else if (score >= 25 && score < 50) {
        lvl = 2;
    } else if (score >= 50 && score < 75) {
        lvl = 3;
    } else if (score >= 75 && score < 100) {
        lvl = 4;
    } else if (score >=100) {
        lvl = 5;
    }
    
    if (lvl == 1) {
        ballMax = 5;
    } else if (lvl == 2) {
        ballMax = 4;
    } else if (lvl == 3) {
        ballMax = 3;
    } else if (lvl == 4) {
        ballMax = 2;
    } else if (lvl == 5) {
        ballMax = 1;
        bossOn = true;
    }
    //player dead, game over
    if (gameOn == true) {
        if (playerHealth == 0) {
            gameOn = false;
            gameOver = true;
        }
        
        //boss
        if (bossOn == true) {
            for (let i = 0; i < boss.length; i++) {
                //boss
                boss[0].y += bossSpeed;
                if (boss[0].y >= canvas.height) {
                    boss.splice(0, 1);
                    playerHealth -= 10;
                    playHurt();
                    if (playerHealth < 0) {
                            playerHealth = 0;
                    }
                }
            
                bH = bossHealth[0];
                for (let l = 0; l < ball.length; l++) {
                    if (ball[l].x >= boss[0].x + 20 && 
                        ball[l].x <= boss[0].x + bossImg.width - 45 &&
                        ball[l].y >= boss[0].y  + 50 &&
                        ball[l].y <= boss[0].y  + 280){
                        playHit();
                        ball.shift();
                        bossHealth.splice(0, 1, (bH - 1));
                        score++;
                    }
                    if (bossHealth[0] == 0) {
                        boss.splice(0, 1);
                        bossHealth.splice(0,1);
                        score +=2;
                        playExplosion();

                    }
                }
            }
        }
        
        //you win
        if (bossHealth == 0) {
            gameOn = false;
            gameWin = true;
        }
    }
}

// The following diplays the splashscreen
function displaySplashScreen(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
    
	ctx.drawImage(splashScreenImg1, srcX, srcY, spriteWidth, spriteHeight,
        x, y, spriteWidth, spriteHeight);
	
	srcX = srcX + spriteWidth;
    	if (srcX > splashScreenImg1.width - spriteWidth) {
        	srcX = 0;
        	if (row < 39) {
            	row = row + 1;
        	} else {
            	row = 0;
        		}
        }
		srcY = row * spriteHeight;
    ctx.beginPath();
    ctx.font = "25px Lato";
    ctx.fillStyle = "#B42615 ";
    ctx.fillText("SPACE or TOUCH TO START", 120, 460);
    ctx.drawImage(arrowImg, 370, 520, 105, 50);
    ctx.drawImage(spaceImg, 70, 520, 105, 50);
    ctx.font = "20px Lato";
    ctx.fillText("Move Player", 370, 610);
    ctx.fillText("Fire Canon", 70, 610);
    ctx.stroke();
    
    
}

// The following section makes the keys functional
function keyDownHandler(e) {
    if (e.keyCode == 39) { //RIGHT ARROW - ship right
        shipX = shipX + shipMovement;
        pirateship = new Image();
        pirateship.src = 'images/pirateship.png';
        shipL = false;
    } else if (e.keyCode == 37) { //LEFT ARROW - ship left
        shipX = shipX - shipMovement;
        pirateship = new Image();
        pirateship.src = 'images/pirateshipL.png';
        shipL = true;
    } else if (e.keyCode == 32) { // SPACE - fire
		if (gameOn == true && splashScreenOn == false) {
            playFire();
            if (ball.length < ballMax){
                ball.push({
                    x: shipX + 38,
                    y: canvas.height - 20
                });
            }
        } else if (gameOn == false && splashScreenOn == true) {
            gameOn = true;
            splashScreenOn = false;
        }      
	} else if (e.keyCode == 67) { // C - cheat
        if (gameOn == true && bossOn == false) {
            score += 25;
        } else if (bossOn == true) { 
            bossHealth -= 2;
        }
    } else if (e.keyCode == 82) { // R - to restart on gameOver and gameWin
        if (gameOver == true) {
            lvl = 1;
            score = 0;
            playerHealth = 3;
            
            enemy = [];
            enemy[0] = {
                x: Math.floor(Math.random() * canvas.width) - 75,
                y: -180
            };
            
            eHealth = 5;
            enemyHealth = [eHealth];
            
            boss = [];
            boss[0] = {
                x: 250,
                y: -300
            };
            bHealth = 20;
            bossHealth = [bHealth];
            
            gameOver = false;
            gameWin = false;
            gameOn = false;
            splashScreenOn = true;
            bossOn = false;
        } else if (gameWin == true) {
            lvl = 1;
            score = 0;
            playerHealth = 3;
            
            enemy = [];
            enemy[0] = {
                x: Math.floor(Math.random() * canvas.width) - 75,
                y: -180
            };
            eHealth = 5;
            enemyHealth = [eHealth];
            
            boss = [];
            boss[0] = {
                x: 250, 
                y: -300
            };
            
            bHealth = 20;
            bossHealth = [bHealth];
            
            gameWin = false;
            gameOver = false;
            gameOn = false;
            splashScreenOn = true;
            bossOn = false;
        }
    }
    else { // any other key turns the game on from splash (SPACE also does)
        gameOn = true;
		splashScreenOn = false;
    }
}

// The following sections controls sounds
function playFire(e) { 
  	fire.play();
}

function playHit(e) { 
	hit.play();
}

function playExplosion(e) { 
	explosion.play();
}

function playHurt(e) { 
	hurt.play();
}

function playBoss(e) { 
	bossSound.play();
}

function pauseBoss(e) { 
	bossSound.pause();
}

function playbackMusic(e) {
    backMusic.play();
}

function pausebackMusic(e) {
    backMusic.pause();
}