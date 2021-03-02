$(function () {
    let canvas = $('#canvas')[0];
    let ctx = canvas.getContext('2d');

    let snake = [
        { x: 50, y: 100, oldX: 0, oldY: 0 },
        { x: 50, y: 90, oldX: 0, oldY: 0 },
        { x: 50, y: 80, oldX: 0, oldY: 0 }
    ];

    /* -------- Start of Keyboard Connect -------- */
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    let keyPressed = DOWN;
    /* -------- End of Keyboard Connect ---------- */

    let snakeWeight, blockSize;
    let snakeHeight = snakeWeight = blockSize = 10;

    setInterval(gameLoop, 1000);

    function gameLoop() {
        // console.log('Loop running');
        clearCanvas();
        drawSnake();
        moveSnake();
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function moveSnake() {
        $.each(snake, function (index, value) {
           // console.log(index == 0);
            snake[index].oldX = value.x;
            snake[index].oldY = value.y;
            if(index == 0)
            {
                if(keyPressed == DOWN){
                    snake[index].y = snake[index].y + blockSize;
                }
            }
            else
            {
                snake[index].x = snake[index - 1].oldX;
                snake[index].y = snake[index - 1].oldY;
            }
        });
    }

    $(document).keydown(function(e) {
        keyPressed = e.which;
        console.log(keyPressed);
    });

    function drawSnake() {
        $.each(snake, function (index, value){
           ctx.fillStyle = 'red';
           ctx.fillRect(value.x, value.y, snakeWeight, snakeHeight);
           ctx.strokeStyle = 'white';
           ctx.strokeRect(value.x, value.y, snakeWeight, snakeHeight);
        });
    }
});