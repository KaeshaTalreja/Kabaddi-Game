var database;
var player1, player2, playerAnim1, playerAnim2,playerAnimStop1,playerAnimStop2;
var player1Pos, player2Pos;
var gameState;
var player1Score = 0;
var player2Score = 0;
var toss;
var game,form;

function preload() {
  playerAnim1 = loadAnimation("assets/player001.png","assets/player002.png");
  playerAnim2 = loadAnimation("assets/player003.png","assets/player004.png");
  playerAnimStop1=loadAnimation("assets/player001.png");
  playerAnimStop2=loadAnimation("assets/player003.png");
}

function setup() {
  createCanvas(600,600);
  database = firebase.database();
  form=new Form();
  form.display();
  game=new Game();
  player=new Player();
  game.getGameState();
  player.getScore();

  player1 = createSprite(400, 300);
  player1.addAnimation("player1 moving", playerAnim1);
  player1.addAnimation("player1 stopped", playerAnimStop1);
  player1.setCollider("circle", 0, 0, 40);
  player1.debug = true;
  playerAnim1.frameDelay = 200;
  player1.scale = -0.5;

  player2 = createSprite(200, 300);
  player2.addAnimation("player2 moving", playerAnim2);
  player2.addAnimation("player2 stopped", playerAnimStop2);
  player2.setCollider("circle", 0, 0, 40);
  player2.debug = true;
  playerAnim2.frameDelay = 200;
  player2.scale = 0.5;

  player.readPosition();
}

function draw() {
  background("white");

  textSize(20);
  
  fill("red");
  text("RED: " + player1Score, 350, 20);
  fill("yellow");
  text("YELLOW: " + player2Score, 170, 20);

  //center line
  for (var num = 0; num <= 600; num = num + 20) 
    line(300, num, 300, num + 10);

  //yellow line
  for (var num = 0; num <= 600; num = num + 20) {
    strokeWeight(3);
    stroke("yellow");
    line(100, num, 100, num + 10);
  }

  //red line
  for (var num = 0; num <= 600; num = num + 20) {
    strokeWeight(3);
    stroke("red");
    line(500, num, 500, num + 10);
  }

  if (gameState === 0) {
    player1.changeAnimation("player1 stopped");
    player2.changeAnimation("player2 stopped");
    textSize(20);
    stroke("black");
    text("Press 'Space' to toss", 220, 200);

    text("Instructions",220,50);
    text("use arrow keys for red player and asdw for yellow player",20,100);
  }

  if (gameState === 2) {
    if (player2.x > 500) {
      player.writeScore(-5, 5);
      alert("RED WON");
      game.updateGameState(3);
      player1.changeAnimation("player1 stopped");
      player2.changeAnimation("player2 stopped");
    }

    if (player1.isTouching(player2)) {
      player.writeScore(5, -5);
      alert("RED LOST");
      game.updateGameState(3);
      player1.changeAnimation("player1 stopped");
      player2.changeAnimation("player2 stopped");
    }
  }
  

  if (gameState === 1) {
    if (player1.x < 100) {
      player.writeScore(5, -5);
      alert("YELLOW WON");
      game.updateGameState(3);
      player1.changeAnimation("player1 stopped");
      player2.changeAnimation("player2 stopped");
    }

    if (player1.isTouching(player2)) {
      player.writeScore(-5, 5);
      alert("YELLOW LOST");
      game.updateGameState(3);
      player1.changeAnimation("player1 stopped");
      player2.changeAnimation("player2 stopped");
    }
  }

  drawSprites();
  if (keyIsDown(LEFT_ARROW) ) {
    player.writePosition1(-3, 0);
  }
  if (keyIsDown(RIGHT_ARROW )) {
    player.writePosition1(+3, 0);
  }
  if (keyIsDown(UP_ARROW)) {
    player.writePosition1(0, -3);
  }
  if (keyIsDown(DOWN_ARROW)) {
    player.writePosition1(0, +3);
  }

  if (keyDown('a')) {
    player.writePosition2(-3, 0);
  }
  if (keyDown('d')) {
    player.writePosition2(+3, 0);
  }
  if (keyDown('w')) {
    player.writePosition2(0, -3);
  }
  if (keyDown('s')) {
    player.writePosition2(0, +3);
  }
}





function updateToss(t) {
  database.ref("/").update({
    toss: t,
  });
}



function resetPlayerPositions() {
  database.ref("players/player1/position").update({
    x: 400,
    y: 300
  });
  database.ref("players/player2/position").update({
    x: 200,
    y: 300
  });
}


function keyPressed() {
  if (keyCode === 32 && gameState === 0) {
    resetPlayerPositions();
    player1.changeAnimation("player1 moving");
    player2.changeAnimation("player2 moving");
    toss = Math.round(random(1, 2));
    if (toss === 1) {
      game.updateGameState(1);
      alert("YELLOW RIDES");
    } 
    else {
      game.updateGameState(2);
      alert("RED RIDES");
    }
  }

  
}
