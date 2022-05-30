window.onload = function () {

    var canvas = document.createElement('canvas');
    canvas.width = 900;
    canvas.height = 600;
    var ctx = canvas.getContext('2d');
    var delay = 100; //1s
    var blocksize = 30;
    var body = [[10, 10], [40, 10], [70, 10], [100, 10]]; // max width 900 - 10  max height 600 -10

    init();
    
    function init() {
        canvas.style.border = "1px solid black";
        document.body.appendChild(canvas);
        snake = new Snake(body);
        refreshCanvas();
    }

    function refreshCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        snake.draw();
        setTimeout(refreshCanvas, delay);
    }

    function Snake(body) {
        this.body = body;

        this.draw = function () {
            ctx.save();
            ctx.fillStyle = "#ff0000";
            for (var i = 0; i < this.body.length; i++) {
                ctx.fillRect(this.body[i][0], this.body[i][1], blocksize, blocksize);
            }
            ctx.restore();
        };

        // X => 0   Y => 1
        this.moveX = function (push) {
            this.body.shift();
            this.body.push([this.body[this.body.length - 1][0] + push, this.body[this.body.length - 1][1]]);
            setTimeout(moveX, delay);
        };
        this.moveY = function (push) {
            this.body.shift();
            this.body.push([this.body[this.body.length - 1][0], this.body[this.body.length - 1][1] + push]);
            setTimeout(refreshCanvas, delay);
        };

        this.setdirection = function (vx, vy) {            
           if (vx == 0 && vy != 0) {
               this.moveY(vy);
           }
           if (vx != 0 && vy == 0){
            this.moveX(vx);
           }
        }
    }
};

document.onkeydown = function handleKey(e) {
    var key = e.keyCode;
    var pushX = 0;
    var pushY = 0;
    switch (key) {
        case 37:
            var pushX = -30;
            var pushY = 0;
            break;
        case 38:
            var pushX = 0;
            var pushY = -30;
            break;
        case 39:
            var pushX = 30;
            var pushY = 0;
            break;
        case 40:
            var pushX = 0;
            var pushY = 30;
    }
    snake.setdirection(pushX, pushY);
}

