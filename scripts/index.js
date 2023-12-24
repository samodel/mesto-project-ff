
const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');

function addCard (item){
  const cardClone = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardClone.querySelector('.card__image');
  cardClone.querySelector('.card__title').textContent = item.name;
  deleteButton.src = item.link;
  deleteButton.alt = item.name;

  const cardDeleteButton = cardClone.querySelector('.card__delete-button');
  cardDeleteButton.addEventListener('click', () => {deleteCard(cardClone);});

  return cardClone;
}

function deleteCard (item) {
  item.remove();
}

initialCards.forEach(item =>{
  cardList.append(addCard(item, deleteCard));
});






