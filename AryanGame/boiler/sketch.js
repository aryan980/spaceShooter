var spaceship;
var aliens1,alien2,alien3,alien4,alien5;
var  gameover;
var bg;
var bulletsGroup,aliensGroup;
var score=0;
var PLAY=1;
var END=0;
var gameState = PLAY;
var boomsound;
var firesound;
var score=0;
var life=3;
localStorage["highestscore"]=0
var reset;
function preload(){
alien1=loadImage("images/alien1.png");
alien2=loadImage("images/alien2.jpg");
alien3=loadImage("images/alien3.jpg");
alien4=loadImage("images/alien4.png");
alien5=loadImage("images/aliens5.jpg");
spaceship1=loadImage("images/spaceship.jpg");
bullet=loadImage("images/bullet.png");
bg=loadImage("images/background.jpg");
fires=loadSound("sounds/spacefire.mp3");
gameover=loadImage("images/gameover.png");
restart=loadImage("images/reset.png");
boomsound=loadSound("sounds/explosion.wav");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  space=createSprite(width/2,height/2);
  space.addImage(bg);
  space.scale=4;
  spaceship=createSprite(width/2-20,height-50);
  spaceship.addImage(spaceship1);
  spaceship.scale=0.4;
  aliensGroup=new Group();
  bulletsGroups=new Group();
  restart1=createSprite(width/2,height/2+100)
  restart1.addImage(restart);
  restart1.scale=0.5;
  restart1.visible=false;
  gameover1=createSprite(width/2,height/2-50);
  gameover1.addImage(gameover);
  gameover1.visible=false;
  gameover1.scale=0.5;
  
}

function draw() {
  background(0); 
  
 
  if(gameState===PLAY){
    spaceship.x=mouseX 
    space.velocityY=5;
    if(space.y>height){
      space.y=height/2;
    }
    if(keyDown("space")){
      bullet_temp=spawnbullets();
      fires.play()
    }    
    spawnAliens();
    if(bulletsGroups.isTouching(aliensGroup)){
     bulletsGroups[0].destroy();
     aliensGroup[0].destroy();
     score=score+2;
    } 

    if(aliensGroup.isTouching(spaceship)){
      boomsound.play()
      life=life-1;
      
        gameState=END;
      
     
    }
   
  }
  else if(gameState===END){
    space.velocityY=0;
    aliensGroup.setVelocityEach(0);
    restart1.visible=true;
    gameover1.visible=true;
    if(mousePressedOver(restart1)){
      reset()
    }
  }
  
 
  drawSprites();
  textSize(20);
  stroke("white")
  fill("white")
  text("Score: "+score,width-250,100)
  text("life: "+life,width-250,150);
}
function spawnbullets(){
  if(frameCount%5===0){
    bullets=createSprite(width/2,height-100,20,20);
    bullets.x=spaceship.x
  bullets.addImage(bullet);
  bullets.velocityY=-5;
  bullets.scale=0.15;
  bulletsGroups.add(bullets);
  bullets.lifetime=300;
  return bullets
  
  }
 
}
function spawnAliens() {
  if(frameCount % 60 === 0) {
    var alien = createSprite(300,-40);
    //obstacle.debug = true;
    alien.velocityY = 6;
    alien.x=Math.round(random(50,width-50));
    //generate random obstacles
    var rand = Math.round(random(1,5));
    switch(rand) {
      case 1: alien.addImage(alien1);
              break;
      case 2: alien.addImage(alien2);
              break;
      case 3: alien.addImage(alien3);
              break;
      case 4: alien.addImage(alien4);
              break;
      case 5: alien.addImage(alien5);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    alien.scale = 0.5;
    alien.lifetime = 300;
    //add each obstacle to the group
    aliensGroup.add(alien);
  }
  
}
function reset(){
  if(life>0){
    score=score;
  }
  else{
    score=0
    //text("highestscore: "+localStorage["highestscore"],width/2,10);
    
  }
  gameState = PLAY;
  gameover1.visible = false;
  restart1.visible = false;


  if(localStorage["highestscore"]<score){
    localStorage["highestscore"]=score
  }
}