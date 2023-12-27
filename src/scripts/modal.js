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
  const popup = closeBtn.closest(".popup");
  closeBtn.addEventListener("click", () => {
    closePopup(popup);
  });
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closePopup(evt.target);
    }
  });
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape" && popup.classList.contains("popup_is-opened")) {
      closePopup(popup);
    }
  });
});

export { openPopup, closePopup };
