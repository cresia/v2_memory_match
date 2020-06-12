
var mainGameCardClick = document.querySelector('#gameCards');
mainGameCardClick.addEventListener('click', handleClick);

var firstCardClicked = null;
var secondCardClicked = null;

var firstCardClasses = null;
var secondCardClasses = null;

function handleClick(event){
  if(event.target.className.indexOf('card-back') === -1){
    return;
  }
  event.target.classList.add('hidden');

 //--- properly stire the card references when tow cards clicked: ----------
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

    //-------- compare if it has the same class/not -------
    if (firstCardClasses === secondCardClasses) {
      // console.log("the images match");
        mainGameCardClick.addEventListener('click',handleClick);
        firstCardClicked = null;
        secondCardClicked = null;
    } else {
      // console.log("the images do not match");
      setTimeout(function () {
        firstCardClicked.classList.remove("hidden");
        secondCardClicked.classList.remove("hidden");
        mainGameCardClick.addEventListener('click', handleClick);
        firstCardClicked = null;
        secondCardClicked = null;
      }, 1500)
    }
  }
}
