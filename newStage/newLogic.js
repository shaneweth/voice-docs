var sound = document.getElementById("myAudio");
var playAction = document.getElementById("playButton");

var isPlaying = false;

function playAudio() {
    sound.play();
    isPlaying = true;
    playAction.src = "https://findicons.com/files/icons/1676/primo/128/button_blue_pause.png";
}

function pauseAudio() {
    sound.pause();
    isPlaying = false;
    playAction.src = "https://findicons.com/files/icons/1676/primo/128/button_blue_play.png";
}

function handleAudio() {
    if (isPlaying == true) {
        pauseAudio();
    } else {
        playAudio();
    }
}

