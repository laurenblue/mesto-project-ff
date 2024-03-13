import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, handleLike, handleDeleteCard } from "./card";
import { closePopup, openPopup } from "./modal";
import { clearValidation, enableValidation } from "./validation";

const contentContainer = document.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const editPopup = document.querySelector(".popup_type_edit");
const addPopup = document.querySelector(".popup_type_new-card");
export const nameInput = document.querySelector(".popup__input_type_name");
export const jobInput = document.querySelector(
  ".popup__input_type_description"
);
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const formElement = editPopup.querySelector(".popup__form");
const newPlaceForm = addPopup.querySelector(".popup__form");
const imagePopup = document.querySelector(".popup_type_image");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");
const linkInput = newPlaceForm.querySelector(".popup__input_type_url");
const placeNameInput = newPlaceForm.querySelector(
  ".popup__input_type_card-name"
);

function renderCard(createCard) {
  contentContainer.prepend(createCard);
}

initialCards.forEach((card) => {
  const cardElement = createCard(
    card,
    handleDeleteCard,
    handleLike,
    handlePictureClick
  );
  renderCard(cardElement);
});

function handleAddButtonClick() {
  openPopup(addPopup);
  newPlaceForm.reset();
  enableValidation(validationConfig);
}

function handleEditButtonClick() {
  openPopup(editPopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  enableValidation(validationConfig);
}

addButton.addEventListener("click", handleAddButtonClick);
editButton.addEventListener("click", handleEditButtonClick);

export function handlePictureClick(imageUrl, imageDescription) {
  popupImage.src = imageUrl;
  popupImage.alt = imageDescription;
  popupCaption.textContent = imageDescription;

  openPopup(imagePopup);
}

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
  const cardElement = createCard(
    cardData,
    handleDeleteCard,
    handleLike,
    handlePictureClick
  );
  contentContainer.prepend(cardElement);
}

function handleNewPlaceFormSubmit(evt) {
  evt.preventDefault();

  const newCardData = {
    name: placeNameInput.value,
    link: linkInput.value,
  };

  addNewCard(newCardData);
  closePopup(addPopup);
}

newPlaceForm.addEventListener("submit", handleNewPlaceFormSubmit);

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_visible",
};
