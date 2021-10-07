var iron, ironImg;
var bg, backgroundImg;
var stoneImg;
var spikeImg;
var diamondImg;
var diamondScore = 0;
var stoneGroup;
var diamondGroup;
var spikeGroup;
var gameState = "PLAY";
var restart, restartImg;

function preload() {
  backgroundImg = loadImage("images/bg.jpg");
  ironImg = loadImage("images/iron.png");
  stoneImg = loadImage("images/stone.png");
  diamondImg = loadImage("images/diamond.png");
  spikeImg = loadImage("images/spikes.png");
  restartImg = loadImage("images/restart.png")
}

function setup() {
  createCanvas(1000, 600);
  bg = createSprite(580,300);
  bg.addImage(backgroundImg);
  bg.scale = 2;
  iron = createSprite(150, 500)
  iron.addImage(ironImg);
  iron.scale = 0.3;
  stoneGroup = new Group();
  diamondGroup = new Group();
  spikeGroup = new Group();
  restart = createSprite(500, 300);
  restart.addImage(restartImg);
  restart.visible = false;

 
}

function draw() {
    if(gameState === "PLAY"){
    
    bg.velocityY = 5;

    if (bg.y > 715){
    bg.y = bg.width / 4
    } 
    
    iron.velocityY = 0;
    iron.velocityX = 0;

    if (keyDown("up")){
      iron.velocityY = -10
    }

    if (keyDown("down")){
      iron.velocityY = 10
    }

    if (keyDown("left")){
      iron.velocityX = -10
    }

    if (keyDown("right")){
      iron.velocityX = 10
    }

    for (var i = 0; i < (stoneGroup).length; i++) {
      var temp;
      temp = (stoneGroup).get(i);
      if (temp.isTouching(iron)) {
        iron.collide(temp);
      }
    }

    for (var i = 0; i < (diamondGroup).length; i++) {
      var temp;
      temp = (diamondGroup).get(i);
      if (temp.isTouching(iron)) {
        diamondScore++;
        temp.destroy();
        temp = null;
      }
    }

    for (var i = 0; i < (spikeGroup).length; i++) {
      var temp;
      temp = (spikeGroup).get(i);
      if (temp.isTouching(iron)) {
        diamondScore-= 5;
        temp.destroy();
        temp = null;
      }
    }


    generateStones();
    generateDiamonds();
    generateSpikes();

    if(diamondScore <= -10 || iron.y > 610){
      gameState === "END"
    }

    }

    if(gameState === "END"){
      bg.velocity = 0;
      iron.velocity = 0;
      spikeGroup.velocity = 0;
      diamondGroup.velocity = 0;
      stoneGroup.velocity = 0;
      diamondGroup.lifetime = -1;
      stoneGroup.lifetime = -1;
      spikeGroup.lifetime = -1;
      restart.visible = true;
      if(mousePressedOver(restart)){
        restartGame();
    }}

      drawSprites();

      textSize(20);
      text("Diamonds Collected: " + diamondScore, 500, 50);
}
 

  function generateStones(){
    if (frameCount % 60 === 0) {
      var stone = createSprite(120, 0, 40, 10);
      stone.x = random(50, 900)
      stone.addImage(stoneImg);
      stone.scale = 0.5;
      stone.velocityY = 5;
      stone.lifetime = 250;
      stoneGroup.add(stone);
  }
  }

  function generateDiamonds(){
    if (frameCount % 47 === 0) {
      var diamond = createSprite(120, 0, 40, 10);
      diamond.x = random(50, 900)
      diamond.addImage(diamondImg);
      diamond.scale = 0.5;
      diamond.velocityY = 5;
      diamond.lifetime = 250;
      diamondGroup.add(diamond);
  }
  }

  function generateSpikes(){
    if (frameCount % 79 === 0) {
      var spike = createSprite(120, 0, 40, 10);
      spike.x = random(50, 900)
      spike.addImage(spikeImg);
      spike.scale = 0.5;
      spike.velocityY = 4;
      spike.lifetime = 250;
      spikeGroup.add(spike);
  }
  }

function restartGame(){
  gameState = "PLAY";
  restart.visible = false;
  diamondScore = 0;
  stoneGroup.destroyEach();
  spikeGroup.destroyEach();
  diamondGroup.destroyEach();
}