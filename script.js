//  ------------ Setup ------------
window.focus;
const SCREENWIDTH = innerWidth;
const SCREENHEIGHT = innerHeight;
let gameCanvas = document.getElementById("gameCanvas");
let c = gameCanvas.getContext("2d"); // Drawing object
gameCanvas.height = SCREENHEIGHT / 2;
gameCanvas.width = SCREENWIDTH / 2;
// -------------------------------------

let krockar = false;
let gameover = document.getElementById("gameover");
let tryagain = document.getElementById("försökigen");

document.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    tryagain.click();
  }
});

function stanna() {
  player1.dx = 0;
  player1.dy = 0;
  player2.dx = 0;
  player2.dy = 0;
}

function wallz() {
  let allaväggar = [];

  for (let i = 0; i < 2; i++) {
    let x_kordinat = Math.floor(Math.random() * gameCanvas.width);
    let y_kordinat = Math.floor(Math.random() * gameCanvas.height);
    let vägg = {
      x: x_kordinat,
      y: y_kordinat,
      bredd: 5,
      höjd: 50,
    };
    allaväggar.push(vägg);
    console.log(allaväggar);
  }
  for (let i = 0; i < 2; i++) {
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

function playerStart() {
  let randomX = Math.floor(Math.random() * 570)
  let randomY = Math.floor(Math.random() * 250)

  return [randomX, randomY]
}

// Player variables

let cat = new Image();
let mus = new Image();

cat.onload = function () {};
cat.src = "Bild/gullig_cat.png";

mus.onload = function () {};
mus.src = "Bild/mousetrans.png";

let player1_koordinater = playerStart();
let player1_koordinaterX = player1_koordinater[0];
let player1_koordinaterY = player1_koordinater[1];

let player2_koordinater = playerStart();
let player2_koordinaterX = player2_koordinater[0];
let player2_koordinaterY = player2_koordinater[1];

let player1 = {
  x: player1_koordinaterX,
  y: player1_koordinaterY,
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
  x: player2_koordinaterX,
  y: player2_koordinaterY,
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
  console.log(player1.x, player1.y)
  // c.fillRect(playerX, playerY, playerWidth, playerHeight); // Draw player

  väggar.forEach((vägg) => {
    c.fillRect(vägg.x, vägg.y, vägg.bredd, vägg.höjd);
  });

  c.drawImage(cat, player1.x, player1.y, player1.width, player1.height);
  c.drawImage(mus, player2.x, player2.y, player2.width, player2.height);

  if (player1.directions.right && player1.x < SCREENWIDTH/2 - player1.width) {
    krockar = false;
    väggar.forEach((vägg) => {
      if (
        // kOLLA DETTA INNAN VI KÄGGER PÅ HASTIGHET NÄR VI TRYCKER HÖGER
        player1.x + player1.width >= vägg.x && // FÖRSÖKER VI GÅ IGENOM VÄGG FRÅN HÖGER
        player1.x < vägg.x &&
        player1.y + player1.height >= vägg.y && // ÄR VI MELLAN REKTANGELNS KOORDINATER
        player1.y <= vägg.y + vägg.höjd
      ) {
        krockar = true;
        console.log("något är i vägen när vi går till höger");
      }
    });
    if (!krockar) {
      player1.x += player1.dx;
    }
  }
  if (player1.directions.left && player1.x > 0) {
    krockar = false;
    väggar.forEach((vägg) => {
      if (
        // kOLLA DETTA INNAN VI KÄGGER PÅ HASTIGHET NÄR VI TRYCKER HÖGER
        player1.x <= vägg.x + vägg.bredd && // FÖRSÖKER VI GÅ IGENOM VÄGG FRÅN VÄNSTER
        player1.x + player1.width > vägg.x &&
        player1.y + player1.height >= vägg.y && // ÄR VI MELLAN REKTANGELNS KOORDINATER
        player1.y <= vägg.y + vägg.höjd
      ) {
        krockar = true;
        console.log("något är i vägen när vi går till vänster");
      }
    });
    if (!krockar) {
      player1.x -= player1.dx;
    }
  }
  if (player1.directions.up && player1.y - 25 > 0) {
    krockar = false;
    // väggar.forEach((vägg) => {
    //   if (
    //     player1.x <= vägg.x + vägg.bredd && // FÖRSÖKER VI GÅ IGENOM VÄGG FRÅN VÄNSTER
    //     player1.x + player1.width > vägg.x &&
    //     player1.y >= vägg.y + vägg.höjd && // ÄR VI MELLAN REKTANGELNS KOORDINATER
    //     player1.y + player1.höjd <= vägg.y
    //   ) {
    //     krockar = true;
    //     console.log("något är i vägen när vi går up");
    //   }
    // });
    if (!krockar) {
      player1.y -= player1.dy;
    }
  }
  if (
    player1.directions.down &&
    player1.y < SCREENHEIGHT / 2 - 70
  ) {
    krockar = false;
    väggar.forEach((vägg) => {
      if (
        player1.x <= vägg.x + vägg.bredd && // FÖRSÖKER VI GÅ IGENOM VÄGG FRÅN VÄNSTER
        player1.x + player1.width > vägg.x &&
        player1.y + player1.height >= vägg.y && // ÄR VI MELLAN REKTANGELNS KOORDINATER
        player1.y <= vägg.y + vägg.bredd
      ) {
        krockar = true;
        console.log("något är i vägen när vi går ned");
      }
    });
    if (!krockar) {
      player1.y += player1.dy;
    }
  }

  if (player2.directions.right && player2.x < SCREENWIDTH / 2 - player2.width) {
    krockar = false;
    väggar.forEach((vägg) => {
      if (
         // kOLLA DETTA INNAN VI KÄGGER PÅ HASTIGHET NÄR VI TRYCKER HÖGER
         player2.x + player2.width >= vägg.x && // FÖRSÖKER VI GÅ IGENOM VÄGG FRÅN HÖGER
         player2.x < vägg.x &&
         player2.y + player2.height >= vägg.y && // ÄR VI MELLAN REKTANGELNS KOORDINATER
         player2.y <= vägg.y + vägg.höjd
      ) {
        krockar = true;
        console.log("något är i vägen när vi går till höger");
      }
    });
    if (!krockar) {
      player2.x += player2.dx;
    }
  }
  if (player2.directions.left && player2.x > 0) {
    krockar = false;
    väggar.forEach((vägg) => {
      if (
        // kOLLA DETTA INNAN VI KÄGGER PÅ HASTIGHET NÄR VI TRYCKER HÖGER
        player2.x <= vägg.x + vägg.bredd && // FÖRSÖKER VI GÅ IGENOM VÄGG FRÅN VÄNSTER
        player2.x + player2.width > vägg.x &&
        player2.y + player2.height >= vägg.y && // ÄR VI MELLAN REKTANGELNS KOORDINATER
        player2.y <= vägg.y + vägg.höjd
      ) {
        krockar = true;
        console.log("något är i vägen när vi går till vänster");
      }
    });
    if (!krockar) {
      player2.x -= player2.dx;
    }
  }
  if (player2.directions.up && player2.y - 25 > 0) {
    krockar = false;
    // väggar.forEach((vägg) => {
    //   if (
    //     // // kOLLA DETTA INNAN VI KÄGGER PÅ HASTIGHET NÄR VI TRYCKER HÖGER
    //     // player2.x + player2.width <= vägg.x && // FÖRSÖKER VI GÅ IGENOM VÄGG FRÅN VÄNSTER
    //     // player2.y + player2.height <= vägg.y && // ÄR VI MELLAN REKTANGELNS KOORDINATER
    //     // player2.y >= vägg.y + vägg.höjd
    //   ) {
    //     krockar = true;
    //     console.log("något är i vägen när vi går till up");
    //   }
    // });
    if (!krockar) {
      player2.y -= player2.dy;
    }
  }

  if (
    player2.directions.down &&
    player2.y < SCREENHEIGHT / 2 - 70
  ) {
    krockar = false;
    väggar.forEach((vägg) => {
      if (
        player2.x <= vägg.x + vägg.bredd && // FÖRSÖKER VI GÅ IGENOM VÄGG FRÅN VÄNSTER
        player2.x + player2.width > vägg.x &&
        player2.y + player2.height >= vägg.y && // ÄR VI MELLAN REKTANGELNS KOORDINATER
        player2.y <= vägg.y + vägg.bredd
      ) {
        krockar = true;
        console.log("något är i vägen när vi går till ned");
      }
    });
    if (!krockar) {
      player2.y += player2.dy;
    }
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
    gameover.style.display = "block";
    tryagain.style.display = "flex";
    player1.x = 430;
    player1.y = 200;
    player2.x = 300;
    player2.y = 200;
    stanna();
  }
}

// -------------------------------------
// ------------ Start game ------------

animate();
