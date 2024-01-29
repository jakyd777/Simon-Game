var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var count = 0;

$(document).on("keypress", nextSequence);

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    count += 1;
    console.log(userChosenColour);
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(count);
});


function nextSequence() {
    count = 0;
    userClickedPattern = [];
    $(document).off("keypress");
    level += 1;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    //console.log(randomNumber);
    var randomChosenColour = buttonColours[randomNumber];
    //console.log(randomChosenColour);
    gamePattern.push(randomChosenColour);
    //console.log(gamePattern);
    animatePress(randomChosenColour);
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    //$("#" + currentColour).fadeIn(100).fadeOut(100).fadeIn(100);
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(count) {
    if (userClickedPattern[count - 1] != gamePattern[count - 1]) {
        gameOver();
    }
    else if (count === level) {
        setTimeout(nextSequence, 1000);
    }

}

function gameOver() {
    userClickedPattern = [];
    gamePattern = [];
    buttonColours = ["red", "blue", "green", "yellow"];
    level = 0;
    $("body").addClass("game-over");
    playSound("wrong");  
    setTimeout(function(){
        $("h1").html("GAME OVER <br/>To Start Game Again Press Any Key");
        $("body").removeClass("game-over");
    }, 500);    
    $(document).on("keypress", nextSequence);
}