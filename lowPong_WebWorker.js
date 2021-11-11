yMovement = 0;

function Update(){
    postMessage(yMovement);
    setTimeout("Update()", 10);
}
