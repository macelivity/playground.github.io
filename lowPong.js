score = 0;
scoreText = document.getElementById("scoreText");
highscore = 0;
highscoreText = document.getElementById("highscoreText");

function Update(){
    movePlayer();
    moveBall();
}

setInterval(Update, 10);


function pixelToPos(pixel){
    return parseInt(pixel.substring(0, pixel.length - 2));
}



//Player area

playerObj = document.getElementById("playerPlatform");

yMovement = 0;
playerObj.style.top = -268 + 'px';

function movePlayer(){
    playerObj.style.top = Math.max(-518, Math.min(-18, pixelToPos(playerObj.style.top) - yMovement * 2)) + 'px';
}

function startMovingUp(){
    yMovement += 1;
}
function stopMovingUp(){
    yMovement -= 1;
}

function startMovingDown(){
    yMovement -= 1;
}
function stopMovingDown(){
    yMovement += 1;
}



//Ball area

ball = document.getElementById("ball");

ballXMovement = 1.5;
ballYMovement = 1;
speed = 1.1;


function resetBall(){
    ball.style.top = -268 + 'px';
    ball.style.left = -500 + 'px';
    speed = 1.1;
    score = 0;
    scoreText.innerHTML = "Score: " + score;
}

resetBall();

function moveBall(){
    xPos = pixelToPos(ball.style.left);
    yPos = pixelToPos(ball.style.top);
    playerYPos = pixelToPos(playerObj.style.top);

    if(yPos <= -596) ballYMovement = -1;
    else if(yPos >= -8) ballYMovement = 1;
    if(xPos >= -44) ballXMovement = -1;
    else if(xPos <= -955 && xPos >= -967 && yPos - playerYPos <= 22 && yPos - playerYPos >= -90) {
        ballXMovement = 1;
        score++;
        scoreText.innerHTML = "Score: " + score;
        highscore = Math.max(score, highscore);
        highscoreText.innerHTML = "Highscore: " + highscore;
    }
    else if(xPos <= -1005) resetBall();

    speed += 0.0003;

    ball.style.top = (pixelToPos(ball.style.top) - ballYMovement * speed) + 'px';
    ball.style.left = (pixelToPos(ball.style.left) + ballXMovement * speed) + 'px';
}

function setSpeed(value){
    speed = value;
}
