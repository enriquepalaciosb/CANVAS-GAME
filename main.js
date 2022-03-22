// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 850;
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
const themeSong = new Audio("sounds/M-ThemeSong.mp3");
const isDeadMusic = new Audio("sounds/SE-IsDead.mp3");

//Calling enemy sprites
var enemy2 = {};
var enemy3 = {};
var enemy4 = {};

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
  bgReady = true;
};
bgImage.src = "images/backgrounds/earth.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
  heroReady = true;
};
heroImage.src = "images/spriteanimation/spaceman-spiff-left-1.png";

// Battery image
var batteryReady = false;
var batteryImage = new Image();
batteryImage.onload = function () {
  batteryReady = true;
};
batteryImage.src = "images/battery.png";

// Enemy image 1
var enemyReady = false;
var enemyImage = new Image();
enemyImage.onload = function () {
  enemyReady = true;
};
enemyImage.src = "images/sprites/starman01.png";

// Enemy image 2
var enemy2Ready = false;
var enemy2Image = new Image();
enemy2Image.onload = function () {
  enemy2Ready = true;
};
enemy2Image.src = "images/sprites/BelchMonster.png";

// Enemy image 3
var enemy3Ready = false;
var enemy3Image = new Image();
enemy3Image.onload = function () {
  enemy3Ready = true;
};
enemy3Image.src = "images/sprites/evilguy.png";

// Enemy image 4
var enemy4Ready = false;
var enemy4Image = new Image();
enemy4Image.onload = function () {
  enemy4Ready = true;
};
enemy4Image.src = "images/sprites/starman03.png";

// Game objects, enemies, and hero in their positions
var hero = {
  speed: 256,
  x: 0,
  y: 0,
};
var battery = {
  x: 0,
  y: -600,
};
var firstEnemy = {
  speed: 50,
  x: 0,
  y: 0,
};
var secondEnemy = {
  speed: 100,
  x: 0,
  y: 0,
};
var thirdEnemy = {
  speed: 150,
  x: 0,
  y: 0,
};
var fourthEnemy = {
  speed: 200,
  x: 0,
  y: 0,
};
var fifthEnemy = {
  speed: 250,
  x: 0,
  y: 0,
};


var stages = 0;
var shipEnemies = 0;
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
    placeItem(fourthEnemy);
    placeItem(fifthEnemy);

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

// Update game objects and update enemy and hero
var update = function (modifier) {

  //clears trials
  // ctx.clearRect(hero.x, hero.y, width, height);

  if (38 in keysDown) {
    //  holding up key
    hero.y -= hero.speed * modifier;
    if (hero.y < (32)) {
      hero.y = 32;
    }
  }

  if (38 in keysDown) {
    //  holding up key
    enemy2.x -= hero.speed * modifier;
    if (hero.x < (37)) {
      enemy2.x = 1000 - 61;
    }
  }

  if (38 in keysDown) {
    //  holding up key
    firstEnemy.x -= firstEnemy.speed * modifier;
    if (hero.x < (37)) {
      firstEnemy.x = 1000 - 61;
    }
  }

  if (38 in keysDown) {
    //  holding up key
    secondEnemy.x -= secondEnemy.speed * modifier;
    if (hero.x < (37)) {
      secondEnemy.x = 1000 - 61;
    }
  }

  if (38 in keysDown) {
    //  holding up key
    enemy4.x -= hero.speed * modifier;
    if (hero.x < (37)) {
      enemy4.x = 1000 - 61;
    }
  }


  if (40 in keysDown) {
    //  holding down key
    hero.y += hero.speed * modifier;
    if (hero.y > (1000 - (81))) {
      hero.y = 55;
    }
  }

  if (40 in keysDown) {
    //  holding down key
    enemy4.x += hero.speed * modifier;
    if (hero.x > (1000 - (81))) {
      enemy4.x = 55;
    }
  }


  if (40 in keysDown) {
    //  holding down key
    enemy2.x += hero.speed * modifier;
    if (hero.x > (1000 - (81))) {
      enemy2.x = 55;
    }
  }
  
  
  if (40 in keysDown) {
    //  holding down key
    firstEnemy.x += firstEnemy.speed * modifier;
    if (hero.x > (1000 - (81))) {
      firstEnemy.x = 55;
    }
  }

  if (40 in keysDown) {
    //  holding down key
    enemy3.y += hero.speed * modifier;
    if (enemy2 > (1000 - (81))) {
      enemy2.y = 30;
    }
  }

  if (40 in keysDown) {
    //  holding down key
    secondEnemy.x += secondEnemy.speed * modifier;
    if (hero.x > (1000 - (81))) {
      secondEnemy.x = 55;
    }
  }

  if (37 in keysDown) {
    // holding left key
    hero.x -= hero.speed * modifier;
    if (hero.x < (21)) {
      hero.x = 21;
    }
    heroImage.src = "images/spriteanimation/spaceman-spiff-left-1.png";
  }

  if (37 in keysDown) {
    // holding left key
    enemy4.x -= hero.speed * modifier;
    if (hero.x < (21)) {
      enemy4.y = hero.x;
    }
  }

  if (37 in keysDown) {
    //  left
    thirdEnemy.y += thirdEnemy.speed * modifier;
    if (hero.x < (21)) {
      thirdEnemy.y = 55;
    }
  }

  if (37 in keysDown) {
    //  left
    fourthEnemy.y += fourthEnemy.speed * modifier;
    if (hero.x < (21)) {
      fourthEnemy.y = 30;
    }
  }

  if (37 in keysDown) {
    //  left
    fifthEnemy.y += fifthEnemy.speed * modifier;
    if (hero.x < (21)) {
      fifthEnemy.y = 20;
    }
  }

  if (39 in keysDown) {
    // holding right key
    hero.x += hero.speed * modifier;
    if (hero.x > (1000 - (32 + 55))) {
      hero.x = 1000 - (32 + 55);
    }
    heroImage.src = "images/spriteanimation/spaceman-spiff-right-1.png";
  }

    if (39 in keysDown) {
      //  right
      fifthEnemy.x += fifthEnemy.speed * modifier;
      if (hero.x > (1000 - (32 + 55))) {
        fifthEnemy.y = 1000 - (31 + 55);
      }
    }

    if (39 in keysDown) {
      //  rigth
      fourthEnemy.y += fourthEnemy.speed * modifier;
      if (hero.x < (1000 - (32 + 55))) {
        fourthEnemy.y + 15;
      }
    }

    if (39 in keysDown) {
      // holding right key
      enemy4.x += hero.speed * modifier;
      if (hero.x > (1000 - (32 + 55))) {
        enemy4.x = enemy.y;
      }
    }
  


  


  //  If player touches other objects (battery, enemies, etc.):

  if (
    hero.x <= (battery.x + 81) 
    && battery.x <= (hero.x + 51)
    && hero.y <= (battery.y + 81)
    && battery.y <= (hero.y + 52)
  ) {
    grabItemSound.play();
    ++batteriesGrabbed;
    ++stages;

    //  6 different stages:

    if (stages > 0)
    {
      bgImage.src = "images/backgrounds/earth.png";
      
      // BelchMonster postion
      enemy2.x = 18 + (Math.random() * (canvas.width - 184));
      enemy2.y = 18 + (Math.random() * (canvas.height - 184));
    }

    if (stages > 1)
    {
      // bgImage.src = "images/backgrounds/earth.png";
      
      // BelchMonster postion
      enemy2.x = 37 + (Math.random() * (canvas.width - 133));
      enemy2.y = 37 + (Math.random() * (canvas.height - 133));
    }
    
    if (stages > 2)
    {
      bgImage.src = "images/backgrounds/forest1.png";
      enemy4.x = 18 + (Math.random() * (canvas.width - 184));
      enemy4.y = 18 + (Math.random() * (canvas.height - 184));
    }

    if (stages > 3)
    {
      // bgImage.src = "images/backgrounds/earth.png";
    }

    if (stages > 4)
    {
      bgImage.src = "images/backgrounds/forest 2.png";
    // Surprise Alienship position (more enemies)
      enemy3.x = 18 + (Math.random() * (canvas.width - 184));
      enemy3.y = 18 + (Math.random() * (canvas.height - 184));
    }

    if (stages > 5)
    {
      // bgImage.src = "images/backgrounds/earth.png";
    }
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
  if (
    hero.x + 5 <= (fourthEnemy.x + 40)
    && fourthEnemy.x <= (hero.x + 30)
    && hero.y <= (fourthEnemy.y + 40)
    && fourthEnemy.y <= (hero.y + 30)
  ) {
    gameOver()
  }
  if (
    hero.x + 5 <= (fifthEnemy.x + 40)
    && fifthEnemy.x <= (hero.x + 30)
    && hero.y <= (fifthEnemy.y + 40)
    && fifthEnemy.y <= (hero.y + 30)
  ) {
    gameOver()
  }
  //  Other enemies
  if (
		hero.x <= (enemy2.x + 32)
		&& enemy2.x <= (hero.x + 32)
		&& hero.y <= (enemy2.y + 32)
		&& enemy2.y <= (hero.y + 32)
	) {
    gameOver()
	}

  if (
		hero.x <= (enemy3.x + 32)
		&& enemy3.x <= (hero.x + 32)
		&& hero.y <= (enemy3.y + 32)
		&& enemy3.y <= (hero.y + 32)
	) {
    gameOver()
	}

  if (
		hero.x <= (enemy4.x + 32)
		&& enemy4.x <= (hero.x + 32)
		&& hero.y <= (enemy4.y + 32)
		&& enemy4.y <= (hero.y + 32)
	) {
    gameOver()
	}

};
  
let gameOver = function () {
  themeSong.pause();
  isDeadMusic.play();
  alert("Oof. You bumped into an aline invader, game over. Refresh to start over.");
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
    ctx.drawImage(enemyImage, fourthEnemy.x, fourthEnemy.y);
    ctx.drawImage(enemyImage, fifthEnemy.x, fifthEnemy.y);
  }

  if (enemy2Ready) {
		ctx.drawImage(enemy2Image, enemy2.x, enemy2.y);
	}

  if (enemy3Ready) {
		ctx.drawImage(enemy3Image, enemy3.x, enemy3.y);
	}

  if (enemy4Ready) {
		ctx.drawImage(enemy4Image, enemy4.x, enemy4.y);
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
  if (batteriesGrabbed == 8) {
    themeSong.pause();
    ctx.fillText("CONGRATS, YOU WON!", 32, 32);
  } else {
    ctx.fillText("Batteries grabbed: " + batteriesGrabbed, 32, 32);
  }

//Time 
ctx.textAlign = "start"
ctx.textBaseline = "top";
ctx.fillText("Time Left: " + count, 50, 100);
};

//Time Counter Function
var count = 50;
var finished = false;

var counter = function () 
{
  count = count - 1; 
  if (count <= 0) 
  {
	  clearInterval(counter);
    finished = true;
    count = 0;
    hasDied == true;
    gameOver;
    themeSong.pause();
    alert("GAME OVER! YOU RAN OUT OF TIME", 32, 32);
    gameOverMusic.play();
    heroReady = false;
  }
}

setInterval(counter, 1000); 

// Main Game Loop
var main = function () {
  themeSong.play();
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
