function openPopup(popup) {
  popup.classList.add("popup_is-animated");
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeOnEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  setTimeout(() => {
    popup.classList.remove("popup_is-animated");
  }, 300);
  document.removeEventListener("keydown", closeOnEsc);
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

function closeOnEsc(evt) {
  if (evt.key === "Escape") {
    const openPopups = document.querySelectorAll(".popup");
    openPopups.forEach((popup) => {
      closePopup(popup);
    });
  }
}

export { openPopup, closePopup };
