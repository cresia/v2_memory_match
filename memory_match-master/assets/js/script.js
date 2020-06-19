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

// var statistic = 0;


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
    return accuracy = 0 + " %";
  }
  return accuracy;
}



function resetGame(){
  gamesPlayed++;
  attempts = 0;
  matches = 0;
  displayStats();
  resetCards();

  //--- or --- using cdn jqery: $("#gameCards").empty();
  var cardContainer = document.getElementById("gameCards");
  cardContainer.innerHTML = "";

  dynamicCard();

  var button = document.querySelector("#playAgain");
  var resetModal = document.querySelector(".modal").classList.add("hidden");
}

document.querySelector("#playAgain").addEventListener("click", resetGame);



function resetCards(){
  var hiddenCards = document.querySelectorAll(".card-back");
  for(var i = 0; i < hiddenCards.length; i++){
    hiddenCards[i].classList.remove("hidden");
  }
}



var shuffle = ["css-logo", "docker-logo", "github-logo", "html-logo", "js-logo", "mysql-logo", "node-logo", "php-logo", "react-logo",
  "css-logo", "docker-logo", "github-logo", "html-logo", "js-logo", "mysql-logo", "node-logo", "php-logo", "react-logo"];

dynamicCard();

function shufflingCards(){
  var temporary, randomIndex;
  var currentIndex = shuffle.length-1;

  for(var i = 0; i < currentIndex; i++){
    randomIndex = Math.floor(Math.random() * currentIndex);

    //------------ swapping cards ----------------
    temporary = shuffle[currentIndex];
    shuffle[currentIndex] = shuffle[randomIndex];
    shuffle[randomIndex] = temporary;
  }
  // console.log(shuffle)
  // return shuffle;
}


function dynamicCard(){
  var mainCard = document.getElementById("gameCards");
  shufflingCards();

  for(var i = 0; i < shuffle.length; i++){
    var cardBack = document.createElement("div")
    cardBack.classList.add("card-back");

    var cardFront = document.createElement("div");
    cardFront.classList.add("card-front");
    cardFront.classList.add(shuffle[i]);

    var cardFrontBack = document.createElement("div");
    cardFrontBack.classList.add('card')
    cardFrontBack.classList.add("col-2");

    cardFrontBack.append(cardFront, cardBack);
    mainCard.appendChild(cardFrontBack);
  }

}

document.querySelector("#reset").addEventListener("click", resetGame);
