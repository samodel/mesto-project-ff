import "./pages/index.css";
import { openModal, closeModal } from "./components/modal.js";
import { createCard } from "./components/card.js";
import { enableValidation, resetInputErrors } from "./components/validation.js";
import {
  getProfile,
  getCards,
  updateProfile,
  updateAvatar,
  addCard,
  deleteCardFromServer,
  addLike,
  removeLike,
} from "./components/api.js";

// DOM узлы
const content = document.querySelector(".content");
const placesList = content.querySelector(".places__list");
// Формы
const formEditProfile = document.querySelector('[name="edit-profile"]');
const formAddNewPlace = document.querySelector('[name="new-place"]');
const formEditAvatar = document.querySelector('[name="new-avatar"]');
// Кнопки редактирования
const profileEditButton = content.querySelector(".profile__edit-button");
const profileAddButton = content.querySelector(".profile__add-button");
const profileTitle = content.querySelector(".profile__title");
const profileDescription = content.querySelector(".profile__description");
const profileImage = content.querySelector(".profile__image");
// Попапы
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImageTemplate = document.querySelector(".popup_type_image");
const popupConfirmDelete = document.querySelector(".popup_type_delete");
const popupEditAvatar = document.querySelector(".popup_type_avatar");
const popupDeleteButton = popupConfirmDelete.querySelector(".popup__button_confirm");
const newPlaceNameInput = formAddNewPlace.querySelector(
  'input[name="place-name"]'
);
const newPlaceImageInput = formAddNewPlace.querySelector(
  'input[name="place-link"]'
);
const avatarImageInput = formEditAvatar.querySelector(
  'input[name="avatar-link"]'
);
const nameEditInput = formEditProfile.querySelector('input[name="name"]');
const jobEditInput = formEditProfile.querySelector('input[name="description"]');
const popupImage = popupImageTemplate.querySelector(".popup__image");
const popupCaption = popupImageTemplate.querySelector(".popup__caption");
const popupsArray = Array.from(document.querySelectorAll(".popup"));
// Конфигурационные данные для валидации
const configData = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

// Данные о пользователе
let userId;
let cardIdForDelete;

// Подстановка данных профиля и отображение карточек
const promises = [getProfile(), getCards()];

Promise.all(promises)
  .then(([userData, cardData]) => {
    userId = userData._id;

    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;

    cardData.forEach(function (card) {
      const createdCard = createCard(
        card,
        handleLikes,
        createImagePopup,
        handleDelete,
        userId
      );

      createdCard.dataset.id = card._id;

      placesList.append(createdCard);
    });
  })
  .catch((err) => {
    console.log("Ошибка", err);
  });

// Добавление анимации для попапов и слушателей на кнопку закрытия и оверлэй
popupsArray.forEach(function (popup) {
  const eachCloseButton = popup.querySelector(".popup__close");

  popup.classList.add("popup_is-animated");

  eachCloseButton.addEventListener("click", () => closeModal(popup));
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === popup) {
      closeModal(popup);
    }
  });
});

// Функция-обработчик открытия модального окна для редактирования профиля с подстановкой имеющихся данных в поля
function insertCurrentProfileValues() {
  nameEditInput.value = profileTitle.textContent;
  jobEditInput.value = profileDescription.textContent;

  resetInputErrors(formEditProfile, configData);

  openModal(popupEditProfile);
}

// Функция отправки новых данных профиля на сервер и отображение на сайте
function editProfileForm(evt) {
  evt.preventDefault();

  const originalEditSubmitText = evt.submitter.textContent;

  evt.submitter.textContent = "Сохранение...";

  updateProfile(nameEditInput.value, jobEditInput.value)
    .then(() => {
      profileTitle.textContent = nameEditInput.value;
      profileDescription.textContent = jobEditInput.value;

      closeModal(popupEditProfile);
    })
    .catch((err) => {
      evt.submitter.textContent = "Ошибка сохранения";
      console.log("Ошибка", err);
    })
    .finally(() => {
      evt.submitter.textContent = originalEditSubmitText;
    });
}

profileEditButton.addEventListener("click", insertCurrentProfileValues);
formEditProfile.addEventListener("submit", editProfileForm);

// Функция-обработчик открытия попапа для подтверждения удаления  
function handleDelete(cardId) {
  cardIdForDelete = cardId;
  openModal(popupConfirmDelete);
}

// Функция удаления карточки
function confirmDeleteCard(cardId) {
  const originalDeleteButtonText = popupDeleteButton.textContent;

  popupDeleteButton.textContent = "Удаление...";

  deleteCardFromServer(cardId)
    .then((data) => {
      if (data.message === "Пост удалён") {
        const cardElement = document.querySelector(
          `.card[data-id="${cardId}"]`
        );

        if (cardElement) {
          cardElement.remove();
        } else {
          console.log(`Элемент с ID ${cardId} не найден на странице`);
        }
        closeModal(popupConfirmDelete);
      } else {
        popupDeleteButton.textContent = "Ошибка удаления";
        console.log("Ошибка удаления", data);
      }
    })
    .catch((err) => {
      console.log("Ошибка", err);
    })
    .finally(() => {
      popupDeleteButton.textContent = originalDeleteButtonText;
    });
}

// Слушатель кнопки подтверждения удаления
popupDeleteButton.addEventListener('click', function() {
  if (cardIdForDelete) {
      confirmDeleteCard(cardIdForDelete);
  }
});

// Добавление новой карточки
profileAddButton.addEventListener("click", function () {
  resetInputErrors(formAddNewPlace, configData);
  openModal(popupNewCard);
});

function addNewCard(evt) {
  evt.preventDefault();

  const originalAddButtonText = evt.submitter.textContent;

  evt.submitter.textContent = "Добавление карточки...";

  addCard(newPlaceNameInput.value, newPlaceImageInput.value)
    .then((data) => {
      const newCreatedCard = createCard(
        data,
        handleLikes,
        createImagePopup,
        handleDelete,
        userId
      );

      // Устанавливаем идентификатор карточки
      newCreatedCard.dataset.id = data._id;


      placesList.prepend(newCreatedCard);

      formAddNewPlace.reset();
      closeModal(popupNewCard);
    })
    .catch((err) => {
      evt.submitter.textContent = "Ошибка добавления";
      console.log("Ошибка", err);
    })
    .finally(() => {
      evt.submitter.textContent = originalAddButtonText;
    });
}

formAddNewPlace.addEventListener("submit", addNewCard);

// Функция открытия модального окна изображения карточки
function createImagePopup(linkValue, nameValue) {
  popupImage.src = linkValue;
  popupImage.alt = nameValue;
  popupCaption.textContent = nameValue;

  openModal(popupImageTemplate);
}

// Добавление нового аватара
profileImage.addEventListener("click", function () {
  openModal(popupEditAvatar);
});

function editAvatar(evt) {
  evt.preventDefault();

  const avatarUrl = avatarImageInput.value.trim(); // Убираем еще пробелы, если при копировании захвачены

  const originalEditAvatarButtonText = evt.submitter.textContent;

  evt.submitter.textContent = "Обновление...";

  updateAvatar(avatarUrl)
    .then(() => {
      profileImage.style.backgroundImage = `url(${avatarUrl})`;

      formEditAvatar.reset();
      
      closeModal(popupEditAvatar);
    })
    .catch((err) => {
      evt.submitter.textContent = "Ошибка обновления аватара";
      console.log("Ошибка обновления аватара", err);
    })
    .finally(() => {
      evt.submitter.textContent = originalEditAvatarButtonText;
    });

}

formEditAvatar.addEventListener("submit", editAvatar);

// Функция обработчик лайков
function handleLikes(likeButton, cardElement, cardData) {
  const likeCounterElement = cardElement.querySelector(".card__like-counter");
  const cardId = cardData._id;

  const isLiked = cardData.likes.some(function (like) {
    return like._id === userId;
  });

  if (isLiked) {
    removeLike(cardId)
      .then((card) => {
        likeButton.classList.remove("card__like-button_is-active");
        likeCounterElement.textContent = card.likes.length;

        cardData.likes = card.likes;
      })
      .catch((err) => {
        console.log("Ошибка удаления лайка", err);
      });
  } else {
    addLike(cardId)
      .then((card) => {
        likeButton.classList.add("card__like-button_is-active");
        likeCounterElement.textContent = card.likes.length;

        cardData.likes = card.likes;
      })
      .catch((err) => {
        console.log("Ошибка добавления лайка", err);
      });
  }
}

// Вызов валидации
enableValidation(configData);

