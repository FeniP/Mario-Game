var gameState = "Play";
var ground, groundImage, bg, bgImage;
var mario, mAnimation;
var obstacle, obstacleAnimation, coin, coinsImage;
var score;
var obstaclesGroup, coinsGroup;
var jumpSound, dieSound, checkPointSound;
var collidedAnimation;
var gameOver, gameOverImage, restart, restartImage;
var highScore=0;
var score=0
var rand;



function preload() {
marioANI= loadAnimation("mario01.png","mario02.png","mario03.png")
groundImage= loadImage("ground2.png")
bgImage= loadImage("bg.png");

dieSound=loadSound("die.mp3");
checkPointSound=loadSound("checkPoint.mp3");
jumpSound=loadSound("jump.mp3");
gameOverImage=loadImage("gameOver.png");
restartImage=loadImage("restart.png")
obstacle1IMG = loadAnimation("obstacle1.png","obstacle2.png","obstacle3.png","obstacle4.png");
collidedAnimation=loadAnimation("collided.png")  
coinsImage=loadImage("coin.png")
}

function setup() {
  createCanvas(600, 400);

  bg= createSprite(200,200,600,400);
  bg.addImage(bgImage);
  bg.x=bg.width/2
  bg.scale=1.2

  obstaclesGroup= new Group()
  coinsGroup= new Group()
  
  mario= createSprite(50,308,10,40);
mario.addAnimation("running", marioANI);
mario.addAnimation("collide",collidedAnimation)

mario.scale=1.4

ground= createSprite(200,370,250,10);
ground.addImage(groundImage);
ground.scale=1.0

restart=createSprite(300,200)
restart.addImage(restartImage)
restart.scale=0.5

gameOver=createSprite(290,160)
gameOver.addImage(gameOverImage)
gameOver.scale=0.5


score=0

}

function draw() {
  background(210);

  if(gameState=="Play"){

gameOver.visible=false
restart.visible=false


    
ground.velocityX=-10
  if (ground.x < 0){
    ground.x = ground.width/2;
  }

if(keyDown("space")&&mario.y>150){
  mario.velocityY=-10 
  jumpSound.play();
}

mario.velocityY +=0.8

for (i=0;i<coinsGroup.length;i++){
  if(mario.isTouching(coinsGroup.get(i)))
  {
    score = score + 1;
        
    if(highScore<score){
      highScore=score;
  }
coinsGroup.get(i).destroy()
}

}

if (score > 0 && score%100===0) {
  checkPointsound.play();
}

if (mario.isTouching(obstaclesGroup)) {
  gameState = "End";
  mario.changeAnimation("collide", collidedAnimation);
  dieSound.play();
}
  }
  else if(gameState==="End"){

    gameOver.visible=true
restart.visible=true

    ground.velocityX=0
    mario.vel0cityY=0
obstaclesGroup.setVelocityXEach(0)
coinsGroup.setVelocityXEach(0)

if(mousePressedOver(restart))
{
reset ()}
  }


mario.collide(ground); 


spawnObstacles();

spawnCoins();



//add obstacles
//use math.round

drawSprites();

textSize(18);
fill(0)
text("SCORE: " + score, 350, 40);
textSize(16);
fill(120);
text("HighestScore:" + highScore,350,60);




}

function reset(){
  gameState="Play"
score=0
obstaclesGroup.destroyEach()
  coinsGroup.destroyEach()
  mario.changeAnimation("running",marioANI)



  
}




function spawnObstacles() {
  if (frameCount % 100 === 0) {
    obstacle = createSprite(600, 315, 10, 30);
    obstacle.velocityX = -10;
    obstacle.addAnimation("obsAni", obstacle1IMG);
    obstacle.scale = 0.7;
    obstacle.lifetime = 170;
    obstaclesGroup.add(obstacle);
  }
}
function spawnCoins() {
  if (frameCount % 150 === 0) {
    var coins = createSprite(600, 300, 10, 10);
    coins.y =  Math.round(random(170, 200));
    coins.addImage(coinsImage);
    coins.scale = 0.5;
    coins.velocityX = -3;
    coinsGroup.add(coins)
  }
}