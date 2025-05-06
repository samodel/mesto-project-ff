export { createCard, setLike, deleteCard };

// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки

function createCard(item, setLike, createImagePopup, removeCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardTitle.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;

  deleteButton.addEventListener("click", function () {
    removeCard(cardElement);
  });

  likeButton.addEventListener("click", function () {
    setLike(likeButton);
  });

  cardImage.addEventListener("click", function () {
    createImagePopup(cardImage.src, cardImage.alt);
  });

  return cardElement;
}

// Функция удаления карточки
const deleteCard = (cardElement) => cardElement.remove();

// Ставим и снимаем лайк
function setLike(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}


