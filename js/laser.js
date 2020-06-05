class Laser{
    constructor(entity, context){

        const SPEED = 300;
        const WIDTH = 2.5;
        const HEIGHT = 10;
        const DAMAGE = 1;

        this.context = context;
        this.type = entity.type;
        this.color = entity.color;
        this.despawn = false;

        if(this.type === "player"){
            this.x = entity.x + (entity.l / 2);
            this.y = entity.y - (entity.l / 2);
        }
        else{
            this.x = entity.x + (entity.l / 2);
            this.y = entity.y + (entity.l + entity.l/2);
        }

        this.draw = function(){
            var ctx = this.context;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x, this.y + HEIGHT);
            ctx.strokeStyle = this.color;
            ctx.lineWidth = WIDTH;
            ctx.stroke();
        }

        this.getSpeed = function(){
            if(this.type === "player"){
                return SPEED;
            }
            return -SPEED;
        }

        this.getDamage = function(){
            return DAMAGE;
        }

        this.hit = function(entity){
            if(entity.type === "enemy"){
                var distX = Math.abs(this.x - (entity.x + (entity.l / 2)));
                var distY = Math.abs(this.y - (entity.l / 2) - (entity.y));
            }
            else{
                var distX = Math.abs(this.x - (entity.x + (entity.l / 2)));
                var distY = Math.abs(this.y + HEIGHT - (entity.l/2) - (entity.y));
            }

            if(distX <= (entity.l / 2) && distY <= (entity.l / 2)){
                return true;
            }
            else{
                return false;
            }

        }
    }
}
