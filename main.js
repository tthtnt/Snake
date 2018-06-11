window.onload = init;
function init() {
    view.SnakeHead();
    model.startMove();
    view.createFood();
}
var view = {
    SnakeHead: function () {
        var SnakeHead = document.getElementById("05-07");
        var after = "07";
        var before = "05";
        SnakeHead.setAttribute("class", "Snake-Head");
        for (var i = 0; i < model.length; i++) {
            after--;
            var id = before + "-0" + after;
            var SnakeBody = document.getElementById(id);
            SnakeBody.setAttribute("class", "Snake-Body");
            model.body.push(id);
        }
    },
    createFood: function () {
        model.foodResult = true;
        while (model.foodResult) {
            var row = Math.floor(Math.random() * 9 + 1);
            var col = Math.floor(Math.random() * 13 + 1);
            var id;
            if (col >= 10) {
                id = "0" + row + "-" + col;
            } else {
                id = "0" + row + "-0" + col;
            }
            var foods = document.getElementById(id);
            var att = foods.getAttribute("class");
            if (att === "Snake-Body" || att === "Snake-Head" || att === "food") {
            } else {
                model.foodResult = false;
                foods.setAttribute("class", "food");
            }
        }
    },
    showScore: function () {
        var score = document.getElementById("score");
        score.innerHTML = "您的分数是: " + model.score + " 分";
    }
}
var model = {
    length: 1,
    speed: 1000,
    direction: 0,
    result: 0,
    length: 4,
    body: [],
    food: 1,
    foodResult: true,
    score: 0,
    key: true,
    getLocation: function () {
        var SnakeHead = document.getElementsByClassName("Snake-Head");
        var id = SnakeHead[0].getAttribute("id");
        return id;
    },
    startMove: function (direction) {
        if (this.result) {
            clearInterval(this.result);
        }
        this.result = setInterval(model.setLocation, 300);
        // console.log(model.speed);
    },
    setLocation: function () {
        var id = model.getLocation();
        var location = document.getElementById(id);
        var before = id.slice(0, 2);
        var after = id.slice(3);
        model.body.unshift(id);
        var NewSnakeBody = document.getElementById(id);
        var SnakeBody = document.getElementById(model.body[model.body.length - 1]);
        if (model.direction == 0) {
            location.setAttribute("class", "");
            after++;
            if (after > 13) {
                model.stopGame();
            }
            if (after < 10) {
                id = before + "-0" + after;
            } else {
                id = before + "-" + after;
            }
        } else if (model.direction == 38) {
            model.up++;
            location.setAttribute("class", "");
            before--;
            if (before < 1) {
                model.stopGame();
            }
            if (before >= 10 && after < 10) {
                id = before + "-0" + after;
            } else if (before >= 10 && after >= 10) {
                id = before + "-" + after;
            } else if (before < 10 && after < 10) {
                id = "0" + before + "-" + after;
            } else if (before < 10 && after >= 10) {
                id = "0" + before + "-" + after;
            }
        } else if (model.direction == 37) {
            model.left++;
            location.setAttribute("class", "");
            after--;
            if (after < 1) {
                model.stopGame();
            }
            if (before >= 10 && after < 10) {
                id = before + "-0" + after;
            } else if (before >= 10 && after >= 10) {
                id = before + "-" + after;
            } else if (before < 10 && after < 10) {
                id = before + "-0" + after;
            } else if (before < 10 && after >= 10) {
                id = before + "-" + after;
            }
        } else if (model.direction == 39) {
            location.setAttribute("class", "");
            after++;
            if (after > 13) {
                model.stopGame();
            }
            if (before > 10 && after < 10) {
                id = before + "-0" + after;
            } else if (before > 10 && after >= 10) {
                id = before + "-" + after;
            } else if (before < 10 && after < 10) {
                id = before + "-0" + after;
            } else if (before < 10 && after >= 10) {
                id = before + "-" + after;
            }
        } else if (model.direction == 40) {
            location.setAttribute("class", "");
            before++;
            if (before > 9) {
                model.stopGame();
            }
            if (before > 10 && after < 10) {
                id = before + "-0" + after;
            } else if (before > 10 && after >= 10) {
                id = before + "-" + after;
            } else if (before < 10 && after < 10) {
                id = "0" + before + "-" + after;
            } else if (before < 10 && after >= 10) {
                id = "0" + before + "-" + after;
            }
        }
        location = document.getElementById(id);
        var haveClass = location.getAttribute("class");
        if (haveClass === "food") {
            view.createFood();
            model.score = model.score + 5;
            location.setAttribute("class", "Snake-Head");
            NewSnakeBody.setAttribute("class", "Snake-Body");
        } else if (haveClass === "Snake-Body") {
            model.stopGame();
        } else {
            model.score++;
            location.setAttribute("class", "Snake-Head");
            NewSnakeBody.setAttribute("class", "Snake-Body");
            SnakeBody.setAttribute("class", "");
            model.body.pop();
        }
        view.showScore();
        model.uploadSpeed(model.body.length);
    },
    uploadSpeed: function (length) {
        // console.log(length);
        if (length <= 5) {
            model.speed = model.speed = 800;
        } else if (length <= 10) {
            model.speed = model.speed = 400;
        } else if (length <= 15) {
            model.speed = model.speed = 200;
        } else if (length <= 20) {
            model.speed = model.speed = 100;
        }
    },
    stopGame: function () {
        clearInterval(model.result);
        // alert("撞到墙壁!你 gg 了！");
        model.key = false;
        var gameOver = document.getElementById("gameMessage");
        gameOver.setAttribute("class","display");
        // clearInterval(model.result);
        // alert("吃到自己");
    }
}
document.onkeydown = function (event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode == 38) {
        if (model.direction != 38 && model.direction != 40 && model.key == true) {
            model.direction = 38;
            model.setLocation();
            model.startMove();
        }
    } else if (e && e.keyCode == 37) {
        if (model.direction != 37 && model.direction != 39 && model.direction != 0 && model.key == true) {
            model.direction = 37;
            model.setLocation();
            model.startMove();
        }
    } else if (e && e.keyCode == 39) {
        if (model.direction != 39 && model.direction != 37 && model.key == true) {
            model.direction = 39;
            model.setLocation();
            model.startMove();
        }
    } else if (e && e.keyCode == 40) {
        if (model.direction != 40 && model.direction != 38 && model.key == true) {
            model.direction = 40;
            model.setLocation();
            model.startMove();
        }
    }
}