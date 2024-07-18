var level = 0;
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var clickCount = 0;
//True if the game is over:
var gameState = false;

$(document).keypress(function(event) {
    if (level === 0) {
        gameState = false;
        buttonColours = ["red", "blue", "green", "yellow"];
        gamePattern = [];
        userClickedPattern = [];
        nextSequence();
    }
})

$(".btn").click(function () {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    if (clickCount === level - 1) {
        checkSequence();
        nextSequence();

        userClickedPattern = [];
        clickCount = -1;
    }
    clickCount++;
})

function nextSequence() {
    var randNum =  Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randNum];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).animate({opacity: 0.5}).animate({opacity: 1});
    playSound(randomChosenColour);

    if (!gameState) {
        $("h1").text("Level " + (level + 1));
        level++;
    }
}

function playSound(name) {
    (new Audio("./sounds/" + name + ".mp3")).play();
}

function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(function(){
        $("." + currentColour).removeClass("pressed");
    }, 100);
}

function checkSequence() {
    if (checkArrays(gamePattern, userClickedPattern)) {
        return;
    } else {
        console.log("Game patter: " + gamePattern);
        console.log("userClickPattern: " + userClickedPattern);
        gameOver();
    }
}

function checkArrays(array1, array2) {
    if (array1.length !== array2.length) return false;

    for (i = 0; i< array1.length; i++) {
        if (array1[i] !== array2[i]) return false
    }

    return true;
}

function gameOver() {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    gameState = true;

    level = 0;
    clickCount = 0;
}