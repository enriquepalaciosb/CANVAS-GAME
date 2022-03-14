// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 1000;
document.body.appendChild(canvas);

let chessBoard = [
  ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
  ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
  ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
  ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
  ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
  ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
  ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
  ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
  ['x', 'x', 'x', 'x', 'x', 'x', 'x']
];

//Calling audio files
const gameOverMusic = new Audio("sounds/M-GameOver.mp3");
const grabItemSound = new Audio("sounds/SE-GrabItem.mp3");

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
  bgReady = true;
};
bgImage.src = "images/TEST-bckg.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
  heroReady = true;
};
heroImage.src = "images/FinalStarman.png";

// Battery image
var batteryReady = false;
var batteryImage = new Image();
batteryImage.onload = function () {
  batteryReady = true;
};
batteryImage.src = "images/battery.png";

// Enemy image
var enemyReady = false;
var enemyImage = new Image();
enemyImage.onload = function () {
  enemyReady = true;
};
enemyImage.src = "images/FinalStarman.png";

// Game objects
var hero = {
  speed: 256,
  x: 0,
  y: 0,
};
var battery = {
  x: 0,
  y: 0,
};
var firstEnemy = {
  x: 0,
  y: 0,
};
var secondEnemy = {
  x: 0,
  y: 0,
};
var thirdEnemy = {
  x: 0,
  y: 0,
};
var batteriesGrabbed = 0;
let hasDied = false;
// Handle keyboard controls
var keysDown = {};

addEventListener(
  "keydown",
  function (e) {
    console.log(e.keyCode + " down");
    keysDown[e.keyCode] = true;
  },
  false
);

addEventListener(
  "keyup",
  function (e) {
    console.log(e.keyCode + " up");
    delete keysDown[e.keyCode];
  },
  false
);

// Reset the game when the player catches a battery
var reset = function () {
  if (hasDied == true) {
    gameOverMusic.play();
  } else {
    placeItem(hero);
    placeItem(battery);
    placeItem(firstEnemy);
    placeItem(secondEnemy);
    placeItem(thirdEnemy);

    if (batteriesGrabbed === 7) {
      alert("Congrats, you collected all the batteries!");
      gameOverMusic.play();
    }
  }
};

let placeItem = function (character) {
  let X = 5;
  let Y = 6;
  let success = false;
  while (!success) {
    X = Math.floor(Math.random() * 9);
    Y = Math.floor(Math.random() * 9);
    if (chessBoard[X][Y] === 'x') {
      success = true;
    }
  }
  chessBoard[X][Y] = 'O';
  character.x = (X * 100) + 32;
  character.y = (Y * 100) + 32;
};

// Update game objects
var update = function (modifier) {
  if (38 in keysDown) {
    //  holding up key
    hero.y -= hero.speed * modifier;
    if (hero.y < (32)) {
      hero.y = 32;
    }
  }
  if (40 in keysDown) {
    //  holding down key
    hero.y += hero.speed * modifier;
    if (hero.y > (1000 - (81))) {
      hero.y = 1000 - 81;
    }
  }
  if (37 in keysDown) {
    // holding left key
    hero.x -= hero.speed * modifier;
    if (hero.x < (21)) {
      hero.x = 21;
    }
  }
  if (39 in keysDown) {
    // holding right key
    hero.x += hero.speed * modifier;
    if (hero.x > (1000 - (32 + 55))) {
      hero.x = 1000 - (32 + 55);
    }
  }
  if (
    hero.x + 5 <= (battery.x + 81) 
    && battery.x <= (hero.x + 55)
    && hero.y <= (battery.y + 83)
    && battery.y <= (hero.y + 52)
  ) {
    grabItemSound.play();
    ++batteriesGrabbed;
    reset();
  }

  if (
    hero.x + 5 <= (firstEnemy.x + 40)
    && firstEnemy.x <= (hero.x + 30)
    && hero.y <= (firstEnemy.y + 40)
    && firstEnemy.y <= (hero.y + 30)
  ) {
    gameOver()
  }
  if (
    hero.x + 5 <= (secondEnemy.x + 40)
    && secondEnemy.x <= (hero.x + 30)
    && hero.y <= (secondEnemy.y + 40)
    && secondEnemy.y <= (hero.y + 30)
  ) {
    gameOver()
  }
  if (
    hero.x + 5 <= (thirdEnemy.x + 40)
    && thirdEnemy.x <= (hero.x + 30)
    && hero.y <= (thirdEnemy.y + 40)
    && thirdEnemy.y <= (hero.y + 30)
  ) {
    gameOver()
  }
};
  
let gameOver = function () {
  alert("Oof. You bumped into a Starman, game over.");
  hasDied = true;
  reset();
}

// Draw everything in the main render function
var render = function () {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }
  if (enemyReady) {
    ctx.drawImage(enemyImage, firstEnemy.x, firstEnemy.y);
    ctx.drawImage(enemyImage, secondEnemy.x, secondEnemy.y);
    ctx.drawImage(enemyImage, thirdEnemy.x, thirdEnemy.y);
  }
  if (heroReady) {
    ctx.drawImage(heroImage, hero.x, hero.y);
  }
  if (batteryReady) {
    ctx.drawImage(batteryImage, battery.x, battery.y);
  }
  // Score
  ctx.fillStyle = "rgb(250, 250, 250)";
  ctx.font = "24px Helvetica";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  if (batteriesGrabbed === 7) {
    ctx.fillText("CONGRATS, YOU WON!", 32, 32);
  } else {
    ctx.fillText("Batteries grabbed: " + batteriesGrabbed, 32, 32);
  }
};

// The main game loop
var main = function () {
  var now = Date.now();
  var delta = now - then;
  update(delta / 1000);
  render();
  then = now;

  if (batteriesGrabbed < 7 && hasDied == false) {
    requestAnimationFrame(main);
  }
};

// Let's play this game!
var then = Date.now();
reset();
main(); // call the main game loop.
