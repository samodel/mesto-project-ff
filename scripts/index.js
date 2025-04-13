// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// // @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
  function addCard(item) {
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
	cardElement.querySelector('.card__image').src = item.link;
	cardElement.querySelector('.card__title').textContent = item.name;

	const deleteButton = cardElement.querySelector('.card__delete-button');
	deleteButton.addEventListener('click', () => deleteCard(cardElement));
	return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// @todo: Вывести карточки на страницу
function addCardsToList (cardsArr) {
	const cards = cardsArr.map(addCard);
	cards.forEach(card => placesList.append(card));
}

addCardsToList(initialCards);