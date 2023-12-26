function openPopup(popup) {
  popup.classList.add("popup_is-animated");
  popup.classList.add("popup_is-opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  setTimeout(() => {
    popup.classList.remove("popup_is-animated");
  }, 300);
}

document.querySelectorAll(".popup__close").forEach((closeBtn) => {
  closeBtn.addEventListener("click", (evt) => {
    const popup = evt.target.closest(".popup");
    if (popup) {
      closePopup(popup);
    }
  });
});

document.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
});

function closeOnEsc(evt) {
  if (evt.key === "Escape") {
    const openPopups = document.querySelectorAll(".popup");
    openPopups.forEach((popup) => {
      closePopup(popup);
    });
  }
}

document.addEventListener("keydown", closeOnEsc);

export { openPopup, closePopup };
