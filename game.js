var allColor = ["green","blue","red","yellow"];
var correctAnswers = [];
var givenAnswers = [];
var random;
var count = 0;
var game = false;


$(document).keydown(function(){
  if(!game){
    nextSequence();
    game =true;
  }
});

$(".btn").click(function(){
  var color = $(this).attr("id");
  givenAnswers.push(color);
  makeAnnimation(color);
  makesound(color);
  checkAnswer(givenAnswers.length-1);
});

function checkAnswer(i){
    if(correctAnswers[i] !== givenAnswers[i]){
      //wrong
      makesound("wrong");
      $("#level-title").text("Game Over, Press Any Key to Restart");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      }, 200);
      startOver();
    }else{//correct
      count--;
      if(count === 0){
        givenAnswers = [];
        setTimeout(nextSequence,1000);
      }
    }
}

function startOver(){
  correctAnswers = [];
  givenAnswers = [];
  random;
  count = 0;
  game = false;
}

function nextSequence(){
  random = Math.floor(Math.random()*4);
  correctAnswers.push(allColor[random]);
  makeAnnimation(allColor[random]);
  makesound(allColor[random]);
  count = correctAnswers.length;
  $("#level-title").text("Level "+ count);
}

function makeAnnimation(key){
    $("#"+key).addClass("pressed");
    setTimeout(function(){
      $("#"+key).removeClass("pressed");
    }, 300);
}

function makesound(key){
  switch (key) {
    case "wrong":
      var audio = new Audio("sounds/wrong.mp3");
      break;
    default:
      var audio = new Audio("sounds/"+key+".mp3");
  }
  audio.play();
}
