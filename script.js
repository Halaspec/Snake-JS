alert("Press OK to start the game !");
window.onload = function () {

    var canvas = document.createElement('canvas');
    canvas.width = 900;
    canvas.height = 600;
    var ctx = canvas.getContext('2d');
    var delay = 75; //1s
    var blocksize = 30;
    var defaultbody = [[0, 0], [30, 0], [60, 0], [90, 0]];
    var body = [[0, 0], [30, 0], [60, 0], [90, 0]]; // max width 900 - 10  max height 600 -10
    var score = 0;

    init();

    function init() {
        canvas.style.border = "5px solid black";
        canvas.style.background="WHITE";
        document.body.appendChild(canvas);
        ctx.font="bold 200px sans-serif";
        ctx.textBaseline="middle";
        snake = new Snake(body, 30, 0);
        ball = new Eat(Math.floor(Math.random() * 30) * 30, Math.floor(Math.random() * 20) * 30);
        console.log(ball.x);
        console.log(ball.y);
        refreshCanvas();
    }

    function refreshCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);7
        drawScore();
        snake.draw();
        ball.draw();
        // Check if the snake eat the Ball
        if (ball.x == snake.body[snake.body.length - 1][0] && ball.y == snake.body[snake.body.length - 1][1]) {
            score++;
            console.log(score);
            ball.replace();
            snake.body.unshift([[snake.body[0][0] - 30, snake.body[0][1]]])
        }
        snake.colision();
        setTimeout(refreshCanvas, delay);
    }

    function drawScore (){
       ctx.save();
       ctx.fillText(score.toString(), canvas.width/2 - 80, canvas.height/2 )

    }


    function Snake(body, x, y) {
        this.body = body;
        this.x = x;
        this.y = y;

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
        };
        this.moveY = function (push) {
            this.body.shift();
            this.body.push([this.body[this.body.length - 1][0], this.body[this.body.length - 1][1] + push]);
        };

        this.setdirection = function (vx, vy) {
            this.x = vx;
            this.y = vy;
            console.log("snakex" + this.x);
            console.log("snakey" + this.y);
            if (vx == 0 && vy != 0) {
                this.moveY(this.y);
            }
            if (vx != 0 && vy == 0) {
                this.moveX(this.x);
            }
        }

        this.colision = function () {
            if (this.body[this.body.length - 1][0] < 0 || this.body[this.body.length - 1][0] > 870
                || this.body[this.body.length - 1][1] < 0 || this.body[this.body.length - 1][1] > 570) {
                this.lose();
            } else {
                for (var i = 0; i < this.body.length - 1; i++) {
                    if (this.body[this.body.length - 1][1] == this.body[i][1] && this.body[this.body.length - 1][0] == this.body[i][0]) this.lose();
                } 
            }
           if (this.x != 0)  this.moveX(this.x); 
           if (this.y != 0)  this.moveY(this.y);
        }
        this.lose = function () {
            alert("you lose, votre score est de :" + score + "points");
            score = 0;
            this.body = [...defaultbody];
            this.x = 30;
            this.y= 0; // reset start
        }
    }

    function Eat(x, y) {
        this.x = x;
        this.y = y;

        this.draw = function () {
            ctx.save();
            ctx.fillStyle = "#00ffff";
            ctx.fillRect(this.x, this.y, blocksize, blocksize);
            ctx.restore();
        };

        this.replace = function () {
            this.x = Math.floor(Math.random() * 30) * 30;
            this.y = Math.floor(Math.random() * 20) * 30;
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

/* 
HALASPEC 
*/