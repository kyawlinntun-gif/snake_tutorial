$(function () {
    let canvas = $('#canvas')[0];
    let ctx = canvas.getContext('2d');

    let snake = [
        { x: 50, y: 100, oldX: 0, oldY: 0 },
        { x: 50, y: 90, oldX: 0, oldY: 0 },
        { x: 50, y: 80, oldX: 0, oldY: 0 }
    ];

    let food = { x: 200, y: 200, eaten: false };

    let score = 0;

    /* -------- Start of Keyboard Connect -------- */
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    let keyPressed = DOWN;
    /* -------- End of Keyboard Connect ---------- */

    let snakeWeight, blockSize;
    let snakeHeight = snakeWeight = blockSize = 10;

    let game;

    game = setInterval(gameLoop, 300);

    function gameLoop() {
        // console.log('Loop running');
        clearCanvas();
        drawSnake();
        moveSnake();
        drawFood();
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
                } else if(keyPressed == UP) {
                    snake[index].y = snake[index].y - blockSize;
                } else if(keyPressed == RIGHT) {
                    snake[index].x = snake[index].x + blockSize;
                } else if(keyPressed == LEFT) {
                    snake[index].x = snake[index].x - blockSize;
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
        // console.log($.inArray(e.which, [DOWN, UP, RIGHT, LEFT]));
        if($.inArray(e.which, [DOWN, UP, RIGHT, LEFT]) != -1)
        {
            keyPressed = checkKeyIsAllowed(e.which);
            // console.log(keyPressed);
            // keyPressed = e.which;
        }
    });

    function checkKeyIsAllowed(tempKey)
    {
        let key;
        if(tempKey == DOWN) {
            key = (keyPressed != UP) ? tempKey : keyPressed;
        } else if(tempKey == UP) {
            key = (keyPressed != DOWN) ? tempKey : keyPressed;
        } else if(tempKey == RIGHT) {
            key = (keyPressed != LEFT) ? tempKey : keyPressed;
        } else if(tempKey == LEFT) {
            key = (keyPressed != RIGHT) ? tempKey : keyPressed;
        }
        return key;
    }

    function drawSnake() {
        $.each(snake, function (index, value){
           ctx.fillStyle = 'red';
           ctx.fillRect(value.x, value.y, snakeWeight, snakeHeight);
           ctx.strokeStyle = 'white';
           ctx.strokeRect(value.x, value.y, snakeWeight, snakeHeight);
           if(index == 0){
               if(didEatFood(value.x, value.y)) {
                    score++;
                    $("#score").text(score);
                    makeSnakeBigger();
                    food.eaten = true;
               }
               if(collided(value.x, value.y)) {
                   // console.log('Game Over');
                   gameOver();
               }
           }
        });
    }

    function drawFood() {
        ctx.fillStyle = 'yellow';
        if(food.eaten == true) {
            food = getNewPositionForFood();
        }
        ctx.fillRect(food.x, food.y, blockSize, blockSize);
    }

    function didEatFood(x, y){
        return food.x == x && food.y == y;
    }

    function makeSnakeBigger() {
        snake.push({
           x: snake[snake.length - 1].oldX, y: snake[snake.length - 1].oldY
        });
    }

    function collided(x, y) {
        return snake.filter(function (value, index){
            return index != 0 && value.x == x && value.y == y;
        }).length > 0 || x < 0 || x > canvas.width || y < 0 || y > canvas.height;
    }

    function getNewPositionForFood () {
        let xArr = yArr = [], xy;
        $.each(snake, function(index, value){
           if($.inArray(value.x, xArr)) {
               xArr.push(value.x);
           }
           if($.inArray(value.y, yArr)) {
               yArr.push(value.y);
           }
        });
        xy = getEmptyXY(xArr, yArr);
        return xy;
    }

    function getEmptyXY(xArr, yArr) {
        let newX, newY;
        newX = getRandomNumber(canvas.width - 10, 10);
        newY = getRandomNumber(canvas.height - 10, 10);
        if($.inArray(newX, xArr) == -1 && $.inArray(newY, yArr) == -1) {
            return {
                x: newX,
                y: newY,
                eaten: false
            }
        } else {
            return getEmptyXY(xArr, yArr);
        }
    }

    function getRandomNumber(max, multipleOf) {
        let result = Math.floor(Math.random() * max);
        result = (result % 10 == 0) ? result : result + (multipleOf - result % 10);
        return result;
    }

    function gameOver() {
        clearInterval(game);
        alert('Game Over');
    }
});




























