var userClickedPattern=[];

var gamePattern=[];
var buttonColours=["red", "blue", "green", "yellow"];

var started =false;
var level=0;

$(document).keypress(function()
{
   if(!started)
    {
        $("h1").text("Level : - " + level);
        nextSequnce();
        started=true;
    }
})

//button which the user is clicking 
$(".btn").on("click",function(){
    userChosenColor(this);
    playsound(this.id);
    animatePress(this.id);
    })

//storing the sequence of button clicked by user 
function userChosenColor(event)
{
    var userChosenColour1=$(event).attr("id");
    userClickedPattern.push(userChosenColour1);
    checkAnswer(userClickedPattern.length-1);
}



function nextSequnce()
{
    userClickedPattern=[];
    
    $("#level-title").text("Level " + level);
    var random_number=Math.floor(Math.random()*4);
    var randomChosenColour=random_number;
    gamePattern.push(buttonColours[randomChosenColour]);
    $("h1").text("level :- "+ level);
    level++;
    $('#'+buttonColours[randomChosenColour]).fadeOut(200).fadeIn(200);
    playsound(buttonColours[randomChosenColour]);
}

 //this is nothing but refresh button 
 document.getElementById("refreshButton").addEventListener("click", function() {
    window.location.reload();
});

//playing the sounds for both computer and user input data.
function playsound(event)
{
    var audio10=new Audio("sounds/"+event+".mp3");
    audio10.play();
}

function animatePress(currentColor) {
    
    //2. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
    $("#" + currentColor).addClass("pressed");
  
    //3. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }

// Checking for correct answer
  function checkAnswer(index)
  {
    if(userClickedPattern[index] === gamePattern[index])
    {
        console.log("success");
        
        if(userClickedPattern.length === gamePattern.length)
            {
                setTimeout(function()
                {
                    nextSequnce();
                },1000);
            }
    }
    else
    {
        console.log("Wrong");
        playsound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);
          $("h1").text("Game is over ,\n \n Refresh To Restart. " );
          restart();
    }
        
  }

function restart()
{
  $(document).keypress(function(){
  setTimeout(function () {
    window.location.reload(); 
  }, 200)}
)
    
}