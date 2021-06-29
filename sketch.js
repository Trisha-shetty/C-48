var shin, shinimg
var bg, bgimg
var cap, capimg
var coin, coinimg
var coingrp, capgrp
var gameState = "play"
var score=0
var ig
var ak,akimg
function preload() {
  shinimg = loadAnimation("img/sw1.png", "img/sw2.png", "img/sw3.png", "img/sw4.png", "img/sw5.png")
  bgimg = loadImage("img/bg.jpg")
  capimg = loadImage("img/capsicum.png")
  coinimg = loadImage("img/coin.png")
akimg=loadImage("img/action kamen.png")
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  bg = createSprite(width - width / 3, height / 2)
  bg.addImage(bgimg)
  bg.scale = 2.6
  bg.velocityX = -2
  shin = createSprite(width / 4, height - height / 4);
  shin.addAnimation("walk", shinimg)
  shin.scale = 4
  shin.debug=false
  shin.setCollider("circle",0,0,10)
  capgrp = new Group()
  coingrp = new Group()
  ig=createSprite(width/2,height-height/8,width,20)
  ig.visible=false
  ak=createSprite(width/2,height/2+height/4)
  ak.addImage(akimg)
  ak.visible=false;
}

function draw() {
  background(255, 0, 255);
  if (gameState === "play") {
    if (bg.x < width / 3) {
      bg.x = width / 2
    }
    if(keyDown("space")&&shin.y>height/2){
      shin.velocityY=-10
    }
    shin.velocityY=shin.velocityY+0.5
    shin.collide(ig)
    spawnCap()
    spawnCoin()
    if(capgrp.isTouching(shin)){
      gameState="end"
    }
    for(var i=0;i<coingrp.length;i++){
     if(coingrp.get(i).isTouching(shin)){
       score=score+2
      coingrp.get(i).destroy()
     }
    }
    drawSprites();
    if(score===10){
    bg.velocityX=0
    coingrp.setVelocityXEach(0)
    capgrp.setVelocityXEach(0)
    ak.visible=true
    textSize(25)
    fill("black")
    text("CONGRATULATIONS...YOU WON ",width/2,height/2)
    }
  
    textSize(25)
    fill("black")
    text("Score = "+score,width-width/4,100)
  }
  if(gameState==="end"){
    textSize(40)
text("GAME OVER",width/2,height/2)
  }
}
function spawnCap() {
  if (frameCount % 150 === 0) {
    cap = createSprite(width, height - height / 4)
    cap.velocityX = -2
    cap.addImage(capimg)
    cap.scale = 0.3
    capgrp.add(cap)
  }
}
function spawnCoin() {
  if (frameCount % 90 === 0) {
    coin = createSprite(width, height - height / 4)
    coin.velocityX = -2
    coin.addImage(coinimg)
    coin.scale = 0.2
    coin.y = Math.round(random(height - height / 2, height - height / 4))
    coingrp.add(coin)
  }
}