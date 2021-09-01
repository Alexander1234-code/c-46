var bird,pipes,ground,database;
var score1,score2,restart,logo,gameoverImg,gameover,score=0;
var birdImg,pipeImg,pipeImg2,groundImg,scoreImg,restartImg,bgImg,logoImg,best=0;
var play=1,end=0,gameState=play;

function preload(){

  birdImg= loadImage("bird2.png");
  pipeImg= loadImage("pipe.png");
  pipeImg2=loadImage("pipe2.png")
  groundImg= loadImage("ground.png");
  scoreImg= loadImage("score.png");
  restartImg= loadImage("restart.png");
  bgImg= loadImage("background.png");
  logoImg= loadImage("logo.png");
  gameoverImg= loadImage("gameOver.png");
  
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  database=firebase.database();

  var readScore=database.ref('best').on("value",readScoreValue);
 bird=createSprite(200,200,30,30);
 ground=createSprite(500,750,500,50);
 
 ground.addImage("ground",groundImg);
 ground.velocityX=-3;
 ground.x=ground.width/2;

 bird.addImage("bird",birdImg);
 bird.scale=0.5;

 logo=createSprite(750,20,10,10);
 logo.addImage("logo",logoImg);
 logo.scale=1.5;

 pipe1Group = new Group();
 pipe2Group = new Group();

 gameover=createSprite(750,500,20,20);
 gameover.addImage("over",gameoverImg);
 gameover.visible=false;

 score1=createSprite(750,200,20,20);
 score1.addImage("score",scoreImg);
 score1.visible=false;
}

function draw(){
  background(bgImg);
  if(gameState===play){
    textSize(20);
    fill("red");
    text("SCORE :"+score,100,20);
    if(ground.x<600){
      ground.x=ground.width/2;
    }
    if(keyWentDown("space")){
      bird.velocityY=-10;
    }
    bird.velocityY+=0.5;
    if(pipe1Group.isTouching(bird) || pipe2Group.isTouching(bird) || bird.isTouching(ground)){
      gameState=end;
    }
   pipe1();
   pipe2();
  }

  if(gameState===end){
    gameover.visible=true;
    textSize(20);
    text(":"+score,750,200);
    score1.visible=true;
    if(score>score2){
      database.ref('best').set({
        'best': score
      })
    }
    if(score2>score){
      database.ref('best').set({
        'best': score2
      })
    }
    ground.velocityX=0;
    bird.velocityX=0;
    bird.destroy();
    pipe1Group.setVelocityXEach(0);
    pipe2Group.setVelocityXEach(0);
    pipe1Group.setLifetimeEach(-1);
    pipe2Group.setLifetimeEach(-1);
  }
  

 drawSprites();

}

function pipe1(){
  if(frameCount%160===0){
    obs1=createSprite(1500,700,40,10);
    obs1.y=Math.round(random(700,825));
    obs1.addImage("pipe",pipeImg);
    obs1.scale=0.6;
    obs1.velocityX=-4;
    obs1.lifetime=375;
    pipe1Group.add(obs1);
  }
}

function pipe2(){
  if(frameCount%160===0){
    obs2=createSprite(1500,50,40,10);
    //obs2.y=Math.round(random(300,500));
    obs2.addImage("pipe2",pipeImg2);
    obs2.scale=0.6;
    obs2.velocityX=-4;
    obs2.lifetime=375;
    pipe2Group.add(obs2);
  }
}
function readScoreValue(){
  score2=data.val();
  best=score2;

}