import "../pages/index.css";
import { createCard, handleLike, handleDeleteCard } from "./card";
import { closePopup, openPopup } from "./modal";
import { enableValidation } from "./validation";
import {
  getUserData,
  getInitialCards,
  getNewCard,
  updateProfileInfo,
  showLike,
  hideLike,
  changeProfilePic,
  removeCard,
} from "./api";

const editAvatarButton = document.querySelector(".profile__edit-avatar");
const editAvatarPopup = document.querySelector(".popup_type_avatar");
const avatarForm = editAvatarPopup.querySelector(".popup__form");
const contentContainer = document.querySelector(".places__list");
const profilePicture = document.querySelector(".profile__image");
let userId = "";
let likeCounter = 0;
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

editAvatarButton.addEventListener("click", () => {
  openPopup(editAvatarPopup);
});

avatarForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const avatarUrl = avatarForm.querySelector("#avatar").value;
  const saveButton = formElement.querySelector(".popup__button");
  saveButton.textContent = "Сохранение...";
  changeProfilePic(avatarUrl)
    .then((userData) => {
      console.log("Аватар успешно изменен:", userData);
      saveButton.textContent = "Сохранить";
      closePopup(editAvatarPopup);
    })
    .catch((error) => {
      console.error("Ошибка при смене аватара:", error);
      saveButton.textContent = "Сохранить";
    });
});

function renderCard(createCard) {
  contentContainer.prepend(createCard);
}

export const deletePic = (button, itemId, card) => {
  button.addEventListener("click", () => {
    removeCard(itemId)
      .then(() => {
        card.remove();
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

function renameProfile(user) {
  profileName.textContent = user.name;
  profileDescription.textContent = user.about;
  profilePicture.style.backgroundImage = `url(${user.avatar})`;
}

Promise.all([getInitialCards(), getUserData()])
  .then(([cards, user]) => {
    renameProfile(user);
    userId = user._id;
    cards.forEach((card) => {
      likeCounter = card.likes.length;
      const cardElement = createCard(
        card,
        handleDeleteCard,
        handleLike,
        handlePictureClick,
        userId,
        likeCounter,
        showLike,
        hideLike
      );
      renderCard(cardElement);
    });
  })
  .catch((error) => {
    console.error("Ошибка загрузки информации о пользователе:", error);
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
  const newName = nameInput.value;
  const newAbout = jobInput.value;
  profileName.textContent = newName;
  profileDescription.textContent = newAbout;
  const saveButton = formElement.querySelector(".popup__button");
  saveButton.textContent = "Сохранение...";
  updateProfileInfo(newName, newAbout)
    .then((userData) => {
      console.log("Профиль успешно обновлен:", userData);
      saveButton.textContent = "Сохранить";
    })
    .catch((error) => {
      console.error("Ошибка при обновлении профиля:", error);
      saveButton.textContent = "Сохранить";
    });
  closePopup(editPopup);
}

formElement.addEventListener("submit", updateProfile);

function addNewCard(cardData, userId) {
  const cardElement = createCard(
    cardData,
    handleDeleteCard,
    handleLike,
    handlePictureClick,
    userId,
    likeCounter,
    showLike,
    hideLike
  );
  contentContainer.prepend(cardElement);
}

function handleNewPlaceFormSubmit(evt) {
  evt.preventDefault();

  const newCardData = {
    name: placeNameInput.value,
    link: linkInput.value,
    _id: userId,
  };
  getNewCard(newCardData.name, newCardData.link)
    .then((card) => {
      addNewCard(card, userId);
      closePopup(addPopup);
    })
    .catch((error) => {
      console.error("Ошибка при добавлении новой карточки:", error);
    });
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
