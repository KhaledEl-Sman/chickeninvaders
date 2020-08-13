(function () {

    //ship
    let ship = document.getElementById("ship");
    let shipLeft = 650, shipTop = 550;
    let bullets = [];
    document.addEventListener("keydown", function (e) {
        let left = true, right = true, top = true, bottom = true;
        if (shipLeft >= 0 && shipLeft > 1200 && shipTop >= 550 && shipTop <= 0) {
            if (e.keyCode == 39) {
                shipLeft += 50;
                ship.style.left = shipLeft;
            }
            if (e.keyCode == 37) {
                shipLeft -= 50;
                ship.style.left = shipLeft;
            }
            if (e.keyCode == 40) {
                shipTop -= 50;
                ship.style.top = shipTop;
            }
            if (e.keyCode == 38) {
                shipTop += 50;
                ship.style.top = shipTop;
            }
        } else {
            if (shipLeft <= 0) {
                left = false;
            }
            if (shipLeft > 1200) {
                right = false;
            }
            if (shipTop <= 0) {
                bottom = false;
            }
            if (shipTop >= 550) {
                top = false;
            }
            if (e.keyCode == 39 && right == true) {
                shipLeft += 50;
                ship.style.left = shipLeft;
            }
            if (e.keyCode == 37 && left == true) {
                shipLeft -= 50;
                ship.style.left = shipLeft;
            }
            if (e.keyCode == 40 && top == true) {
                shipTop += 50;
                ship.style.top = shipTop;
            }
            if (e.keyCode == 38 && bottom == true) {
                shipTop -= 50;
                ship.style.top = shipTop;
            }
        }
        if (e.keyCode == 32) {
            bullets.push({ left: shipLeft + 35, top: shipTop + 30 });
            document.getElementById("bulletSound").play();
            document.addEventListener("keyup", function (e) {
                if (e.keyCode == 32) {
                    document.getElementById("bulletSound").currentTime = 0;
                }
            })
        }
    })

    //bullets
    function drawBullet() {
        document.getElementById("bullets").innerHTML = "";
        for (let i = 0; i < bullets.length; i++) {
            document.getElementById("bullets").innerHTML += `<div class="bullet" style=' left:${bullets[i].left}px; top:${bullets[i].top}px'>
        <img class="w-100" src="image/bullet.png"></div>`;
        }
    }
    function moveBullet() {
        for (let i = 0; i < bullets.length; i++) {
            bullets[i].top -= 30;
        }
    }

    //chickens
    let chickens = [
        { left: 100, top: 75 },
        { left: 250, top: 75 },
        { left: 400, top: 75 },
        { left: 550, top: 75 },
        { left: 700, top: 75 },
        { left: 850, top: 75 },
        { left: 1000, top: 75 },
        { left: 100, top: 175 },
        { left: 250, top: 175 },
        { left: 400, top: 175 },
        { left: 550, top: 175 },
        { left: 700, top: 175 },
        { left: 850, top: 175 },
        { left: 1000, top: 175 },
        { left: 100, top: 275 },
        { left: 250, top: 275 },
        { left: 400, top: 275 },
        { left: 550, top: 275 },
        { left: 700, top: 275 },
        { left: 850, top: 275 },
        { left: 1000, top: 275 }
    ];
    function drawChickens() {
        document.getElementById("chickens").innerHTML = "";
        for (let i = 0; i < chickens.length; i++) {
            document.getElementById("chickens").innerHTML += `<div class="chicken" style=' left:${chickens[i].left}px; top:${chickens[i].top}px'>
            <img class="w-100" src="image/RedChicken.png"></div>`;
        }
    }
    let move = true;
    function moveChickens() {

        if (move == true) {
            for (let i = 0; i < chickens.length; i++) {
                if (chickens[i].left <= 1250) {
                    chickens[i].left += 5;
                } else {
                    move = false;
                    break;
                }
            }
        }
        else {
            for (let i = 0; i < chickens.length; i++) {
                if (chickens[i].left > 0) {
                    chickens[i].left -= 5;
                } else {
                    move = true;
                    break;
                }
            }
        }

    }

    //overlap
    let score = 0;
    function overlap() {
        for (let i = 0; i < chickens.length; i++) {
            if (
                shipTop <= (chickens[i].top + 75) &&
                (shipLeft + 75) >= chickens[i].left &&
                shipLeft <= (chickens[i].left + 90)
            ) {
                chickens.splice(i, 1);
                ship.innerHTML = "";
                gameOver();
            }
        }

        for (let i = 0; i < chickens.length; i++) {
            for (let j = 0; j < bullets.length; j++) {
                if (
                    bullets[j].top <= (chickens[i].top + 75) &&
                    bullets[j].top >= chickens[i].top &&
                    bullets[j].left >= chickens[i].left &&
                    bullets[j].left <= (chickens[i].left + 90)
                ) {
                    chickens.splice(i, 1);
                    bullets.splice(j, 1);
                    score++;
                    let audio = document.getElementById("killed");
                    audio.play();
                    document.getElementById("score").innerHTML = score;
                }
            }
        }

    }

    //gameOver
    function gameOver() {
        document.getElementById("restart").classList.remove("d-none");
        document.body.style.cursor = 'default';
        document.getElementById("restart").addEventListener("click", function () { location.reload() });
        document.getElementById("gameOver").play();
        clearTimeout(x, 100);
    }

    //game
    let x, con = true;
    function gameLoop() {
        x = setTimeout(gameLoop, 50);
        drawChickens();
        moveChickens();
        drawBullet();
        moveBullet();
        overlap();
        if (chickens.length == 0 && con == true) {
            con = false;
            document.getElementById("restart").classList.remove("d-none");
            document.getElementById("restart").innerHTML = 'YOU WIN';
            document.body.style.cursor = 'default';
            document.getElementById("restart").addEventListener("click", function () { location.reload() });
            document.getElementById("tada").play();
            clearTimeout(x, 100);
        }
    }
    gameLoop();

})();