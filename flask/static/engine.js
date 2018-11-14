/* basic engine prototype */
const NPC = require('./npc.js');
const Enemy = require('./enemy.js');
const Player = require('./player.js');
const Item = require('./item.js');
const Element = require('./element.js');
const Character = require('./character.js');
const Environment = require('./environment.js');
const Vector = require('./utility.js').vector;
var step = 0.05;

var canvas = document.getElementById("c");
var width = canvas.width;
var height = canvas.height;
var ctx = canvas.getContext("2d");
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
var rightPressed = false;
var leftPressed = false;
var downPressed = false;
var upPressed = false;

var icon = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToe-PSAektDgBsXLsdybQW6F1wGDdpw2mbm3SaReRPuQ0ec0ns";
var icon2 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKH3Qd3RP33Q5XxcRMrLXYhYGRu_dxvpJCIBEU_MlAudC1ev-P8A";
var elements =
    [ new Player(new Vector(0,0), 10, 10, true, 'item', new Vector(50,50), icon2, new Vector(50,50))
    , new NPC(new Vector(100,100), 10, 10, true, "y tho", new Vector(50,50), icon, new Vector(50,50)),
    new Item(new Vector(100,50), icon, new Vector(50,50), new Vector(50,50), false, "damage")
    ];

// query database and get level info, then translate into list of elements



function update(progress) {

    var pc;
    for(i=0; i<elements.length; i++){
        if(elements[i] instanceof player){
            pc = elements[i];
        }
    }
     
    xObstacles = []
    yObstacles = []
    for(i=1; i<elements.length; i++){
        if(detectXCollision(pc, elements[i]))
            xObstacles.push(elements[i])
        if(detectYCollision(pc, elements[i]))
            yObstacles.push(elements[i])

    if (rightPressed){
      if (pc.position.x+1 < (width-pc.size.x)){
        newPos = pc.newXPos(step)
        pc.moveX(newPos, xObstacles)
      }
    } else if (leftPressed){
      if(pc.position.x-1 > 0){
        newPos = pc.newXPos(step)
        pc.moveX(newPos, xObstacles)
      }
    } else if (upPressed){
      if(pc.position.y-1 > 0){
        newPos = pc.newYPos(step)
        pc.moveY(newPos, yObstacles, true)
      }
    } else {
        newPos = pc.newYPos(step)
        pc.moveY(newPos, yObstacles, false)
    }

    for(i=1; i<elements.length; i++){

        if(detectCollision(pc, elements[i]))
        {
            //if npc, show message
            if(elements[i] instanceof NPC){
               //elements[i].displayMessage();
               console.log(elements[i].getMessage());
                ctx.font = "12px Arial";
                ctx.fillText(elements[i].getMessage(), 0, 0);
                elements[i].shouldDisplay = true;
            }

            //if enemy, either damage w/item or lose health
            if(elements[i] instanceof Enemy){
                if(pc.getOwnedItem().getEffect() == "damage"){
                    elements[i].decHealth(1);
                } else{
                    pc.decHealth(elements[i].getDamage());
                }

            }

            //if item, pick up and remove from elements
            if(elements[i] instanceof Item){
                if(!pc.getEquippedItem()){
                    pc.setEquippedItem(elements[i]);
                }
                pc.inventory.push(elements[i]);
                elements.splice(i,1);
            }

            //if environment, set gravity to 0? then have falling occur later?
            if(elements[i] instanceof Environment){
                gravity=0;
            }
        }
    }
}

function detectXCollision(element1, element2) {
    if ((element1.position.x < element2.position.x + element2.size.x)  && (element1.position.x + element1.size.x  > element2.position.x)) {
        return true;
    }
    return false;
}

function detectYCollision(element1, element2) {
    if ((element1.position.y < element2.position.y + element2.size.y && element1.position.y + element1.size.y > element2.position.y) {
        return true;
    }
    return false;
}

function keyDownHandler(event) {
    console.log(event);
    if(event.keyCode == 68) {
        rightPressed = true;
    }
    if(event.keyCode == 65) {
        leftPressed = true;
    }
    if(event.keyCode == 83) {
    	downPressed = true;
    }
    if(event.keyCode == 87) {
    	upPressed = true;
    }
}

function keyUpHandler(event) {
    console.log("event", event);
    //console.log
    if(event.keyCode == 68) {
        rightPressed = false;
    }
    if(event.keyCode == 65) {
        leftPressed = false;
    }
    if(event.keyCode == 83) {
    	downPressed = false;
    }
    else if(event.keyCode == 87) {
    	upPressed = false;
    }
}

// need to create all the images given urls - this could/should happen within translation function
function imgInit(){
    for(i = 0; i<elements.length; i++){
        elements[i].img = new Image;
        elements[i].img.src = elements[i].sprite;
        console.log(elements[i].img);
    }
}

imgInit();

function draw(){
    ctx.clearRect(0, 0, width, height);
    for(i = 0; i<elements.length; i++){
        var curElement = elements[i];
        if (curElement.shouldDisplay){
            ctx.font = "12px Arial";
            ctx.fillText(curElement.getMessage(), 10, 10);
            curElement.shouldDisplay = false;
        }
        ctx.drawImage(curElement.img,curElement.position.x,curElement.position.y,
            curElement.size.x,curElement.size.y);
    }
}

function loop(timestamp) {
    // game loop
    var progress = timestamp - lastRender;
    update();
    draw();

    lastRender = timestamp;
    window.requestAnimationFrame(loop);
}

var lastRender = 0;
window.requestAnimationFrame(loop);