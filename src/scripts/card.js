function createCard(
  cardData,
  handleDeleteCard,
  handleLike,
  handlePictureClick,
  userId,
  likeCounter,
  showLike,
  hideLike,
  removeCard
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
    deleteButton.addEventListener("click", () => handleDeleteCard(deleteButton, itemId, templateElement, removeCard));
  }

  const like = templateElement.querySelector(".card__like-button");

  const likeButton = () => {
    const previousState = like.classList.contains("card__like-button_is-active");
    handleLike(like);
    if (previousState !== like.classList.contains("card__like-button_is-active")) {
      if (previousState) {
        hideLike(cardData._id)
          .then((res) => {
            likesContainer.textContent = res.likes.length;
          })
          .catch((err) => {
            console.error(err);
            handleLike(like); 
          });
      } else {
        showLike(cardData._id)
          .then((res) => {
            likesContainer.textContent = res.likes.length;
          })
          .catch((err) => {
            console.error(err);
            handleLike(like)
          });
      }
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

function handleDeleteCard(button, itemId, templateElement, removeCard) {
  button.addEventListener("click", () => {
    removeCard(itemId)
      .then(() => {
        templateElement.remove();
      })
      .catch((err) => {
        console.log(err);
      });
  });
}



export { createCard, handleDeleteCard, handleLike };
