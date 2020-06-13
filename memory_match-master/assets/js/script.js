var mainGameCardClick = document.querySelector('#gameCards');
mainGameCardClick.addEventListener('click', handleClick);

var firstCardClicked = null;
var secondCardClicked = null;

var firstCardClasses = null;
var secondCardClasses = null;

var matches = 0;
var maxMatches = 9;

var attempts = 0;
var gamesPlayed = 0;
var accuracy;

var statistic = 0;


function handleClick(event){
  if(event.target.className.indexOf('card-back') === -1){
    return;
  }
  event.target.classList.add('hidden');

 //--- properly store the card references when two cards clicked: ----------
 //1. check if no cards are being clicked then store the firstCardClick
 //2. else: if the firstCardClicked is true; store the secondCardClicked
  if(firstCardClicked === null){
    firstCardClicked = event.target;
    // console.log(firstCardClicked)
    firstCardClasses = firstCardClicked.previousElementSibling.className;
    // console.log(firstCardClasses)
  } else {
    secondCardClicked = event.target;
    secondCardClasses = secondCardClicked.previousElementSibling.className;
    mainGameCardClick.removeEventListener('click', handleClick); // preventing clicks more than 2 cards
    attempts++;
    // console.log("attempts:", attempts)
    displayStats();

    //-------- compare if it has the same class/not -------
    if (firstCardClasses === secondCardClasses) {
      // console.log("the images match");
        mainGameCardClick.addEventListener('click',handleClick);
        firstCardClicked = null;
        secondCardClicked = null;
        matches++;
        // console.log("matches variable:", matches)
        displayStats();

        if(maxMatches === matches){
          // console.log("you have won!")
          document.querySelector(".modal").classList.remove("hidden");

        }

    } else {
      // console.log("the images do not match");
      setTimeout(function () {
        firstCardClicked.classList.remove("hidden");
        secondCardClicked.classList.remove("hidden");
        mainGameCardClick.addEventListener('click', handleClick);
        firstCardClicked = null;
        secondCardClicked = null;
        displayStats();
      }, 1500)
    }
  }
}


function displayStats(){
  document.getElementById("gamesPlayedResult").textContent =  gamesPlayed;
  document.getElementById("attemptsResult").textContent =  attempts;
  document.getElementById("accuracyResult").textContent = calculateAccuracy(attempts,matches);
}

function calculateAccuracy(attempts, matches){
  accuracy = Math.trunc((matches / attempts) * 100) + " %";

  if(matches === 0 && attempts === 0){
    accuracy = 0 + " %";
  }
  return accuracy;
}


function resetGame(){
  document.getElementById("attemptsResult").textContent = statistic;
  document.getElementById("accuracyResult").textContent = statistic + " %";
  gamesPlayed++;
  document.getElementById("gamesPlayedResult").textContent = gamesPlayed;
  attempts = 0;
  matches = 0;
  displayStats();
  resetCards();

  var button = document.querySelector("button");
  var resetModal = document.querySelector(".modal").classList.add("hidden");
}

document.querySelector("button").addEventListener("click", resetGame);

function resetCards(){
  var hiddenCards = document.querySelectorAll(".card-back");
  for(var i = 0; i < hiddenCards.length; i++){
    hiddenCards[i].classList.remove("hidden");
  }
}
