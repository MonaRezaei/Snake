const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const score = document.querySelector('span');
const end = document.querySelector('.modal');
const highest_score = document.querySelector('h3 span');

document.addEventListener('keyup', changeDirection);

let dx = 10;
let dy = 0;
let seedX;
let seedY;
let scr = 0;
let speed = 200;
let highestScore = localStorage.getItem('highest__score');
let directionPermission = true;

function changeDirection(e) {
    let pressKey = e.key;
    if (directionPermission) {
        if (pressKey == 'ArrowUp' && dy != 10) {
            dx = 0;
            dy = -10;
            directionPermission = false;
        } else if (pressKey == 'ArrowDown' && dy != -10) {
            dx = 0;
            dy = 10;
            directionPermission = false;
        } else if (pressKey == 'ArrowRight' && dx != -10) {
            dx = 10;
            dy = 0;
            directionPermission = false;
        } else if (pressKey == 'ArrowLeft' && dx != 10) {
            dx = -10;
            dy = 0;
            directionPermission = false;
        }
    }

}

const snake = [
    { x: 100, y: 100 },
    { x: 90, y: 100 },
    { x: 80, y: 100 },
    { x: 70, y: 100 },
    { x: 60, y: 100 },

]

let gameBord = () => {
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.fillRect(0, 0, 300, 300);
    ctx.strokeRect(0, 0, 300, 300);
}

let snakeDraw = () => {
    snake.map(item => {
        ctx.fillStyle = '#FC4F00'
        ctx.strokeStyle = 'black'
        ctx.fillRect(item.x, item.y, 10, 10);
        ctx.strokeRect(item.x, item.y, 10, 10);
    })

}

let generateRandomNumber = () => Math.floor(Math.random() * 30) * 10

let generateSeed = () => {
    seedX = generateRandomNumber();
    seedY = generateRandomNumber();
    for (let i = 0; i < snake.length; i++) {
        if (snake[i].x == seedX && snake[i].y == seedY) {
            seedX = generateRandomNumber();
            seedY = generateRandomNumber();
            i = 0;
        }
    }
}

let DrawSeed = () => {
    ctx.fillStyle = 'crimson'
    ctx.strokeStyle = 'black'
    ctx.fillRect(seedX, seedY, 10, 10);
    ctx.strokeRect(seedX, seedY, 10, 10);
}

let move = () => {
    if (snake[0].x + dx > 290) {
        snake.unshift({ x: 0, y: snake[0].y + dy })
    } else if (snake[0].x + dx < 0) {
        snake.unshift({ x: 290, y: snake[0].y + dy })
    } else if (snake[0].y + dy > 290) {
        snake.unshift({ x: snake[0].x + dx, y: 0 })
    } else if (snake[0].y + dy < 0) {
        snake.unshift({ x: snake[0].x + dx, y: 290 })
    } else {
        snake.unshift({ x: snake[0].x + dx, y: snake[0].y + dy })
    }
    if (snake[0].x === seedX && snake[0].y === seedY) {
        generateSeed();
        snakeSpeed();
        console.log(speed);
    } else {
        snake.pop();
    }
}

let snakeSpeed = () => {
    scr++;
    if (speed >= 100) {
        speed -= 50;
    }
    score.innerHTML = scr;
}


let gameOver = () => {
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            end.style.transform = `scale(1)`;
            if (highestScore < scr) {
                highestScore = scr;
                localStorage.setItem('highest__score', highestScore);
            }
            return true;
        }
    }
    return false;
}


run();

function run() {

    highest_score.innerHTML = highestScore;
    generateSeed();
    DrawSeed();
    gameBord();
    snakeDraw();
    setInterval(() => {
        directionPermission = true;
        if (gameOver()) return null;
        move();
        gameBord();
        DrawSeed();
        snakeDraw();
        console.log(speed);
    }, speed)

}




