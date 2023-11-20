const contentContainer = document.querySelector(".places__list"); // DOM узлы

function addCard(cardData, handleDelete) {
  const template = document.querySelector("#card-template").content;
  const templateElement = template
    .querySelector(".card")
    .cloneNode(true); //шаг 1: клонируем шаблон

  contentContainer.append(templateElement); //шаг 2: выводим карточки на страницу

  templateElement.querySelector(".card__title").textContent = cardData.name;
  templateElement.querySelector(".card__image").src = cardData.link;
  templateElement.querySelector(".card__image").alt = cardData.name; //шаг 3: устанавливаем значение вложенных элементов

  const deleteButton = templateElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", (e) => handleDelete(e.target)); //шаг 4: добавляем обработчик по клику

  return templateElement;
}

function handleDelete(deleteButton) {
  const item = deleteButton.closest(".card");
  item.remove();
} // функция удаления

initialCards.forEach((card) => {
  addCard(card, handleDelete);
});
