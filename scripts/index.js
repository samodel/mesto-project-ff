
const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');

function createCard (cardData, deleteCard){
  const cardClone = cardTemplate.querySelector('.card').cloneNode(true);
  const image = cardClone.querySelector('.card__image');
  cardClone.querySelector('.card__title').textContent = cardData.name;
  image.src = cardData.link;
  image.alt = cardData.name;

  const cardDeleteButton = cardClone.querySelector('.card__delete-button');
  cardDeleteButton.addEventListener('click', () => {deleteCard(cardClone);});

  return cardClone;
}

function deleteCard (cardData) {
  cardData.remove();
}

initialCards.forEach(cardData =>{
  cardsContainer.append(createCard(cardData, deleteCard));
});






