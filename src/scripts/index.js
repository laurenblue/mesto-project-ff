import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCard } from "./card";
import { closePopup, openPopup } from "./modal";

const contentContainer = document.querySelector(".places__list"); // DOM узлы
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const editPopup = document.querySelector(".popup_type_edit");
const addPopup = document.querySelector(".popup_type_new-card");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const formElement = editPopup.querySelector(".popup__form");
const newPlaceForm = addPopup.querySelector(".popup__form");

function renderCard(createCard) {
  contentContainer.prepend(createCard);
}

function handleDeleteCard(deleteButton) {
  const item = deleteButton.closest(".card");
  item.remove();
}

initialCards.forEach((card) => {
  renderCard(createCard(card, handleDeleteCard));
});

function handleButtonClick(button, popup) {
  button.addEventListener("click", () => {
    openPopup(popup);
    newPlaceForm.reset();
  });
}

handleButtonClick(editButton, editPopup);
handleButtonClick(addButton, addPopup);

editButton.addEventListener("click", () => {
  openPopup(editPopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
});

function updateProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(editPopup);
}

formElement.addEventListener("submit", updateProfile);

function addNewCard(cardData) {
  const cardElement = createCard(cardData, handleDeleteCard);
  contentContainer.prepend(cardElement);
}

function handleNewPlaceFormSubmit(evt) {
  evt.preventDefault();
  const placeNameInput = newPlaceForm.querySelector(
    ".popup__input_type_card-name"
  );
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
