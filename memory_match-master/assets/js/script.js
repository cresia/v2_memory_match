
var mainCardClick = document.querySelector('#gameCards');
mainCardClick.addEventListener('click', handleClick);

function handleClick(event){
  // console.log(event);
  if(event.target.className.indexOf('card-back') === -1){
    return;
  }
  event.target.classList.add('hidden');

}
