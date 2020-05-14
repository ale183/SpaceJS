class Enemy{
    constructor(x, y, l, color, context){

        const HEALTH = 40;
        const SPEED = 50;
        const COOLDOWN = Math.random()*2+0.5;
        this.type = "enemy";

        this.x = x - (l/2);
        this.y = y;
        this.l = l;
        this.health = HEALTH;
        this.cooldown = COOLDOWN;
        this.speed = SPEED;
        this.right = true;
        this.despawn = false;
        this.color = color;
        this.context = context;
    
        this.draw = function () {
            var ctx = this.context;
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.l, this.l);
        };

        this.resetCooldown = function(){
            this.cooldown = COOLDOWN;
        }

        this.getSpeed = function(){
            if(this.right){
                return this.speed;
            }
            return -this.speed;
        }
    }
}