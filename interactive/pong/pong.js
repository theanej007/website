let canvas = document.getElementById("pong");
canvas.width = 640;
canvas.height = 480;
canvas.focus();

let c = canvas.getContext('2d');
c.fillStyle = "white";
c.font = "30px Bit";

var hit = new Audio("hitHurt.wav");
var score = new Audio("pickupCoin.wav");
var select = new Audio("blipSelect.wav");
var blip = new Audio("blip.wav");

const sleep = ms => new Promise(r => setTimeout(r, ms));

let x1 = 15;
let x2 = 607;
let y1 = 190;
let y2 = 190;
let move1u = false;
let move1d = false;
let move2u = false;
let move2d = false;

let bx = 311;
let by = 231;
let bsx = (Math.random() * 100 > 50) ? 0.6 : -0.6;
let bsy = (Math.random() * 100 > 50) ? 0.6 : -0.6;

let score1 = 0;
let score2 = 0;

function animation() {
    requestAnimationFrame(animation);
    c.clearRect(0, 0, 640, 480);
    c.fillRect(x1, y1, 18, 100);
    c.fillRect(x2, y2, 18, 100);
    c.fillRect(bx, by, 18, 18);

    // PADDLE MOVEMENT
    if (move1u && y1 < 375) {
        y1 += 1.5;
    }
    if (move1d && y1 > 5) {
        y1 -= 1.5;
    }
    if (move2u && y2 < 375) {
        y2 += 1.5;
    }
    if (move2d && y2 > 5) {
        y2 -= 1.5;
    }

    // BALL COLLISIONS
    if (by < 5) {
        bsy = -bsy;
        hit.play();
    }
    if (by > 457) {
        bsy = -bsy;
        hit.play();
    }
    if (bx > x2 - 17 && by > y2 - 18 && by < y2 + 100) {
        bsy = -bsy;
        hit.play();
    }
    if (bx < x1 + 17 && by > y2 - 18 && by < y2 + 100) {
        bsy = -bsy;
        hit.play();
    }
    if (bx > x2 - 18 && bx < x2 - 3 && by > y2 - 17 && by < y2 + 99) {
        bounce(1);
    }
    if (bx < x1 + 18 && bx > x1 + 3 && by > y1 - 17 && by < y1 + 99) {
        bounce(0);
    }

    // POINT SYSTEM
    if (bx < -18) {
        score2++;
        bx = 311;
        by = 231;
        bsx = (Math.random() * 100 > 50) ? 0.6 : -0.6;
        bsy = (Math.random() * 100 > 50) ? 0.6 : -0.6;
        score.play();
    }
    if (bx > 640) {
        score1++;
        bx = 311;
        by = 231;
        bsx = (Math.random() * 100 > 50) ? 0.6 : -0.6;
        bsy = (Math.random() * 100 > 50) ? 0.6 : -0.6;
        score.play();
    }

    bx += bsx;
    by += bsy;

    c.fillRect(0, 0, 640, 5);
    c.fillRect(0, 475, 640, 5);

    c.fillText(score1, 230, 50);
    c.fillText(score2, 387, 50);
}

c.fillText("START", 260, 230);
let start = 0;

function bounce(a) {
    bsx = -bsx;
    if (bsx < 0) {
        bsx -= 0.1;
    } else {
        bsx += 0.1;
    }
    let raz = (((a == 1) ? y1 : y2) + 50) - (by + 9);
    bsy = -raz * 0.03;
    hit.play();
}

// STARTING MENU
window.addEventListener("click", async (event) => {
    if (event.target == canvas) {
        var canvasPos = event.target.getBoundingClientRect();
        var x = event.clientX - canvasPos.left;
        var y = event.clientY - canvasPos.top;
        if (x > 250 && x < 360 && y > 200 && y < 240) {
            start++;
            if (start == 1) {
                select.play();
                await startSeq();
                animation();
            }
        }
    }
})

async function startSeq() {
    c.clearRect(0, 0, 640, 480);
    c.fillText("3", 305, 230);
    await sleep(1000);
    select.play();
    c.clearRect(0, 0, 640, 480);
    c.fillText("2", 305, 230);
    await sleep(1000);
    select.play();
    c.clearRect(0, 0, 640, 480);
    c.fillText("1", 305, 230);
    await sleep(1000);
    blip.play();
}

// INPUT
window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
        move1u = true;
        move2u = true;
    }
    if (event.key === "ArrowUp") {
        move1d = true;
        move2d = true;
    }
});
window.addEventListener("keyup", (event) => {
    if (event.key === "ArrowDown") {
        move1u = false;
        move2u = false;
    }
    if (event.key === "ArrowUp") {
        move1d = false;
        move2d = false;
    }
});