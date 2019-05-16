var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var playerPattern = [];
var randomNumber;
var randomChosenColour;
var userChosenColour;
var level = 0;
var gameLevel = 0;
var first = true;

function nextSequence() {
  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  gameLevel++;
  level = 0;
}

//animation
function animation(color) {
  $("#" + color).fadeOut(100).fadeIn(100);
}

//detect keypress and assign key ID pressed to variable userChosenColour
function keyPress() {
  $("#green, #red, #yellow, #blue").click(function(event) {
    userChosenColour = $(this).attr("id");
    playerPattern.push(userChosenColour);
    animation(userChosenColour);
    playSound(userChosenColour);

    if (gamePattern[level] === playerPattern[level]) {
      level++;
    } else {
      gameOver();
      gameLevel = 0;
      firstLevel();
      return;
    }

    if (gamePattern.length === playerPattern.length) {
      compare(userChosenColour);
      $("#" + randomChosenColour).delay(1000).fadeOut(100).fadeIn(100);
      setTimeout(function() {
        playSound(randomChosenColour);
        $("#level-title").html("Level " + gameLevel);
      }, 1000);

    }
  });
}

//sound effect
function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function firstLevel() {
  $(document).keypress(function() {
    level = 1;
    $("#level-title").html("Level " + level);
    nextSequence();
    playSound(randomChosenColour);
    animation(randomChosenColour);
    $(document).unbind();
  });
}

function compare(currentLevel) {
  nextSequence();
  playerPattern.splice(0, playerPattern.length);
}

function gameOver() {
  $("#level-title").html("Game Over! Press any key to restart.");
  playSound("wrong");
  playerPattern.splice(0, playerPattern.length);
  gamePattern.splice(0, gamePattern.length);
  return false;
}

if (first === true) {
  firstLevel();
  first = false;
}

keyPress();
