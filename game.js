var buttonColor= ["green", "red" , "yellow" , "blue"];
var gameSequence = [];
var userClick = [];
var started = false;
// variable that stores level count
var level = 0;
// when a user click any key then if the game is not started then it make the level 1 and then call to nextSequence function to getting the next gameSequence
//then the value of start make it true
$(document).on("keypress", function(){
  if(!started){
    $("#level-title").text("Level"+level);
    nextSequence();
    started= true;
  }
});

//function that is responsible for click event

var clicked = $("div[type=button]").on("click", function(){
   var choosenColor = $(this).attr("id");
   var count= 0;
   for( var i= 0 ; i<4 ; i++){
   if(choosenColor == buttonColor[i])
   count= i;
 }
   userClick.push(choosenColor);
  addingMaterial(count);
  checkAnswer(userClick.length-1);
});

// function that will call next random sequence
function nextSequence(){
  userClick = [];
  level++;
  $("#level-title").text("Level "+level);
  var randomNumber=  Math.floor(Math.random()*4);
  var randomChossenColor = buttonColor[randomNumber];
  addingMaterial(randomNumber);
  gameSequence.push(randomChossenColor);
}

function checkAnswer(currentLevel){

  if (gameSequence[currentLevel] === userClick[currentLevel]){
    if( userClick.length === gameSequence.length){
      setTimeout(function(){nextSequence();},1000);
    }

}
  else{
  var audio = new Audio ("sounds/wrong.mp3");
  audio.play();
    $("body").addClass("game-over");
    $("#level-title").text("GameOver,press Any Key to Restart");

    setTimeout(function(){
      $("body").removeClass("game-over");},200)
    startOver();
  }
}


// still dontKnow how i made this
function anyKey(key){
$("#"+buttonColor[key]).on("click" , function(){
addingMaterial(key);
})
}

// this function will add sound and also all shadow effect in the action while clicking the button and also when there is a random click of button
function addingMaterial(key){
  $("#"+ buttonColor[key]).addClass("pressed");
  setTimeout(function(){ $("#"+buttonColor[key]).removeClass("pressed") , 1000});
  var audio = new Audio("sounds/"+buttonColor[key]+".mp3");
  audio.play();
}


// function that start the new game which will make the started false and gamepattren array length make to zero
function startOver(){
  level = 0 ;
  gameSequence = [];
  started =false;
}


// when any key is pressed then the value of started is checked , which is a boolean function , if the started is false then the value h1 is changed and nextSequence function is called
// then after calling the nextSequence , userclick array is make empty and value of level is increased and make the h1 to level increased .
// then after a random number is genetrated and a random color is generated correspoonding to random number, after that we fill this random color in the array of gameSequence.
// it will also add sound and animation to buttonColor
//then click event will happen and user will give our respose which is added to userClick array
// check answer is called
// the value of user click and the value of last element of gameSequence. if it is matched then it will check that the length of both the arrays are same or not . if they are same then
// then setTimeout will call the function nextSequence() after 1000 sec;
// if the elements in both the arraysa are not same then it will make a wrong statement sound and also make h1 to game-over
