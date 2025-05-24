// Данные для работы с сервером
const SERVER_URL = "https://nomoreparties.co/v1/wff-cohort-38";
const TOKEN = "f9ca6a53-f7e2-4546-bfa9-36d832e0223d";

// Функция обработчик запроса
const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

// Функция проверки ответа
function request(endpoint, options) {
    const fullUrl = SERVER_URL + '/' + endpoint;

    return fetch(fullUrl, options).then(handleResponse);
  }

// Получение данных профиля
const getProfile = () => {
  return request(`users/me`, {
    method: "GET",
    headers: {
      authorization: TOKEN,
    },
  })
};

// Получение карточек
const getCards = () => {
  return request(`cards`, {
    method: "GET",
    headers: {
      authorization: TOKEN,
    },
  })
};

// Обновление профиля
const updateProfile = (name, about) => {
  return request(`users/me`, {
    method: "PATCH",
    headers: {
      authorization: TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, about }),
  })
};

// Обновление аватарки
const updateAvatar = (avatarUrl) => {
  return request(`users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  })
};

// Добавление новой карточки
const addCard = (name, link) => {
  return request(`cards`, {
    method: "POST",
    headers: {
      authorization: TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, link }),
  })
};

// Удаление карточки
const deleteCardFromServer = (cardId) => {
  return request(`cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: TOKEN,
    },
  })
};

// Добавление лайка
const addLike = (cardId) => {
  return request(`cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: TOKEN,
    },
  })
};

// Удаление лайка
const removeLike = (cardId) => {
  return request(`cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: TOKEN,
    },
  })
};

export {
  getProfile,
  getCards,
  updateProfile,
  updateAvatar,
  addCard,
  deleteCardFromServer,
  addLike,
  removeLike,
};