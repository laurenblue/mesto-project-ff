const contentContainer = document.querySelector(".places__list"); // DOM узлы
import '../pages/index.css'; 
import {initialCards} from './cards.js';

function createCard(cardData, handleDelete) {
  const template = document.querySelector("#card-template").content;
  const templateElement = template.querySelector(".card").cloneNode(true); //шаг 1: клонируем шаблон

  templateElement.querySelector(".card__title").textContent = cardData.name;
  templateElement.querySelector(".card__image").src = cardData.link;
  templateElement.querySelector(".card__image").alt = cardData.name; //шаг 3: устанавливаем значение вложенных элементов

  const deleteButton = templateElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", (e) => handleDelete(e.target)); //шаг 4: добавляем обработчик по клику

  return templateElement;
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
