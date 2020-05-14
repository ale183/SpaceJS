const KEY_RIGHT = 39;
const KEY_LEFT = 37;
const KEY_SPACE = 32;

const GAME_WIDTH = 800;
const GAME_HEIGHT = 800;

var lasers = [];
var enemies = [];

const ENEMY_NUMBER = 8;

function init(){
    this.lastUpdate = Date.now();
    this.context = document.getElementById("gameArea").getContext("2d");
    this.player = new Player(GAME_WIDTH/2, GAME_HEIGHT - 80, 40, "blue", context);
    this.player.draw();
    createEnemy();
    window.requestAnimationFrame(updateGame);
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

function updatePlayer(dt){
    if(this.player.right){
        this.player.x += dt * this.player.getSpeed();
    }
    else if(this.player.left){
        this.player.x -= dt * this.player.getSpeed();
    }

    if(this.player.space && this.player.cooldown <= 0){
        this.lasers.push(new Laser(this.player, this.context));
        this.player.resetCooldown();
    }

    if(this.player.cooldown > 0){
        this.player.cooldown -= dt;
    }
}

function updateLasers(dt){
    for(i = this.lasers.length-1; i >= 0; i--){
        this.lasers[i].y -= dt * this.lasers[i].getSpeed();
        if(this.lasers[i].y < 0){
            this.lasers[i].despawn = true;
        }
        for(j = this.enemies.length-1; j >= 0; j--){
            if(this.lasers[i].hit(this.enemies[j])){
                this.enemies[j].health -= this.lasers[i].getDamage();
                this.lasers[i].despawn = true;
            }
        }
    }
}

function updateEnemies(dt){
    for(i = this.enemies.length-1; i >= 0; i--){
        if(this.enemies[i].health <= 0){
            this.enemies[i].despawn = true;
        }
        else{
            this.enemies[i].x += dt * this.enemies[i].getSpeed();
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
    const dt = (currentTime - this.lastUpdate) / 1000;

    updatePlayer(dt);

    updateLasers(dt);

    updateEnemies(dt);

    this.lastUpdate = currentTime;

    clearContext();
    drawElements();
    window.requestAnimationFrame(updateGame);
}

function onKeyDown(e){
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

window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyRelease);
