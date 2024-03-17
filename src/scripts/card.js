function createCard(cardData, handleDelete, handleLike, handlePictureClick) {
  const template = document.querySelector("#card-template").content;
  const templateElement = template.querySelector(".card").cloneNode(true);
  const picture = templateElement.querySelector(".card__image");
  templateElement.querySelector(".card__title").textContent = cardData.name;
  picture.src = cardData.link;
  picture.alt = cardData.name;

  const deleteButton = templateElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => handleDelete(templateElement));

  const likeButton = templateElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => handleLike(likeButton));

  picture.addEventListener("click", () =>
    handlePictureClick(cardData.link, cardData.name)
  );

  return templateElement;
}

function handleLike(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

function handleDeleteCard(item) {
  item.remove();
}

export { createCard, handleDeleteCard, handleLike };