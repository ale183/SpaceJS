class Laser{
    constructor(player, context){

        const SPEED = 300;
        const WIDTH = 2.5;

        this.player = player;
        this.context = context;
        this.despawn = false;

        this.x = this.player.x + (this.player.l / 2);
        this.y = this.player.y - this.player.l / 2;

        this.draw = function(){
            var ctx = this.context;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x, this.y + 10);
            ctx.strokeStyle = this.player.color;
            ctx.lineWidth = WIDTH;
            ctx.stroke();
        }

        this.getSpeed = function(){
            return SPEED;
        }
    }
}
