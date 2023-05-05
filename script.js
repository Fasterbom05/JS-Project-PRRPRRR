//  ------------ Setup ------------
window.focus;
const SCREENWIDTH = innerWidth;
const SCREENHEIGHT = innerHeight;
let gameCanvas = document.getElementById("gameCanvas");
let c = gameCanvas.getContext("2d"); // Drawing object
gameCanvas.height = SCREENHEIGHT / 2;
gameCanvas.width = SCREENWIDTH / 2;
// -------------------------------------

function wallz() {
  let allaväggar = [];

  for (let i = 0; i < 15; i++) {
    let x_kordinat = Math.floor(Math.random() * gameCanvas.width);
    let y_kordinat = Math.floor(Math.random() * gameCanvas.height);
    let vägg = {
      x: x_kordinat,
      y: y_kordinat,
      bredd: 5,
      höjd: 50,
    };
    allaväggar.push(vägg);
  }
  for (let i = 0; i < 15; i++) {
    let x_kordinat = Math.floor(Math.random() * gameCanvas.width);
    let y_kordinat = Math.floor(Math.random() * gameCanvas.height);
    let vägg = {
      x: x_kordinat,
      y: y_kordinat,
      bredd: 50,
      höjd: 5,
    };
    allaväggar.push(vägg);
  }
  return allaväggar;
}

function restart() {
  cancelAnimationFrame(animate);
  location.reload();
}

// Player variables

let cat = new Image();
let mus = new Image();

cat.onload = function () {};
cat.src = "Bild/gullig_cat.png";

mus.onload = function () {};
mus.src = "Bild/mousetrans.png";

let player1 = {
  x: 100,
  y: 100,
  width: 40,
  height: 40,
  dx: 2,
  dy: 2,
  directions: {
    left: false,
    right: false,
    up: false,
    down: false,
  },
};

let player2 = {
  x: 200,
  y: 200,
  width: 40,
  height: 40,
  dx: 2,
  dy: 2,
  directions: {
    left: false,
    right: false,
    up: false,
    down: false,
  },
};

// -------------------------------------
// ------------ Player movement ------------
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      player1.directions.left = true;
      break;
    case "ArrowRight":
      player1.directions.right = true;
      break;
    case "ArrowUp":
      player1.directions.up = true;
      break;
    case "ArrowDown":
      player1.directions.down = true;
      break;
    case "a":
      player2.directions.left = true;
      break;
    case "d":
      player2.directions.right = true;
      break;
    case "w":
      player2.directions.up = true;
      break;
    case "s":
      player2.directions.down = true;
      break;

    default:
      break;
  }
});

document.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      player1.directions.left = false;
      break;
    case "ArrowRight":
      player1.directions.right = false;
      break;
    case "ArrowUp":
      player1.directions.up = false;
      break;
    case "ArrowDown":
      player1.directions.down = false;
      break;
    case "a":
      player2.directions.left = false;
      break;
    case "d":
      player2.directions.right = false;
      break;
    case "w":
      player2.directions.up = false;
      break;
    case "s":
      player2.directions.down = false;
      break;

    default:
      break;
  }
});

let väggar = wallz();
console.log(väggar);

// ------------ Animation ------------
// -------------------------------------
// let cat = document.getElementById("cat")
// let mus = document.getElementById("mus")
function animate() {
  requestAnimationFrame(animate); // Run gameloop recursively
  c.clearRect(0, 0, innerWidth, innerHeight); // Clear screen

  // wall = c.fillRect(275, 100, 10, 75);
  // wall = c.fillRect(50, 50, 10, 50);
  // wall = c.fillRect(350, 200, 10, 50);
  // wall = c.fillRect(100, 175, 10, 50);
  // wall = c.fillRect(200, 235, 10, 100);

  // c.fillRect(playerX, playerY, playerWidth, playerHeight); // Draw player

  väggar.forEach((vägg) => {
    c.fillRect(vägg.x, vägg.y, vägg.bredd, vägg.höjd);
  });

  c.drawImage(cat, player1.x, player1.y, player1.width, player1.height);
  c.drawImage(mus, player2.x, player2.y, player2.width, player2.height);

  if (player1.directions.right && player1.x < SCREENWIDTH / 2 - player1.width) {
    player1.x += player1.dx;
  }
  if (player1.directions.left && player1.x > 0) {
    player1.x -= player1.dx;
  }
  if (player1.directions.up && player1.y > 0) {
    player1.y -= player1.dy;
  }
  if (
    player1.directions.down &&
    player1.y < SCREENHEIGHT / 2 - player1.height
  ) {
    player1.y += player1.dy;
  }

  if (player2.directions.right && player2.x < SCREENWIDTH / 2 - player2.width) {
    player2.x += player2.dx;
  }
  if (player2.directions.left && player2.x > 0) {
    player2.x -= player2.dx;
  }
  if (player2.directions.up && player2.y > 0) {
    player2.y -= player2.dy;
  }
  if (
    player2.directions.down &&
    player2.y < SCREENHEIGHT / 2 - player2.height
  ) {
    player2.y += player2.dy;
  }

  if (player1.x && player1.y > 275 && 100) {
    player1.dy = 0;
    player1.dx = 0;
  }

  if (
    player1.x < player2.x + 30 &&
    player1.x + 30 > player2.x &&
    player1.y < player2.y + 30 &&
    player1.y + 30 > player2.y
  ) {
    console.log("COLLISION");
    alert("GAME OVER");
    player1.x = 100;
    player1.y = 100;
    player2.x = 200;
    player2.y = 200;
    restart();
    // GameOver()
  }
  //   function GameOver(){
  //     c.canvas.removeEventListener('mousemove', function(event){
  //         canvasMouseOver(event);
  //     });
  //     ResetGlobalVariables();
  // }
}

// -------------------------------------
// ------------ Start game ------------

animate();
