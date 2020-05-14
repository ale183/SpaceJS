class Player {
    constructor(x, y, l, color, context) {

        const SPEED = 600;
        const COOLDOWN = 0.5;

        this.x = x;
        this.y = y;
        this.l = l;
        this.color = color;
        this.context = context;
        
        this.cooldown = COOLDOWN;

        this.right = false;
        this.left = false;
        this.space = false;

        this.draw = function () {
            var ctx = this.context;
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.l, this.l);
        };

        this.resetCooldown = function(){
            this.cooldown = COOLDOWN;
        }

        this.getSpeed = function(){
            return SPEED;
        }
    }
}
