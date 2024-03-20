function openPopup(popup) {
  if (!popup.classList.contains("popup_is-animated")) {
    popup.classList.add("popup_is-animated");
  }
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeByEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  setTimeout(() => {
    popup.classList.remove("popup_is-animated");
  }, 300);
  document.removeEventListener("keydown", closeByEsc); // Удаление обработчика события
}


function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
}

document.querySelectorAll(".popup__close").forEach((closeBtn) => {
  const popup = closeBtn.closest(".popup");
  closeBtn.addEventListener("click", () => {
    closePopup(popup);
  });
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closePopup(evt.target);
    }
  });
});

export { openPopup, closePopup };
