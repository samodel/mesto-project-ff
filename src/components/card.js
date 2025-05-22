export { createCard };

// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
function createCard(cardData, handleLikes, createImagePopup, handleDelete, userId) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeCounter = cardElement.querySelector(".card__like-counter");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  likeCounter.textContent = cardData.likes.length;

  if (cardData.owner._id === userId) {
    deleteButton.style.opacity = 1;
  } else {
    deleteButton.style.opacity = 0;
  }

  checkIsLiked(cardData, likeButton, userId);

  deleteButton.addEventListener("click", function () {
    handleDelete(cardElement.dataset.id);
  });

  likeButton.addEventListener("click", function () {
    handleLikes(likeButton, cardElement, cardData);
  });

  cardImage.addEventListener("click", function () {
    createImagePopup(cardImage.src, cardImage.alt);
  });

  return cardElement;
}

// Функция проверки на наличие лайков
function checkIsLiked(cardData, likeButton, userId) {
  if (cardData.likes.some((like) => like._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }
}


