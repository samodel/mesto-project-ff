import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { openModal, closeModal } from "./components/modal.js";
import { createCard, setLike, deleteCard } from "./components/card.js";

// DOM узлы
const content = document.querySelector(".content");
const placesList = content.querySelector(".places__list");

const formEditProfile = document.querySelector('[name="edit-profile"]');
const formAddNewPlace = document.querySelector('[name="new-place"]');

const profileEditButton = content.querySelector(".profile__edit-button");
const profileAddButton = content.querySelector(".profile__add-button");
const profileTitle = content.querySelector(".profile__title");
const profileDescription = content.querySelector(".profile__description");

const popupEditProfile = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImageTemplate = document.querySelector(".popup_type_image");

const newPlaceNameInput = formAddNewPlace.querySelector(
  'input[name="place-name"]'
);
const newPlaceImageInput = formAddNewPlace.querySelector('input[name="link"]');

const nameEditInput = formEditProfile.querySelector('input[name="name"]');
const jobEditInput = formEditProfile.querySelector('input[name="description"]');

const popupImage = popupImageTemplate.querySelector(".popup__image");
const popupCaption = popupImageTemplate.querySelector(".popup__caption");

const popupArray = Array.from(document.querySelectorAll(".popup"));

// Вывести карточки на страницу
initialCards.forEach(function (cardElement) {
  const createdCard = createCard(
    cardElement,
    setLike,
    createImagePopup,
    deleteCard
  );

  placesList.append(createdCard);
});

// Добавление анимации для попапов и слушателей на кнопку закрытия и оверлэй
popupArray.forEach(function (popup) {
  const eachCloseButton = popup.querySelector(".popup__close");

  popup.classList.add("popup_is-animated");

  eachCloseButton.addEventListener("click", () => closeModal(popup)); 
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === popup) {
     closeModal(popup);
   }
 }); 
});

// Редактирование имени и рода занятий
// Функция-обработчик открытия модального окна для редактирования профиля
function insertCurrentProfileValues() {
  nameEditInput.value = profileTitle.textContent;
  jobEditInput.value = profileDescription.textContent;

  openModal(popupEditProfile);
}

function editProfileForm(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameEditInput.value;
  profileDescription.textContent = jobEditInput.value;

  closeModal(popupEditProfile);
}

profileEditButton.addEventListener("click", insertCurrentProfileValues);
formEditProfile.addEventListener("submit", editProfileForm);

// Добавление новой карточки
profileAddButton.addEventListener("click", function () {
  openModal(popupNewCard);
});

function addNewCard(evt) {
  evt.preventDefault();

  const placeName = newPlaceNameInput.value;
  const placeLink = newPlaceImageInput.value;
  const newCardsArray = {
    name: placeName,
    link: placeLink,
  };
  const newCreatedCard = createCard(
    newCardsArray,
    setLike,
    createImagePopup,
    deleteCard
  );

  placesList.prepend(newCreatedCard);

  formAddNewPlace.reset();

  closeModal(popupNewCard);
}

formAddNewPlace.addEventListener("submit", addNewCard);

// Функция добавления картинки и подписи в попап
// Функция открытия модального окна изображения карточки
function createImagePopup(linkValue, nameValue) {
  popupImage.src = linkValue;
  popupImage.alt = nameValue;
  popupCaption.textContent = nameValue;

  openModal(popupImageTemplate);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 


