// Функция отображения ошибки
function showInputError(someForm, someInput, errorMessage, settings) {
  const errorElement = someForm.querySelector(`.${someInput.id}-error`);

  someInput.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
}

// Функия, которая прячет ошибки
function hideInputError(someForm, someInput, settings) {
  const errorElement = someForm.querySelector(`.${someInput.id}-error`);

  someInput.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = "";
}

// Функция валидации полей форм
function isValid(someForm, someInput, settings) {
  if (someInput.validity.patternMismatch) {
    someInput.setCustomValidity(someInput.dataset.errorMessage);
  } else {
    someInput.setCustomValidity("");
  }

  if (!someInput.validity.valid) {
    showInputError(someForm, someInput, someInput.validationMessage, settings);
  } else {
    hideInputError(someForm, someInput, settings);
  }
}

// Функция отображения состояний кнопки
function hasInvalidInput(inputList) {
  return inputList.some((someInput) => {
    return !someInput.validity.valid;
  });
}

// Функция переключает состояние кнопки при валидации полей
function toggleButtonState(inputList, someButton, settings) {
  if (hasInvalidInput(inputList)) {
    someButton.disabled = true;

    someButton.classList.add(settings.inactiveButtonClass);
  } else {
    someButton.disabled = false;

    someButton.classList.remove(settings.inactiveButtonClass);
  }
}

// Функция очищает ошибки для повторного открытия попапа
function resetInputErrors(someForm, settings) {
  const inputArray = Array.from(
    someForm.querySelectorAll(settings.inputSelector)
  );
  const submitButton = someForm.querySelector(settings.submitButtonSelector);

  inputArray.forEach(function (someInput) {
    hideInputError(someForm, someInput, settings);
  });

  toggleButtonState(inputList, someButton, settings);
}

// Функция проверки валидности формы
function setEventListeners(someForm, settings) {
  const inputList = Array.from(
    someForm.querySelectorAll(settings.inputSelector)
  );
  const someButton = someForm.querySelector(settings.submitButtonSelector);

  toggleButtonState(inputList, someButton, settings);

  inputList.forEach((someInput) => {
    someInput.addEventListener("input", function () {
      isValid(someForm, someInput, settings);

      toggleButtonState(inputList, someButton, settings);
    });
  });
}

// Функция, включающая валидацию форм
function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach((someForm) => {
    setEventListeners(someForm, settings);
  });
}

export { enableValidation, resetInputErrors };

