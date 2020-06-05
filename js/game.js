const KEY_RIGHT = 39;
const KEY_LEFT = 37;
const KEY_SPACE = 32;
const KEY_PAUSE = 80;

const GAME_WIDTH = 800;
const GAME_HEIGHT = 800;

const PAUSE = new sound("./assets/pause.mp3");
const LASER_SOUND = new sound("./assets/laser.mp3");
const EXPLOSION_SOUND = new sound("./assets/explosion.mp3");
const PLAYER_HIT = new sound("./assets/player_hit.mp3");
const ENEMY_HIT = new sound("./assets/enemy_hit.mp3");
const WIN = new sound("./assets/win.mp3");
const GAMEOVER = new sound("./assets/gameover.mp3");
const HEART_IMG = "./assets/heart.png";

var lasers = [];
var enemies = [];
var pause = false;

const ENEMY_NUMBER = 8;

function init(){
    fullscreen();
    startGame();
}

function startGame(){
    this.lastUpdate = Date.now();
    this.context = document.getElementById("gameArea").getContext("2d");
    this.player = new Player(GAME_WIDTH/2, GAME_HEIGHT - 80, 40, "blue", context);
    this.player.draw();
    createEnemy();
    drawHeart();
    window.requestAnimationFrame(updateGame);
}

function newGame(){
    clearContext();
    this.enemies = [];
    this.lasers = [];
    startGame();
}

function fullscreen(){
    var window = document.documentElement;
    if(window.requestFullscreen){
        window.requestFullscreen();
    }
    else if (elem.mozRequestFullScreen){
        windows.mozRequestFullScreen();
    }
    else if (elem.webkitRequestFullscreen){
        windows.webkitRequestFullscreen();
    }
    else if (elem.msRequestFullscreen){
        windows.msRequestFullscreen();
    }
}

function clearContext(){
    this.context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
}

function createEnemy(){
    for(i = 0; i < ENEMY_NUMBER; i++){
        enemies.push(new Enemy((GAME_WIDTH/2) - (40*(ENEMY_NUMBER-1)) + (i*80), 50, 40, "red", context));
    }
}

function drawElements(){
    this.player.draw();
    for(i = 0; i < this.lasers.length; i++){
        if(this.lasers[i].despawn){
            this.lasers.splice(i, 1);
        }
        else{
            this.lasers[i].draw();
        }
    }
    for(i = 0; i < this.enemies.length; i++){
        if(this.enemies[i].despawn){
            this.enemies.splice(i, 1);
        }
        else{
            this.enemies[i].draw();
        }
    }
}

function drawHeart(){
    var list = document.getElementById("health");
    list.innerHTML = "";
    for(var i = 0; i < this.player.health; i++){
        var clonedItem = document.getElementById("sample").cloneNode(true);
        clonedItem.src = HEART_IMG;
        list.appendChild(clonedItem);
    }
}

function playerCanMoveRight(){
    if(this.player.x >= 800-this.player.l){
        return false;
    }
    return true;
}

function playerCanMoveLeft(){
    if(this.player.x <= 0){
        return false;
    }
    return true;
}

function updateScore(points, reset = false){
    var score = document.getElementById("score");
    score.innerHTML = parseInt(score.innerHTML) + points;
    if(reset){
        var hiScore = document.getElementById("hiscore");
        if(parseInt(score.innerHTML) > parseInt(hiScore.innerHTML)){
            hiScore.innerHTML = score.innerHTML;
        }
        score.innerHTML = 0;
    }
}

function updatePlayer(dt){

    if(this.player.right && playerCanMoveRight()){
        this.player.x += dt * this.player.getSpeed();
    }
    if(this.player.left && playerCanMoveLeft()){
        this.player.x -= dt * this.player.getSpeed();
    }

    if(this.player.space && this.player.cooldown <= 0){
        LASER_SOUND.play();
        this.lasers.push(new Laser(this.player, this.context));
        this.player.resetCooldown();
    }

    if(this.player.cooldown > 0){
        this.player.cooldown -= dt;
    }

    if(this.player.health <= 0){
        GAMEOVER.play();
        updateScore(0, true);
        newGame();
    }
}

function updateLasers(dt){
    for(i = this.lasers.length-1; i >= 0; i--){
        this.lasers[i].y -= dt * this.lasers[i].getSpeed();
        if(this.lasers[i].y <= 0 || this.lasers[i].y >= 800){
            this.lasers[i].despawn = true;
        }
        for(j = this.enemies.length-1; j >= 0; j--){
            if(this.lasers[i].type === "player" && this.lasers[i].hit(this.enemies[j]) && !this.lasers[i].despawn){
                ENEMY_HIT.play();
                this.enemies[j].health -= this.lasers[i].getDamage();
                this.lasers[i].despawn = true;
            }
            if(this.lasers[i].type === "enemy" && this.lasers[i].hit(this.player) && !this.lasers[i].despawn){
                PLAYER_HIT.play();
                this.player.health -= this.lasers[i].getDamage();
                this.lasers[i].despawn = true;
                drawHeart();
            }
        }
    }
}

function updateEnemies(dt){
    if(this.enemies.length === 0){
        WIN.play();
        newGame();
    }
    for(i = this.enemies.length-1; i >= 0; i--){
        
        if(this.enemies[i].y - (this.enemies[i].l/2 - 1) >= 800){
            this.enemies[i].despawn = true;
        }

        if(this.enemies[i].health <= 0){
            if(this.enemies.length !== 1){
                EXPLOSION_SOUND.play();
            }
            updateScore(100);
            this.enemies[i].despawn = true;
        }
        else{

            if(this.enemies[i].cooldown <= 0){
                this.lasers.push(new Laser(this.enemies[i], this.context));
                this.enemies[i].resetCooldown();
            }
            else{
                this.enemies[i].cooldown -= dt;
            }

            this.enemies[i].x += dt * this.enemies[i].getSpeed();
            this.enemies[i].speed += dt*1.5;
            if(this.enemies[i].x >= GAME_WIDTH-this.enemies[i].l){
                this.enemies[i].y += 60;
                this.enemies[i].x = GAME_WIDTH-this.enemies[i].l-1;
                this.enemies[i].right = false;
            }
            else if(this.enemies[i].x <= 0){
                this.enemies[i].y += 60;
                this.enemies[i].x = 1;
                this.enemies[i].right = true;
            }
        }
    }
}

function updateGame(){
    const currentTime = Date.now();
    document.getElementById("pause").innerHTML = "Pausa";
    if(!this.pause){
        document.getElementById("pause").innerHTML = "";
        const dt = (currentTime - this.lastUpdate) / 1000;

        updatePlayer(dt);

        updateLasers(dt);

        updateEnemies(dt);

        clearContext();
        drawElements();
    }
    this.lastUpdate = currentTime;
    window.requestAnimationFrame(updateGame);
}

function onKeyDown(e){
    if(e.keyCode === KEY_PAUSE){
        PAUSE.play();
        this.pause = !this.pause;
    }
    if(e.keyCode === KEY_RIGHT){
        this.player.right = true;
    }
    else if(e.keyCode === KEY_LEFT){
        this.player.left = true;
    }
    if(e.keyCode === KEY_SPACE){
        this.player.space = true;
    }
}

function onKeyRelease(e){
    if(e.keyCode === KEY_RIGHT){
        this.player.right = false;
    }
    else if(e.keyCode === KEY_LEFT){
        this.player.left = false;
    }
    if(e.keyCode === KEY_SPACE){
        this.player.space = false;
    }
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }   
}

window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyRelease);
