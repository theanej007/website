let canvas = document.getElementById("pong");
canvas.width = 640;
canvas.height = 480;
canvas.focus();

let c = canvas.getContext('2d');
c.fillStyle = "white";
c.font = "30px Bit";
const fps = 60;

var hit = new Audio("hitHurt.wav");
var score = new Audio("pickupCoin.wav");
var select = new Audio("blipSelect.wav");
var blip = new Audio("blip.wav");

const sleep = ms => new Promise(r => setTimeout(r, ms));
let mode = 0;

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
let bsx;
let bsy;

let score1 = 0;
let score2 = 0;
let score3 = 0;

let anim;
let quit;

async function animation() {
    if(quit == true){
        quit = false;
        cancelAnimationFrame(anim);
        startMenu();
        return;
    }
    setTimeout(() => {
        anim = requestAnimationFrame(animation);
    }, 1000 / fps);
    if (score1 === 11) {
        cancelAnimationFrame(anim);
        c.fillText("YOU WIN", 240, 230);
        await sleep(2000);
        startMenu();
        return;
    } else if (score2 === 11) {
        cancelAnimationFrame(anim);
        c.fillText("YOU LOSE", 222, 230);
        await sleep(2000);
        startMenu();
        return;
    }
    c.clearRect(0, 0, 640, 480);
    c.fillRect(x1, y1, 18, 100);
    c.fillRect(x2, y2, 18, 100);
    c.fillRect(bx, by, 18, 18);

    // PADDLE MOVEMENT
    if (move1u && y1 < 375) {
        y1 += 4;
    }
    if (move1d && y1 > 5) {
        y1 -= 4;
    }
    if (mode === 1 && by + 9 > y2) {
        move2u = true;
    } else if (mode === 1) {
        move2u = false;
    }
    if (move2u && y2 < 375) {
        y2 += 4;
    }
    if (mode === 1 && by + 9 < y2 + 100) {
        move2d = true;
    } else if (mode === 1) {
        move2d = false;
    }
    if (move2d && y2 > 5) {
        y2 -= 4;
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
    if (bx > x2 - 17 && bx > x2 - 14 && by > y2 - 18 && by < y2 + 100) {
        bsy = -bsy;
        hit.play();
    }
    if (bx < x1 + 17 && bx > x1 + 14 && by > y1 - 18 && by < y1 + 100) {
        bsy = -bsy;
        hit.play();
    }
    if (bx > x2 - 18 && bx < x2 - 3 && by > y2 - 17 && by < y2 + 99) {
        score3++;
        bounce(0);
    }
    if (bx < x1 + 18 && bx > x1 + 3 && by > y1 - 17 && by < y1 + 99) {
        score3++;
        bounce(1);
    }

    // POINT SYSTEM
    if (bx < -18) {
        score3 = 0;
        score2++;
        bx = 311;
        by = 231;
        bsx = (Math.random() * 100 > 50) ? 2.6 : -2.6;
        bsy = (Math.random() * 100 > 50) ? 2.6 : -2.6;
        score.play();
    }
    if (bx > 640) {
        score3 = 0;
        score1++;
        bx = 311;
        by = 231;
        bsx = (Math.random() * 100 > 50) ? 2.6 : -2.6;
        bsy = (Math.random() * 100 > 50) ? 2.6 : -2.6;
        score.play();
    }

    bx += bsx;
    by += bsy;

    c.fillRect(0, 0, 640, 5);
    c.fillRect(0, 475, 640, 5);

    if (mode === 0) {
        c.fillText(score3, 305, 50);
    } else {
        c.fillText(score1, 230, 50);
        c.fillText(score2, 387, 50);
    }
}

function bounce(a) {
    bsx = -bsx;
    if (bsx < 0) {
        bsx -= 0.15;
    } else {
        bsx += 0.15;
    }
    let raz = (((a == 1) ? y1 : y2) + 50) - (by + 9);
    bsy = -raz * 0.08;
    hit.play();
}

// STARTING MENU
let start = 0;
function startMenu() {
    c.clearRect(0, 0, 640, 480);
    c.fillText("START", 260, 230);
    start = 0;
    score1 = 0;
    score2 = 0;
    score3 = 0;
    bx = 311;
    by = 231;
    bsx = (Math.random() * 100 > 50) ? 2.2 : -2.2;
    bsy = (Math.random() * 100 > 50) ? 2.2 : -2.2;
    x1 = 15;
    x2 = 607;
    y1 = 190;
    y2 = 190;
}
startMenu();
window.addEventListener("click", async (event) => {
    if (event.target == canvas) {
        var canvasPos = event.target.getBoundingClientRect();
        var x = event.clientX - canvasPos.left;
        var y = event.clientY - canvasPos.top;
        if (start === 0 && x > 250 && x < 360 && y > 200 && y < 240) {
            start++;
            if (start == 1) {
                select.play();
                c.clearRect(0, 0, 640, 480);
                c.fillText("Singleplayer", 195, 180);
                c.fillText("Against bot", 200, 230);
            }
        } else if (start === 1 && x > 186 && x < 432 && y > 147 && y < 195) {
            start++;
            mode = 0;
            select.play();
            await startSeq();
            animation();
        } else if (start === 1 && x > 191 && x < 425 && y > 199 && y < 235) {
            start++;
            mode = 1;
            select.play();
            await startSeq();
            animation();
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
        if (mode === 0) {
            move2u = true;
        }
    }
    if (event.key === "ArrowUp") {
        move1d = true;
        if (mode === 0) {
            move2d = true;
        }
    }
    if (event.key === "Escape") {
        quit = true;
    }
});
window.addEventListener("keyup", (event) => {
    if (event.key === "ArrowDown") {
        move1u = false;
        if (mode === 0) {
            move2u = false;
        }
    }
    if (event.key === "ArrowUp") {
        move1d = false;
        if (mode === 0) {
            move2d = false;
        }
    }
});