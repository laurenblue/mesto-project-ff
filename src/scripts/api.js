const auth = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-8",
  headers: {
    authorization: "6bcb6b14-afdf-4792-a847-c9e0244c6bd2",
    "Content-Type": "application/json",
  },
};

//универсальная проверка и сообщение об ошибке
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

const getUserData = () => {
  return fetch(`${auth.baseUrl}/users/me`, {
    method: "GET",
    headers: auth.headers,
  }).then(checkResponse);
};

const getInitialCards = () => {
  return fetch(`${auth.baseUrl}/cards`, {
    method: "GET",
    headers: auth.headers,
  }).then(checkResponse);
};

const getNewCard = (name, link) => {
  return fetch(`${auth.baseUrl}/cards`, {
    method: "POST",
    headers: auth.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(checkResponse);
};

const updateProfileInfo = () => {
  return fetch(`${auth.baseUrl}/users/me`, {
    method: "PATCH",
    headers: auth.headers,
    body: JSON.stringify({
      name: "Sofia",
      about: "plz work",
    }),
  }).then(checkResponse);
};

export { getUserData, getInitialCards, getNewCard, updateProfileInfo };
