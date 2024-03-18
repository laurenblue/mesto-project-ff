import { deletePic } from ".";

function createCard(
  cardData,
  handleDelete,
  handleLike,
  handlePictureClick,
  userId,
  likeCounter,
  showLike,
  hideLike
) {
  const template = document.querySelector("#card-template").content;
  const templateElement = template.querySelector(".card").cloneNode(true);
  const picture = templateElement.querySelector(".card__image");
  templateElement.querySelector(".card__title").textContent = cardData.name;
  const likesContainer = templateElement.querySelector(".likes");
  picture.src = cardData.link;
  picture.alt = cardData.name;
  const itemId = cardData._id;
  likesContainer.textContent = likeCounter;
  const deleteButton = templateElement.querySelector(".card__delete-button");
  if (cardData.owner._id === userId) {
    deleteButton.classList.add("card__delete-button_active");
  }
  deletePic(deleteButton, itemId, templateElement);

  const like = templateElement.querySelector(".card__like-button");

  const likeButton = () => {
    if (like.classList.contains("card__like-button_is-active")) {
      handleLike(like);
      hideLike(cardData._id).then((res) => {
        likesContainer.textContent = res.likes.length;
      });
    } else {
      handleLike(like);
      showLike(cardData._id).then((res) => {
        likesContainer.textContent = res.likes.length;
      });
    }
  };

  Array.from(cardData.likes).forEach((item) => {
    if (item._id === userId) {
      handleLike(like);
    }
  });
  like.addEventListener("click", likeButton);
  picture.addEventListener("click", () =>
    handlePictureClick(cardData.link, cardData.name)
  );

  return templateElement;
}

function handleLike(like) {
  like.classList.toggle("card__like-button_is-active");
}

function handleDeleteCard(item) {
  item.remove();
}

export { createCard, handleDeleteCard, handleLike };
