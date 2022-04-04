var PLAY = 1;
var END = 0;
var gameState = PLAY;

var miko, running,collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;

var score;
var gameoverImg,startImg
var jumpSound,checkPointSound,dieSound

function preload(){
  running = loadAnimation("running.png","mid.png");
  collided = loadAnimation("collided.png");
  
  groundImage = loadImage("ground.jpg");
  
  cloudImage = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  

  gameoverImg = loadImage("gameover.png");
  startImg = loadImage("start.png");
 
  jumpSound = loadSound("jumpsound.wav");
  dieSound = loadSound("dieSound.wav");
checkPointSound = loadSound("checkpoint.mp3");

}

function setup() {
 
  createCanvas(windowWidth,windowHeight)
  
  ground=createSprite(height/2,200);
  ground.addImage(groundImage);
  ground.velocityX = 3;


  var message = "This is a message";
 console.log(message)
  
  miko = createSprite(350,360,20,50);
  miko.addAnimation("running", running);
  miko.addAnimation("collided", collided);
  

  miko.scale = 0.5;
  
  ground = createSprite(200,300,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  gameover = createSprite(400,200);
  gameover.addImage(gameoverImg);
  
  start = createSprite(400,340);
  start.addImage(startImg);
  
 
  gameover.scale = 0.5;
  start.scale = 0.5;
  
  invisibleGround = createSprite(200,290,400,10);
  invisibleGround.visible = false;
  
 
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();

  
  miko.setCollider("rectangle",0,0,miko.width,miko.height);
  miko.debug = false

  score = 0;
  
}

function draw() {
  
  background(180);
  
  text("Score: "+ score, 500,50);
  
  
  if(gameState === PLAY){

    gameover.visible = false;
    start.visible = false;
    
    ground.velocityX = -(4 + 3* score/100)
    
    score = score + Math.round(getFrameRate()/60);
    
    if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    
    if(keyDown("space")&& miko.y >= 100) {
        miko.velocityY = -12;
        jumpSound.play();
    }
    
    miko.velocityY = miko.velocityY + 0.8
  
   
    spawnClouds();
  
    
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(miko)){
       
        jumpSound.play();
        gameState = END;
        dieSound.play()
      
    }
  }
   else if (gameState === END) {
      gameover.visible = true;
      start.visible = true
     
    
      miko.changeAnimation("collided", collided);
    
     
     
      ground.velocityX = 0;
      miko.velocityY = 0
      
     
      
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);    
   }
  
 
  
  miko.collide(invisibleGround);
  
  if(mousePressedOver(start)) {
      reset();
    }


  drawSprites();
}

function reset(){
  
gameState=PLAY
gameover.visible=false
start.visible=false
obstaclesGroup.destroyEach()
cloudsGroup.destroyEach()
miko.changeAnimation("running", running)
score=0

}


function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,465,10,40);
   obstacle.velocityX = -(6 + score/100);
   
    
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
            
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
 
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.3;
    cloud.velocityX = -3;
    
    
    cloud.lifetime = 200;
    
   
    cloud.depth = miko.depth;
    miko.depth = miko.depth + 1;
    
    
    cloudsGroup.add(cloud);
  }
}





