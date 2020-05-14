const KEY_RIGHT = 39;
const KEY_LEFT = 37;
const KEY_SPACE = 32;

var lasers = [];

function init(){
    this.lastUpdate = Date.now();
    this.width = 800;
    this.height = 800;
    this.context = document.getElementById("gameArea").getContext("2d");
    this.player = new Player(this.width/2, this.height - 80, 40, "blue", context);
    this.player.draw();
    window.requestAnimationFrame(updateGame);
}

function clearContext(){
    this.context.clearRect(0, 0, this.width, this.height);
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
    }
}

function updateGame(){
    const currentTime = Date.now();
    const dt = (currentTime - this.lastUpdate) / 1000;

    updatePlayer(dt);

    updateLasers(dt);

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
