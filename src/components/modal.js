export { closeModal, openModal };

// Открытие модального окна
function openModal(popup) {
  popup.classList.add("popup_is-opened");

  document.addEventListener("keydown", closeByEscape);
}

// Закрытие модального окна по кнопке
function closeModal(popup) {
  popup.classList.remove("popup_is-opened");

  document.removeEventListener("keydown", closeByEscape);
}

// Закрытие модального окна по escape
function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closeModal(popup);
  }
}