// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// // @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
const createCard = (item, removeCard) => {
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
	cardElement.querySelector('.card__image').src = item.link;
	cardElement.querySelector('.card__image').alt = `Фотография места: ${item.name}`;
	cardElement.querySelector('.card__title').textContent = item.name;

	const deleteButton = cardElement.querySelector('.card__delete-button');
	deleteButton.addEventListener('click', () => removeCard(cardElement));
	return cardElement;
}

// @todo: Функция удаления карточки
const deleteCard = (cardElement) => cardElement.remove();

// @todo: Вывести карточки на страницу
initialCards.forEach(item => {
  const cardElement = createCard(item, deleteCard);
  placesList.append(cardElement);
});