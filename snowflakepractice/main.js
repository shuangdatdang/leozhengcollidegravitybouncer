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
for (let n = 1; n < 10; n++){
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
        bubbleCollide(bubbles[i]);
        if (bubbles[i].y + bubbles[i].r  >= cnv.height){
            bubbles[i].y = cnv.height -bubbles[i].r
            bubbles[i].speed = bubbles[i].speed * -1
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
        speedX: randomInt(-0.5, 1.5)
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

function bubbleCollide(aBubble) {
    if (dist(player.x, player.y, aBubble.x, aBubble.y) < player.r + aBubble.r && moveUp) {
        aBubble.speed += player.ps;
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
let moveUp = false;
let moveLeft =  false;
let moveRight= false;
document.addEventListener("keydown",(moveP));
function moveP(event){
    switch (event.key){
        case "ArrowUp": player.ps += -8; moveUp = true; break;
        case "ArrowLeft": moveLeft = true; break;
        case "ArrowRight": moveRight = true; break;
    }
}
document.addEventListener("keyup",(dontMoveP));
function dontMoveP(event){
    switch (event.key){
        case "ArrowUp": moveUp = false; break;
        case "ArrowLeft": moveLeft = false; break;
        case "ArrowRight": moveRight = false; break;
    }
}

function movePlayer(){
    player.ps += player.pa
    player.y += player.ps
    if(player.ps > 4){
        player.ps = 4
    }else if(player.ps < -5){
        player.ps = -5
    }
    if(player.y + player.r > cnv.height ){
        player.y = cnv.height - player.r
    }
    if(player.y < -200){
        player.y = -200;
        player.ps *= -1
    }
    if (moveLeft){
        player.x += -3
    }else if(moveRight){
        player.x += 3
    }
    if(player.x - player.r<0) {
        player.x = player.r
    }else if(player.x + player.r > cnv.width){
        player.x = cnv.width - player.r
    }
}