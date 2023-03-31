//  ------------ Setup ------------
window.focus;
const SCREENWIDTH = innerWidth;
const SCREENHEIGHT = innerHeight;
let gameCanvas = document.getElementById("gameCanvas");
let c = gameCanvas.getContext("2d"); // Drawing object
gameCanvas.height = SCREENHEIGHT / 2;
gameCanvas.width = SCREENWIDTH / 2;
// -------------------------------------
// Player variables
let playerX = 200;
let playerY = 200;
let playerWidth = 10;
let playerHeight = 10;
let dx = 2;
let dy = 2;

let directions = {
  left: false,
  right: false,
  up: false,
  down: false,
};
// -------------------------------------
// ------------ Player movement ------------
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      directions.left = true;
      break;
    case "ArrowRight":
      directions.right = true;
      break;
    case "ArrowUp":
      directions.up = true;
      break;
    case "ArrowDown":
      directions.down = true;
      break;
    default:
      break;
  }
});

document.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      directions.left = false;
      break;
    case "ArrowRight":
      directions.right = false;
      break;
    case "ArrowUp":
      directions.up = false;
      break;
    case "ArrowDown":
      directions.down = false;
      break;
    default:
      break;
  }
});
let cat = document.getElementById("cat")
let mus = document.getElementById("mus")
// -------------------------------------
// ------------ Animation ------------
function animate() {
  requestAnimationFrame(animate); // Run gameloop recursively
  c.clearRect(0, 0, innerWidth, innerHeight); // Clear screen
    console.log("hej")
  c.fillRect(playerX, playerY, playerWidth, playerHeight); // Draw player

 c.drawImage(cat, dx, dy, 40, 40)
 

  if (directions.right && playerX < SCREENWIDTH / 2 - playerWidth) {
    playerX += dx;
  }

  if (directions.left && playerX > 0) {
    playerX -= dx;
  }

  if (directions.up && playerY > 0) {
    playerY -= dy;
  }

  if (directions.down && playerY < SCREENHEIGHT / 2 - playerHeight) {
    playerY += dy;
  }
}
// -------------------------------------
// ------------ Start game ------------
animate();
