import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, handleLike, handleDeleteCard } from "./card";
import { closePopup, openPopup } from "./modal";

const contentContainer = document.querySelector(".places__list"); 
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
const imagePopup = document.querySelector(".popup_type_image");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");
const linkInput = newPlaceForm.querySelector(".popup__input_type_url");

function renderCard(createCard) {
  contentContainer.prepend(createCard);
}

initialCards.forEach((card) => {
  renderCard(createCard(card, handleDeleteCard));
});

function handleAddButtonClick() {
  openPopup(addPopup);
  newPlaceForm.reset();
}

function handleEditButtonClick() {
  openPopup(editPopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
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
  const cardElement = createCard(cardData, handleDeleteCard);
  contentContainer.prepend(cardElement);
}

function handleNewPlaceFormSubmit(evt) {
  evt.preventDefault();
  const placeNameInput = newPlaceForm.querySelector(
    ".popup__input_type_card-name"
  );

  const newCardData = {
    name: placeNameInput.value,
    link: linkInput.value,
  };

  addNewCard(newCardData);
  closePopup(addPopup);
}

newPlaceForm.addEventListener("submit", handleNewPlaceFormSubmit);
