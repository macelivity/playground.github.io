yMovement = 0;

function Update(){
    postMessage(yMovement);
    setTimeout("Update()", 10);
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
