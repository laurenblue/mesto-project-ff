function openPopup(popup) {
  popup.style.display = "flex";
}

function closePopup(popup) {
  popup.style.display = "none";
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
