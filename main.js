//variaveis ball
let ball = Array.from(document.getElementsByClassName('ball'))[0];
let ballSpeedHor = 5;
let ballSpeedVert = 7;
let ballSpeedHor2 = 0;
let ballSpeedVert2 = 0;

//variaveis barra
let player1Bar =  Array.from(document.getElementsByClassName('player1-bar'))[0];
let player2Bar =  Array.from(document.getElementsByClassName('player2-bar'))[0];
let barSpeed = 50;
let barSpeed2 = 0;

//variaveis placar
let player1Points = Array.from(document.getElementsByClassName('player1-points'))[0];
let p1Pts = 0;
let player2Points = Array.from(document.getElementsByClassName('player2-points'))[0];
let p2Pts = 0;

let pauseBtn = Array.from(document.getElementsByClassName('pause'))[0];
let pauseText = Array.from(document.getElementsByClassName('pause-btn'))[0];

//variaveis troca de cor
let barYellow = Array.from(document.getElementsByClassName('barColorYellow'))[0];
let barRed = Array.from(document.getElementsByClassName('barColorRed'))[0];
let barGreen = Array.from(document.getElementsByClassName('barColorGreen'))[0];
let barBlue = Array.from(document.getElementsByClassName('barColorBlue'))[0];
let barWhite = Array.from(document.getElementsByClassName('barColorWhite'))[0];

let ballYellow = Array.from(document.getElementsByClassName('ballColorYellow'))[0];
let ballRed = Array.from(document.getElementsByClassName('ballColorRed'))[0];
let ballGreen = Array.from(document.getElementsByClassName('ballColorGreen'))[0];
let ballBlue = Array.from(document.getElementsByClassName('ballColorBlue'))[0];
let ballWhite = Array.from(document.getElementsByClassName('ballColorWhite'))[0];

let actualBarBG = player1Bar.style.backgroundColor;
let actualBallBG = ball.style.backgroundColor;

//Variaveis de som
let wallBlip = new Audio('./Sounds/wallBlip.wav');
let barBlip = new Audio('./Sounds/barBlip.wav');
let winSound = new Audio('./Sounds/win.wav');
let startSound = new Audio('./Sounds/startGame.wav');

//outras variaveis
let pressToStart = Array.from(document.getElementsByClassName('press-to-start'))[0];



//começar o game
function setupGame(){
    ball.style.position = 'absolute';
    player1Bar.style.position = 'absolute';
    player2Bar.style.position = 'absolute';
    
    pauseText.textContent = "PAUSE";
    
    ballSpeedVert2 = ballSpeedVert;
    ballSpeedHor2 = ballSpeedHor;
    barSpeed2 = barSpeed;
    

    alert(`Comandos para jogar: \nW e S para mover o jogador1 \nSetas para Cima e Baixo para mover o jogador 2`),

    startGame();
    randomStart();
    startScore();
    ballMovement();
    barMovement();
    pauseGame();
}

function startGame(){
    ball.style.left = `${window.innerWidth/2}px`;
    ball.style.top = `${window.innerHeight/2}px`;
    
    player1Bar.style.left = 0;
    player1Bar.style.top = `${window.innerHeight/2}px`;
    
    player2Bar.style.left = `${window.innerWidth - 10}px`;
    player2Bar.style.top = `${window.innerHeight/2}px`;

    alert('Pressione OK para começar!');
}

function pauseGame(){
    window.addEventListener("keydown", (e) => {
        if(e.keyCode == 32 && pauseText.textContent === "PLAY"){
            ballSpeedHor = ballSpeedHor2;
            ballSpeedVert = ballSpeedVert2;
            barSpeed = barSpeed2;
            pauseText.textContent = "PAUSE";
        }
        else if(e.keyCode == 32 && pauseText.textContent === "PAUSE"){
            ballSpeedHor = 0;
            ballSpeedVert = 0;
            barSpeed = 0;
            pauseText.textContent = "PLAY";
        }
    });
    pauseBtn.addEventListener('click', ()=>{
        if(pauseText.textContent == "PAUSE"){
            ballSpeedHor = 0;
            ballSpeedVert = 0;
            barSpeed = 0;
            pauseText.textContent = "PLAY";
        }else{
            ballSpeedHor = ballSpeedHor2;
            ballSpeedVert = ballSpeedVert2;
            barSpeed = barSpeed2;
            pauseText.textContent = "PAUSE";
        }
    });
}

//funções barra player
function barMovement(){
    // keydown
    //keycodes - w=87 s=83  arrowUp=38  arrowDown=40
    window.addEventListener("keydown", (e) => {
        switch (e.keyCode) {
            case 83:
                if(getIntFromPx(player1Bar.style.top)  >= window.innerHeight - player1Bar.clientHeight - 10){
                    break;
                }
                    player1Bar.style.top = `${getIntFromPx(player1Bar.style.top) + barSpeed}px`;
                    break;
            case 87:
                if(getIntFromPx(player1Bar.style.top) <= 0 + 66){
                    break;
                }
                player1Bar.style.top = `${getIntFromPx(player1Bar.style.top) - barSpeed}px`;
                break;
            
            case 40:
                if(getIntFromPx(player2Bar.style.top)  >= window.innerHeight - player2Bar.clientHeight - 10){
                    break;
                }
                    player2Bar.style.top = `${getIntFromPx(player2Bar.style.top) + barSpeed}px`;
                    break;
            
            case 38:
                if(getIntFromPx(player2Bar.style.top) <= 0 + 66){
                    break;
                }
                player2Bar.style.top = `${getIntFromPx(player2Bar.style.top) - barSpeed}px`;
                break;
            }
         }, false);
    //     if (e.keyCode == "83"){
    //         player1Bar.style.top = `${getIntFromPx(player1Bar.style.top) + barSpeed}px`;
    //     }
    //     if (e.keyCode == "87"){
    //         player1Bar.style.top = `${getIntFromPx(player1Bar.style.top) - barSpeed}px`;
    //     }
    //     if (e.keyCode == "40"){
    //         player2Bar.style.top = `${getIntFromPx(player2Bar.style.top) + barSpeed}px`;
    //     }
    //     if (e.keyCode == "38"){
    //         player2Bar.style.top = `${getIntFromPx(player2Bar.style.top) - barSpeed}px`;
    //     }
    // }, false);
}

//funções ball
function ballMovement(){
    setInterval(() => {
        ball.style.left = `${getIntFromPx(ball.style.left) + ballSpeedHor}px`;
        ball.style.top = `${getIntFromPx(ball.style.top) + ballSpeedVert}px`;

        verifyPoint();
        // verifyWinner();
        bounceWall();
        changeBarColor();
    }, 16.7);
}



function randomStart(){
    if(Math.random() <= 0.5){
        ballSpeedHor = ballSpeedHor*(-1);
        ballSpeedVert = ballSpeedVert*(-1);
        startSound.play();
    }
}

function bounceWall(){
    
    if(getIntFromPx(ball.style.left) <=0 + ball.clientWidth + player1Bar.clientWidth && getIntFromPx(ball.style.top) >= getIntFromPx(player1Bar.style.top) && getIntFromPx(ball.style.top) <= getIntFromPx(player1Bar.style.top) + player1Bar.clientHeight){
        barBlip.play();
        ballSpeedHor = ballSpeedHor*(-1);
        ballSpeedVert2 = ballSpeedVert;
        ballSpeedHor2 = ballSpeedHor;
        // ballSpeedHor = ballSpeedHor+(Math.random());
        // ballSpeedVert = ballSpeedVert+(Math.random());
        // ballSpeedVert = ballSpeedVert*(-1);
    }

    if(getIntFromPx(ball.style.left) >= window.innerWidth - ball.clientWidth - player2Bar.clientWidth && getIntFromPx(ball.style.top) >= getIntFromPx(player2Bar.style.top) && getIntFromPx(ball.style.top) <= getIntFromPx(player2Bar.style.top) + player2Bar.clientHeight){
        barBlip.play();
        ballSpeedHor = ballSpeedHor*(-1);
        ballSpeedVert2 = ballSpeedVert;
        ballSpeedHor2 = ballSpeedHor;
        // ballSpeedHor = ballSpeedHor+(Math.random());
        // ballSpeedVert = ballSpeedVert+(Math.random());
        // ballSpeedVert = ballSpeedVert*(-1);
    }


    // if(getIntFromPx(ball.style.left) > window.innerWidth - ball.clientWidth|| getIntFromPx(ball.style.left) < 0 ){
    //     startGame();
    //     randomStart();
    // }

    if(getIntFromPx(ball.style.top) >= window.innerHeight - ball.clientHeight || getIntFromPx(ball.style.top) <= 60+ ball.clientHeight){
        wallBlip.play();
        ballSpeedVert = ballSpeedVert*(-1);
        ballSpeedVert2 = ballSpeedVert;
        ballSpeedHor2 = ballSpeedHor;
    }
}


//placar
function startScore(){
    p1Pts = 0;
    p2Pts = 0;
    player1Points.textContent = p1Pts.toString();
    player2Points.textContent = p2Pts.toString();
}

function verifyPoint(){
    if(getIntFromPx(ball.style.left) >= window.innerWidth - ball.clientWidth){
        winSound.play();
        p1Pts++;
        player1Points.textContent = p1Pts.toString();
        alert(`Ponto para o Jogador 1! \n \nPressione ok para continuar!`);
        if(p1Pts == 3){
            alert("Jogador 1 foi o vencedor da melhor de 3!");
            randomStart();
            startScore();
        }
        startGame();
        randomStart();
    }
    if(getIntFromPx(ball.style.left) <= 0){
        winSound.play();
        p2Pts++;
        player2Points.textContent = p2Pts.toString();
        alert(`Ponto para o Jogador 2! \n \nPressione ok para continuar!`);
        if(p2Pts == 3){
            alert("Jogador 2 foi o vencedor da melhor de 3!");
            randomStart();
            startScore();
        }
        startGame();
        randomStart();
    }
}

function changeBarColor(){
    barYellow.addEventListener('click', ()=>{
        if(actualBarBG !== 'yellow'){
            player1Bar.style.backgroundColor = 'yellow';
            player2Bar.style.backgroundColor = 'yellow';

            actualBarBG = player1Bar.style.backgroundColor;
        }
    });
    barRed.addEventListener('click', ()=>{
        if(actualBarBG !== 'red'){
            player1Bar.style.backgroundColor = 'red';
            player2Bar.style.backgroundColor = 'red';

            actualBarBG = player1Bar.style.backgroundColor;
        }
    });
    barGreen.addEventListener('click', ()=>{
        if(actualBarBG !== 'green'){
            player1Bar.style.backgroundColor = 'green';
            player2Bar.style.backgroundColor = 'green';

            actualBarBG = player1Bar.style.backgroundColor;
        }
    });
    barBlue.addEventListener('click', ()=>{
        if(actualBarBG !== 'blue'){
            player1Bar.style.backgroundColor = 'blue';
            player2Bar.style.backgroundColor = 'blue';

            actualBarBG = player1Bar.style.backgroundColor;
        }
    });
    barWhite.addEventListener('click', ()=>{
        if(actualBarBG !== 'white'){
            player1Bar.style.backgroundColor = 'white';
            player2Bar.style.backgroundColor = 'white';

            actualBarBG = player1Bar.style.backgroundColor;
        }
    });

    ballYellow.addEventListener('click', ()=>{
        if(ball.style.backgroundColor !== 'yellow'){
            ball.style.backgroundColor = 'yellow';

            actualBallBG = ball.style.backgroundColor;
        }
    });
    ballRed.addEventListener('click', ()=>{
        if(ball.style.backgroundColor !== 'red'){
            ball.style.backgroundColor = 'red';

            actualBallBG = ball.style.backgroundColor;
        }
    });
    ballGreen.addEventListener('click', ()=>{
        if(ball.style.backgroundColor !== 'green'){
            ball.style.backgroundColor = 'green';

            actualBallBG = ball.style.backgroundColor;
        }
    });
    ballBlue.addEventListener('click', ()=>{
        if(ball.style.backgroundColor !== 'blue'){
            ball.style.backgroundColor = 'blue';

            actualBallBG = ball.style.backgroundColor;
        }
    });
    ballWhite.addEventListener('click', ()=>{
        if(ball.style.backgroundColor !== 'white'){
            ball.style.backgroundColor = 'white';

            actualBallBG = ball.style.backgroundColor;
        }
    });
}

// function verifyWinner(){
// 3288
//     if(p1Pts == 3){
//         alert("Jogador 1 foi o vencedor da melhor de 3!");
//         startGame();
//         randomStart();
//         startScore();
//     }
//     if(p2Pts == 3){
//         alert("Jogador 2 foi o vencedor da melhor de 3!");
//         startGame();
//         randomStart();
//         startScore();
//     }
// }


//funções extras
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getIntFromPx(pixels) {
    return parseInt(pixels.replace('px', ''));
}





setupGame();