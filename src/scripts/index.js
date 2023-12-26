const contentContainer = document.querySelector(".places__list"); // DOM узлы
import "../pages/index.css";
import { initialCards } from "./cards.js";

function createCard(cardData, handleDelete) {
  const template = document.querySelector("#card-template").content;
  const templateElement = template.querySelector(".card").cloneNode(true); //шаг 1: клонируем шаблон

  templateElement.querySelector(".card__title").textContent = cardData.name;
  templateElement.querySelector(".card__image").src = cardData.link;
  templateElement.querySelector(".card__image").alt = cardData.name; //шаг 3: устанавливаем значение вложенных элементов

  const deleteButton = templateElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", (e) => handleDelete(e.target)); //шаг 4: добавляем обработчик по клику

  const likeButton = templateElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => handleLike(likeButton));

  const picture = templateElement.querySelector(".card__image");
  picture.addEventListener("click", () => handlePictureClick(cardData.link, cardData.name));

  return templateElement;
}

function handlePictureClick(imageUrl, imageDescription) {
  const imagePopup = document.querySelector(".popup_type_image");
  const popupImage = imagePopup.querySelector(".popup__image");
  const popupCaption = imagePopup.querySelector(".popup__caption");

  popupImage.src = imageUrl;
  popupImage.alt = imageDescription;
  popupCaption.textContent = imageDescription;

  openPopup(imagePopup);
}

function handleLike(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

function renderCard(createCard) {
  contentContainer.prepend(createCard);
} //исправлено замечание, добавление на страницу сделано отдельной функцией

function handleDeleteCard(deleteButton) {
  const item = deleteButton.closest(".card");
  item.remove();
} // функция удаления

initialCards.forEach((card) => {
  renderCard(createCard(card, handleDeleteCard));
});

//спринт 6

//задание 3, открытие и закрытие модальных окон
function openPopup(popup) {
  popup.style.display = "flex";
}

function closePopup(popup) {
  popup.style.display = "none";
}

function handleButtonClick(button, popup) {
  button.addEventListener("click", () => {
    openPopup(popup);
    newPlaceForm.reset();
  });
}

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const editPopup = document.querySelector(".popup_type_edit");
const addPopup = document.querySelector(".popup_type_new-card");

handleButtonClick(editButton, editPopup);
handleButtonClick(addButton, addPopup);

document.querySelectorAll(".popup__close").forEach((closeBtn) => {
  closeBtn.addEventListener("click", (evt) => {
    const popup = evt.target.closest(".popup");
    if (popup) {
      closePopup(popup);
    }
  });
});

document.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
});

function closeOnEsc(evt) {
  if (evt.key === "Escape") {
    const openPopups = document.querySelectorAll(".popup");
    openPopups.forEach((popup) => {
      closePopup(popup);
    });
  }
}

document.addEventListener("keydown", closeOnEsc);

//задание 4, редактирование формы 
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const formElement = editPopup.querySelector(".popup__form");

editButton.addEventListener("click", () => {
  openPopup(editPopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}); //делаем заполнение полей значениями со страницы

function updateProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(editPopup);
} //делаем сохранение изменений 

formElement.addEventListener("submit", updateProfile);

//задание 6, добавление карточки
const newPlaceForm = addPopup.querySelector(".popup__form");

function addNewCard(cardData) {
  const cardElement = createCard(cardData, handleDeleteCard);
  contentContainer.prepend(cardElement);
}

function handleNewPlaceFormSubmit(evt) {
  evt.preventDefault();
  const placeNameInput = newPlaceForm.querySelector(".popup__input_type_card-name");
  const linkInput = newPlaceForm.querySelector(".popup__input_type_url");

  const newCardData = {
    name: placeNameInput.value,
    link: linkInput.value,
  };

  addNewCard(newCardData);
  closePopup(addPopup);
}

handleButtonClick(addButton, addPopup);

newPlaceForm.addEventListener("submit", handleNewPlaceFormSubmit);

