class Enemy{
    constructor(x, y, l, color, context){

        const HEALTH = 50;
        const SPEED = 50;

        this.x = x - (l/2);
        this.y = y;
        this.l = l;
        this.health = HEALTH;
        this.right = true;
        this.despawn = false;
        this.color = color;
        this.context = context;
    
        this.draw = function () {
            var ctx = this.context;
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.l, this.l);
        };

        this.getSpeed = function(){
            if(this.right){
                return SPEED;
            }
            return -SPEED;
        }
    }
}