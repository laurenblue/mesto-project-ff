import { openPopup } from "./modal";

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
  picture.addEventListener("click", () =>
    handlePictureClick(cardData.link, cardData.name)
  );

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

export { createCard };
