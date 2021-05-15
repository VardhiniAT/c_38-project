var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var play,end,gamestate;

var gameover,restart,gameover_img,restart_img;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("whjr.jpg");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  restart_img = loadImage("restart.png");
  gameover_img = loadImage("gameOver.png");
}

function setup() {
  createCanvas(900, 300);
  
  trex = createSprite(50,340,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,410,400,20);
  image(groundImage, 0, -900*5, 300, 900*6 )
  ground.addImage("ground",groundImage);
  ground.velocityX = -4;
  ground.scale = 5;
  
  invisibleGround = createSprite(200,365,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  
  play=1;
  end=0
  gamestate=play;
  
  gameover = createSprite(300,150);
  restart = createSprite(300,200);
  gameover.addImage("gameover_img",gameover_img);
  restart.addImage("restart_img",restart_img);
}

function draw() {
background(180);

var x = 0;

camera.position.y = trex.y;
  
  if (gamestate===play)
  {
  score = score + Math.round(getFrameRate()/60);
  text("Score: "+ score, 500,50);

  if(keyDown("space")&&trex.y>300) {
    trex.velocityY = -12;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
    
    gameover.visible=false;
    restart.visible=false;
  
  trex.collide(invisibleGround);
  spawnClouds();
  spawnObstacles();
    
    if (trex.isTouching(obstaclesGroup))
    {
      gamestate=end;
      trex.addImage(trex_collided)
    }
}

if (gamestate===end)
{
  ground.velocityX=0;
  trex.velocityY=0;
  cloudsGroup.setVelocityXEach(0);
  obstaclesGroup.setVelocityXEach(0);
  cloudsGroup.setLifetimeEach(-1);
  obstaclesGroup.setLifetimeEach(-1);
  
    gameover.visible=true;
    restart.visible=true;
  
}

    if(mousePressedOver(restart)) {
      reset();
    //gamestate = play;
    //score = 0;
    ground.velocityX = -4
  }
drawSprites();

}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,240,40,10);
    cloud.y = Math.round(random(80,240));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,340,10,40);
    obstacle.velocityX = -4;
    
    //generate random obstacles
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
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
    
    
  }
}

function reset(){
gamestate=play;
cloudsGroup.destroyEach();
obstaclesGroup.destroyEach();
  score=0;
}
  