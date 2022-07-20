let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");

cnv.width = 800;
cnv.height = 600;
function randomRGB() {
    let r = randomInt(0,256);
    let g = randomInt(0, 256);
    let b = randomInt(0, 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}
function fill(color){
    ctx.fillStyle = color;
}
function line(x,y,x2,y2){
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}
function rect(x,y,w,h,mode){
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    if (mode == "fill"){
        ctx.fill();
    }
    else if (mode == "stroke"){
        ctx.stroke();
    }
}
function circle(x,y,r,mode){
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    if (mode == "fill"){
        ctx.fill();
    }
    else if (mode == "stroke"){
        ctx.stroke();
    }
}
function dist(x1, y1, x2, y2) {
    return Math.hypot(x2 - x1, y2 - y1);
}
let mouseX;
let mouseY;
let bubbles = [];
for (let n = 1; n < 15; n++){
    bubbles.push(newRandomBubble());
}
function more(){
    bubbles.push(newRandomBubble());
}
function less(){
    bubbles.pop();
}

requestAnimationFrame(draw);
function draw(){
    ctx.clearRect(0,0,cnv.width,cnv.height);
    for (let i = 0; i < bubbles.length; i++){
        moveBubble(bubbles[i]);
        drawBubble(bubbles[i]);
        bubbleClicked(bubbles[i]);
        if (bubbles[i].y + bubbles[i].r  >= cnv.height){
            bubbles[i].y = cnv.height -bubbles[i].r
            bubbles[i].speed = bubbles[i].speed * -0.97
        }
        if (bubbles[i].y < -200){
            bubbles[i].y = -199
            bubbles[i].speed = bubbles[i].speed * -0.97
        }
        if (bubbles[i].x - bubbles[i].r < 0){
            bubbles[i].x = bubbles[i].r
            bubbles[i].speedX = bubbles[i].speedX * -1
        } else if(bubbles[i].x + bubbles[i].r > cnv.width){
            bubbles[i].x = cnv.width -bubbles[i].r
            bubbles[i].speedX = bubbles[i].speedX * - 1
        }
    }
    drawPlayer();
    movePlayer();
    requestAnimationFrame(draw);
}

function newRandomBubble(){
    return{
        x: randomInt(0, cnv.width),
        y:randomInt(0, cnv.height * 3/4),
        r:randomInt(22,50),
        color: randomRGB(),
        speed: 0,
        accel: 0.05,
        speedX: randomInt(-1, 2)
    };
}
function randomInt(low,high){
    return Math.floor(Math.random() * (high -low) + low);
}
function stroke(color){
    ctx.strokeStyle = color;
}
function drawBubble(aBubble){
    stroke(aBubble.color);
    circle(aBubble.x,aBubble.y,aBubble.r,"stroke");
}
function moveBubble(aBubble){
        aBubble.speed += aBubble.accel;
        if(aBubble.speed < -5){
            aBubble.speed = -5;
        }
    aBubble.y += aBubble.speed;
    aBubble.x += aBubble.speedX;
}
document.addEventListener("mousedown", mousedownHandler);
document.addEventListener("mouseup", mouseupHandler);
let mouseIsPressed = false;
function mousedownHandler(event) {
    mouseIsPressed = true;
    mouseX = event.clientX - cnv.width/2;
    mouseY = event.clientY;
}
function mouseupHandler() {
    mouseIsPressed = false;
}
function bubbleClicked(aBubble) {
    if (dist(mouseX, mouseY, aBubble.x - aBubble.r * 1.8, aBubble.y) < aBubble.r && mouseIsPressed) {
        aBubble.speed += -1;
        aBubble.speedX = randomInt(-1,2);
    }
}
let player = {
    x: cnv.width/2,
    y: cnv.height/2,
    r: 15,
    color: "white",
    ps: 0,
    pa: 0.1
}
function drawPlayer(){
    fill(player.color);
    circle(player.x,player.y,player.r,"fill");
}
let moveLeft =  false;
let moveRight= false;
let moveUp = false;
document.addEventListener("keydown",(moveP));
function moveP(event){
    switch (event.key){
        case "ArrowUp": moveUp = true; break;
        case "ArrowLeft": moveLeft = true; break;
        case "ArrowRight": moveRight = true; break;
    }
}


function movePlayer(){
    player.ps += player.pa
    player.y += player.ps
    if(player.y + player.r > cnv.height ){
        player.y = cnv.height - player.r
    }

}