class Laser{
    constructor(player, context){

        const SPEED = 300;
        const WIDTH = 2.5;
        const HEIGHT = 10;
        const DAMAGE = 10;

        this.speed = SPEED;

        this.player = player;
        this.context = context;
        this.despawn = false;

        this.x = this.player.x + (this.player.l / 2);
        this.y = this.player.y - this.player.l / 2;

        this.draw = function(){
            var ctx = this.context;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x, this.y + HEIGHT);
            ctx.strokeStyle = this.player.color;
            ctx.lineWidth = WIDTH;
            ctx.stroke();
        }

        this.getSpeed = function(){
            return this.speed;
        }

        this.getDamage = function(){
            return DAMAGE;
        }

        this.hit = function(enemy){
            var distX = Math.abs(this.x - (enemy.x + (enemy.l / 2)));
            var distY = Math.abs(this.y - (enemy.l / 2) - (enemy.y));

            if(distX <= (enemy.l / 2) && distY <= (enemy.l / 2)){
                return true;
            }
            else{
                return false;
            }

        }
    }
}
