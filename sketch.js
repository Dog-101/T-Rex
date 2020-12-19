var jumpsound, diesound,checkpointsound;
var gameOver,gameoverimage;
var trex1;
var score;
var cacti,cacti1,cacti2,cacti3,cacti4;
var trex, trex_running, edges;
var ground;
var invisibleGround;
var clouds;
var groundimage;
var cloudImage;
var cloudGroup,cactusGroup;
var gameState="play";      //"end";

function preload(){
 jumpsound= loadSound("jump.mp3");
 diesound= loadSound("die.mp3");
 checkpointsound= loadSound("checkpoint.mp3");
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
 groundimage=loadImage("ground2.png");
  cloudImage=loadImage("cloudAnim.png");
cacti1=loadImage("cactus.png");
cacti2=loadImage("twoCacti.png")  ;
cacti3=loadImage("threeCacti.png");
cacti4=loadImage("cacti.png");
  trex1=loadAnimation("trex1.png");
  gameoverimage=loadImage("restart.jpg");
}

function setup(){
  score=0;
  createCanvas(600,200);
  
  invisibleGround=createSprite(200,190,800,40);
  invisibleGround.visible=false;
  ground=createSprite(200,172,800,40);
  ground.addImage(groundimage);
  gameOver=createSprite(100,100,50,20);
  gameOver.addImage(gameoverimage);
 // ground.debug=true;
  // creating trex
  trex = createSprite(50,160,20,50);
  //trex.addImage("collide",trex1);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex1);
  edges = createEdgeSprites();
 // trex.debug=true;
  
  //adding scale and position to trex
  trex.scale = 0.5;
  trex.x = 50;
  trex.setCollider("circle",0,0,20);
  
  cloudGroup=createGroup();
  
  cactusGroup=createGroup();
  
  
}




function draw(){
  
  frameRate(1000);
  console.log(frameRate());
  //set background color 
  background(190);
  textSize(30);
  text(score,500,100);
  
  if(gameState==="play"){
  
  gameOver.visible=false;
  score=score+(Math.round((getFrameRate()/120)));
  if(score>0&&score%100===0){
    checkpointsound.play();
  }
  ground.velocityX= -(5+score/10);
  if(ground.x<0){
    ground.x=ground.width/2;
  
  }
  //trex.velocityX= 5;
  
  //logging the y position of the trex
  console.log(trex.y);
  
  //jump when space key is pressed
  if(keyDown("space")&&trex.y>155){
    trex.velocityY = -10;
    jumpsound.play();
  }
  
  trex.velocityY = trex.velocityY + 0.5;
  
  if(cactusGroup.isTouching(trex)){
    gameState="end";
    trex.velocityY=0;
    ground.setVelocity(0,0);
    cactusGroup.setVelocityXEach(0);
    trex.changeAnimation("collided",trex1);
    gameOver.visible=true;
    diesound.play();        //for continuous diesound.loop();
  cactusGroup.setLifetimeEach(-1);
   
  }
  

  
    cloud();
  cactiFunc();
  } 
  else{
     if(mousePressedOver(gameOver)){
      gameState="play";
      cactusGroup.destroyEach();
      score=0;
      trex.changeAnimation("running",trex_running);
    }
  }
  
    //stop trex from falling down
  trex.collide(invisibleGround);
  drawSprites();

}
function cloud(){
  if(frameCount%100==0){
    
 
  
  
  clouds=createSprite(600,Math.round(random(20,60)),20,20);
  clouds.addAnimation("cl",cloudImage);
  clouds.scale=0.3;
  clouds.velocityX=-5;
  clouds.depth=1;
  clouds.lifetime=140;
  cloudGroup.add(clouds);

  }

}
function cactiFunc(){
  if(frameCount%100==0){
    cacti=createSprite(600,165,10,10);   
    cacti.velocityX=-(5+score/20);
    var randomN=Math.round(random(1,4));
    switch (randomN){
      case 1:cacti.addImage("cact1",cacti1);
        cacti.scale= 0.03;
        break;
      case 2:cacti.addImage("cact2",cacti2);
        cacti.scale=0.35;
        break;
      case 3:cacti.addImage("cact3",cacti3);
        cacti.scale= 0.5;
        break;
      case 4:cacti.addImage("cact4",cacti4);
        cacti.scale=0.1;
        break;
        
        default:break;
    
        
    }
  cacti.lifetime=width/Math.abs(cacti.velocityX);
  cactusGroup.add(cacti);
  }
  
}