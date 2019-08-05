window.onload = function () {
    var img0 = document.getElementById("zero");
    var img1 = document.getElementById("one");
    var img2 = document.getElementById("two");
    var img3 = document.getElementById("three");
    var img4 = document.getElementById("four");
    var img5 = document.getElementById("five");
    var img6 = document.getElementById("six");
    var img7 = document.getElementById("seven");
    var img8 = document.getElementById("eight");
    var imgUnopened = document.getElementById("unopened");
    var imgFlag = document.getElementById("flag");
    var imgBomb = document.getElementById("bomb");

    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, c.width, c.height);
    var score = 0;
    var disarmed = 0;
    var currentBombCount = 0;
    var bombRatio = 0.15;
    var lost = false;
    var win = false;
    var canvasOffset = 100; // THE ONE IN THE DIV OF CANVAS
    var boxes = new Array(c.width/50);
    for (var i = 0; i < c.width/50; i++) {
        boxes[i] = new Array(c.height/50);
    }
    var isOpened = new Array(c.width/50);
    for (var i = 0; i < c.width/50; i++) {
        isOpened[i] = new Array(c.height/50);
    }
    console.log(boxes);
    var bombCount = (c.width/50)*(c.height/50)*bombRatio;
    console.log(boxes[0].length);
    SetField();
    NumberField();
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, c.width, c.height);
    drawField(0, 0, false, true);

    function SetField(){
        for (var x = 0; x < c.width/50; x++) {
            for (var y = 0; y < c.height/50; y++) {
                isOpened[x][y] = false;
                boxes[x][y] = 0;
            }
        }
        while(currentBombCount < bombCount){
            var placeBomb = Math.round(Math.random()*((c.width/50)*(c.height/50)-1) + 0);
            var placeBombY = Math.round(Math.round(placeBomb/(c.width/50)));
            var placeBombX = placeBomb%(c.width/50);
            if(boxes[placeBombX][placeBombY] != 9){
                boxes[placeBombX][placeBombY] = 9; // BOMB HAS BEEN PLANTED
                currentBombCount++;
            }
        }
        return 0;
    }

    function NumberField(){
        for(var x = 0; x < c.width/50; x++){
            for(var y = 0; y < c.height/50; y++){
                    if(boxes[x][y] != 9){
                    boxes[x][y] = checkNearby(x, y);
                }
            }
        }
        return 0;
    }
    function drawField(clickedX, clickedY, actuallyClicked, leftClick){
        if(actuallyClicked == true){
            if(leftClick){
                if(boxes[clickedX][clickedY] >= 10){
                    boxes[clickedX][clickedY] -= 10;
                }else{
                    if(boxes[clickedX][clickedY] == 9){
                        lost = true;
                    }
                    isOpened[clickedX][clickedY] = true;
                    if(boxes[clickedX][clickedY] == 0){
                        if(clickedX+1 < (c.width/50)){
                            isOpened[clickedX+1][clickedY-1] = true;
                            isOpened[clickedX+1][clickedY] = true;
                            isOpened[clickedX+1][clickedY+1] = true;
                        }
                        isOpened[clickedX][clickedY+1] = true;
                        isOpened[clickedX][clickedY-1] = true;
                        if(clickedX-1 > -1){
                            isOpened[clickedX-1][clickedY+1] = true;
                            isOpened[clickedX-1][clickedY] = true;
                            isOpened[clickedX-1][clickedY-1] = true;
                        }
                        if(clickedX-1 > -1 && boxes[clickedX-1][clickedY-1] == 0){
                            openNearby(clickedX-1, clickedY-1);
                        }
                        if(clickedX+1 < (c.width/50) && boxes[clickedX+1][clickedY-1] == 0){
                            openNearby(clickedX+1, clickedY-1);
                        }
                        if(clickedX+1 < (c.width/50) && boxes[clickedX+1][clickedY+1] == 0){
                            openNearby(clickedX+1, clickedY+1);
                        }
                        if(clickedX-1 > -1 && boxes[clickedX-1][clickedY+1] == 0){
                            openNearby(clickedX-1, clickedY+1);
                        }
                    }
                }
            }else{
                if(!isOpened[clickedX][clickedY]){
                    if(boxes[clickedX][clickedY] < 10){
                        boxes[clickedX][clickedY] += 10;
                        if(boxes[clickedX][clickedY] == 19){
                            disarmed++;
                            if(disarmed == bombCount){
                                win = true;
                            }
                        }
                    }else{
                        boxes[clickedX][clickedY] -= 10;
                        if(boxes[clickedX][clickedY] == 9){
                            disarmed--;
                        }
                    }
                }
            }
    }
        for(var x = 0; x < c.width/50; x++){
            for(var y = 0; y < c.height/50; y++){
                var image;
                    if(isOpened[x][y] == true || lost == true){
                        if(boxes[x][y] >= 10 && lost){
                            boxes[x][y] -= 10;
                        }
                        switch (boxes[x][y]) {
                            case 0:
                                image = img0;
                                break;
                                case 1:
                                    image = img1;
                                    break;
                                    case 2:
                                        image = img2;
                                        break;
                                        case 3:
                                            image = img3;
                                            break;
                                            case 4:
                                                image = img4;
                                                break;
                                                case 5:
                                                    image = img5;
                                                    break;
                                                    case 6:
                                                        image = img6;
                                                        break;
                                                        case 7:
                                                            image = img7;
                                                            break;
                                                            case 8:
                                                                image = img8;
                                                                break;
                                                                case 9:
                                                                    image = imgBomb;
                                                                    break;
                            default:

                        }
                    ctx.drawImage(image, x*50, y*50, 50, 50);
                }else if(boxes[x][y] >= 10){
                    image = imgFlag;
                    ctx.drawImage(image, x*50, y*50, 50, 50);
                }else{
                    image = imgUnopened;
                    ctx.drawImage(image, x*50, y*50, 50, 50);
                }
            }
        }
    }

    function boundaries(x, y){
        if(x < 0 || x >= c.width/50 || y < 0 || y >= c.height/50){
            return 0
        }else{
            if(boxes[x][y] == 9){
                return 1;
            }
            return 0;
        }
    }

    function checkNearby(x, y){ // finds bomb count around for setting the tile number
        var bombsArround = 0;
        
        bombsArround+=boundaries(x-1, y-1);

        bombsArround+=boundaries(x, y-1);

        bombsArround+=boundaries(x+1, y-1);

        bombsArround+=boundaries(x+1, y);

        bombsArround+=boundaries(x+1, y+1);

        bombsArround+=boundaries(x, y+1);
        
        bombsArround+=boundaries(x-1, y+1);

        bombsArround+=boundaries(x-1, y);

        return bombsArround;
    }

    function checkSegment(clickedX, clickedY){
        if(clickedX < 0 || clickedX >= c.width/50 || clickedY < 0 || clickedY >= c.height/50){
        }else{
            if(boxes[clickedX][clickedY] != 9 && !isOpened[clickedX][clickedY]){
                isOpened[clickedX][clickedY] = true;
                if(boxes[clickedX][clickedY] == 0){
                    openNearby(clickedX, clickedY);
                }
            }
        }
    }


    function openNearby(clickedX, clickedY){
        console.log("CIKLOJA");

        checkSegment(clickedX, clickedY-1);

        checkSegment(clickedX+1, clickedY-1);

        checkSegment(clickedX+1, clickedY);

        checkSegment(clickedX+1, clickedY+1);

        checkSegment(clickedX, clickedY+1);

        checkSegment(clickedX-1, clickedY+1);

        checkSegment(clickedX, clickedY-1);

        checkSegment(clickedX-1, clickedY);
}

var update = setInterval(function () {

document.addEventListener("keydown", function (event) {
    if(event.keyCode == "82"){
        location.reload();
    }
});
document.onmousedown = function(event){
var msButtonLeft = true;
if(event.button === 0){ // left
    msButtonLeft = true;
}else if(event.button === 2){ // right 
    msButtonLeft = false;
}
var mouseX = Math.floor(((event.clientX-0.16-canvasOffset)/50)-(((event.clientX-0.16-canvasOffset)%50)/50));
var mouseY = Math.floor(((event.clientY-0.16-canvasOffset)/50)-(((event.clientY-0.16-canvasOffset)%50)/50));
console.log(event.which);
console.log("X");
console.log((event.clientX-canvasOffset/50));
console.log((event.clientX-canvasOffset%50)/50);
console.log("Y");
console.log((event.clientY-canvasOffset/50));
console.log((event.clientY-canvasOffset%50)/50);
drawField(mouseX, mouseY, true, msButtonLeft);
if(win){
    ctx.font = "50px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Congratz YOU WON", c.width/2, c.height/2);
}
};
}, 200);

};