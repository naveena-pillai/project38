var monkeyAnimation, monkey, jungleImage, jungle, invisibleGround, rock, rockImage, score, banana, bananaGroup, bananaImage, PLAY, END, gameState, rockGroup;

function preload(){
  monkeyAnimation = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

   jungleImage = loadImage("jungle.jpg");
  
  rockImage = loadImage("stone.png");
  
  bananaImage = loadImage("banana.png");
  
}

function setup() {
  createCanvas(500, 200);
  
  jungle = createSprite(320,10,500,600);
  jungle.addImage(jungleImage);
  jungle.scale = 1;
  jungle.velocityX = -2;
  jungle.x = jungle.x/4;
  
  monkey = createSprite(50,150,20,50);
  monkey.addAnimation("monkeyAnimation",monkeyAnimation);
  monkey.scale = 0.1;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  score = 0;
  
  bananaGroup = new Group();
  rockGroup = new Group();
  
  PLAY = 1;
  END = 0;
  gameState = PLAY;
  
}

function draw() {
  background(220);
drawSprites();
   if(bananaGroup.isTouching(monkey)){
      score = score + 1;
      bananaGroup.destroyEach();
    }
  fill("white");
  text("Score: "+ score, 400,50);
  
  monkey.collide(invisibleGround);
  
  if(gameState===PLAY){
  if(keyDown("space")) {
    monkey.velocityY = -10;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8
  
   if (jungle.x < 0){
    jungle.x = jungle.width/2;
  }
  spawnRocks();
  spawnBanana();
  }
  if(monkey.isTouching(rockGroup)){
     gameState = END;
     }
  else if(gameState===END){
     bananaGroup.setLifetimeEach(-1);
    bananaGroup.setVelocityXEach(0);
    rockGroup.setLifetimeEach(-1);
    rockGroup.setVelocityXEach(0);
    jungle.velocityX = 0;
    monkey.velocityY = 0;
    text("Game Over!",20,100);
  }
  
  camera.x = monkey.x;

}

function spawnRocks() {
  if(frameCount % 80 === 0) {
    var rock = createSprite(500,165,10,40);
    rock.velocityX = -4;
    rock.addImage(rockImage);
    rock.scale = 0.1;
    rockGroup.add(rock);
  }
}

function spawnBanana(){
  if(frameCount%80===0){
    var banana = createSprite(400,320,40,10);
    banana.y = random(20,180);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -3;
    banana.lifetime = 150;
    bananaGroup.add(banana);
  }
}