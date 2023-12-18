let canvas;
let gamestart = false;
let world;
let keyboard = new Keyboard();
let fullscreen = false;
let game_song = new Audio('audio/gameSong.mp3');
let soundIsRunning = false;
let intervalIds = [];
let i = 1;



function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas,keyboard);
}

function startTheGame(){
    gameStart();
    world.checkForGameStart();
    hideButton();
 if(soundIsRunning != false){
    game_song.play();
    soundIsRunning = true;
 }
}


function gameStart(){
   world.gamestart = true;
   world.characterDied = false;
   world.endbossDied = false;
}

function setStopableInterval(fn, time){
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

function stopGame(){
    if(!world.gameEnded){
        intervalIds.forEach(clearInterval);
        world.gameEnded = true;
    }
}

function restartTheGame(){
    gameStart();
    document.getElementById('restartBtn').style = 'display: none;'
    //document.getElementById('startBtn').style = 'display: flex;'
    world = new World(canvas,keyboard);
    startTheGame();

}

function hideButton(){
    document.getElementById('startBtn').style = 'display: none;'
}

function showRestartBtn(){
    document.getElementById('restartBtn').style = 'display: flex;'
}

function steerSound(){
    if(soundIsRunning){
        game_song.pause();
        soundIsRunning = false;
        document.getElementById('soundON').src = 'img/9_intro_outro_screens/soundOFF.png';
    }else{
        game_song.play();
        soundIsRunning = true;
        document.getElementById('soundON').src = 'img/9_intro_outro_screens/soundOn.png';
    }
}

function becomeFullscreen(){
    let fullscreenDiv = document.getElementById('fullscreen')
    if(fullscreen){
        exitFullscreen(fullscreenDiv);
        document.getElementById('fullscreenIcon').src = 'img/9_intro_outro_screens/fullscreen.svg';
    } else {
        enterFullscreen(fullscreenDiv);
        document.getElementById('fullscreenIcon').src = 'img/9_intro_outro_screens/exitFullscreen.png';
    }
    
}

function enterFullscreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
      element.msRequestFullscreen();
    } else if(element.webkitRequestFullscreen) {  // iOS Safari
      element.webkitRequestFullscreen();
    }
    fullscreen = true;
}

function exitFullscreen() {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
    fullscreen = false;
  }
  


window.addEventListener("keydown", (e) => {

    if(e.keyCode == 39 && !(world.gameEnded)){

        keyboard.RIGHT = true;
    }
    if(e.keyCode == 37 && !(world.gameEnded)){
        keyboard.LEFT = true;
    }
    if(e.keyCode == 38 && !(world.gameEnded)){
        keyboard.UP = true;
    }
    if(e.keyCode == 40 && !(world.gameEnded)){
        keyboard.DOWN = true;
    }
    if(e.keyCode == 32 && !(world.gameEnded)){
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68 && !(world.gameEnded)){
        keyboard.D = true;
    }
});

window.addEventListener("keyup", (e) => {
    if(e.keyCode == 39){
        keyboard.RIGHT = false;
    }
    if(e.keyCode == 37){
        keyboard.LEFT = false;
    }
    if(e.keyCode == 38){
        keyboard.UP = false;
    }
    if(e.keyCode == 40){
        keyboard.DOWN = false;
    }
    if(e.keyCode == 32){
        keyboard.SPACE = false;
    }
    if (e.keyCode == 68){
        keyboard.D = false;
    }
});

 
function moveOnMobile(){
    document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        world.keyboard.LEFT = true;
    })

    document.getElementById('btnLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        world.keyboard.LEFT = false;
    })

    document.getElementById('btnRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        world.keyboard.RIGHT = true;
    })

    document.getElementById('btnRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        world.keyboard.RIGHT = false;
    })

    document.getElementById('btnJump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        world.keyboard.SPACE = true;
    })

    document.getElementById('btnJump').addEventListener('touchend', (e) => {
        world.keyboard.SPACE = false;
    })

    document.getElementById('throwBottle').addEventListener('touchstart', (e) => {
        e.preventDefault();
        world.keyboard.D = true;
    })

    document.getElementById('throwBottle').addEventListener('touchend', (e) => {
        world.keyboard.D = false;
    })
}