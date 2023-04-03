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

let cat = new Image();
let mus = new Image();

cat.onload=function(){
}
cat.src="Bild/gullig_cat.png"

mus.onload=function(){
}
mus.src="Bild/mus.png"


let playerX = 200;
let playerY = 200;
let playerWidth = 10;
let playerHeight = 10;
let dx = 2;
let dy = 2;

let ax = 2;
let ay = 2;


let directions = {
  left: false,
  right: false,
  up: false,
  down: false,
};

let directions1 = {
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
    case "a":
      directions1.left = true;
      break;
    case "d":
      directions1.right = true;
      break;
    case "w":
      directions1.up = true; 
      break;   
    case "s":
      directions1.down = true;
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
    case "a":
      directions1.left = false;
      break;
    case "d":
      directions1.right = false;
      break;
    case "w":
      directions1.up = false;  
      break;
    case "s":
      directions1.down = false;
      break;  
    
      default:
      break;
  }
 
}); 
// ------------ Animation ------------
// -------------------------------------
// let cat = document.getElementById("cat")
// let mus = document.getElementById("mus")
function animate() {
  requestAnimationFrame(animate); // Run gameloop recursively
  c.clearRect(0, 0, innerWidth, innerHeight); // Clear screen
  console.log(directions1)

  // c.fillRect(playerX, playerY, playerWidth, playerHeight); // Draw player

  c.drawImage(cat, playerX, playerY, 40, 40)
  c.drawImage(mus, playerX, playerY, 40, 40)
 

  if (directions.right && playerX < SCREENWIDTH / 2 - playerWidth) {
    playerX += dx; 
  }
  else if (directions.left && playerX > 0) {
    playerX -= dx;
  }
  else if (directions.up && playerY > 0) {
    playerY -= dy; 
  }
  else if (directions.down && playerY < SCREENHEIGHT / 2 - playerHeight) {
    playerY += dy;
  }
  else if (directions.right && playerX < SCREENWIDTH / 2 - playerWidth) {
    playerX += ax; 
  }
  else if (directions.left && playerX > 0) {
    playerX -= ax;
  }
  else if (directions.up && playerY > 0) {
    playerY -= ay; 
  }
  else if (directions.down && playerY < SCREENHEIGHT / 2 - playerHeight) {
    playerY += ay;
  }

}
// -------------------------------------
// ------------ Start game ------------

animate();
