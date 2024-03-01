let bodyBlur = document.querySelector(".container");
let headerBlur = document.querySelector(".blurHeader");
let footerBlur = document.querySelector(".blurFooter");
let userInputName = document.getElementById("userInputName");
let errorMessageContent = document.getElementById("errorMessageContent");
let uploadArchiveText = document.getElementById("imagesInput");

function setBlur() {
  bodyBlur.setAttribute("id", "blur");
  headerBlur.setAttribute("id", "blur");
  footerBlur.setAttribute("id", "blur");
}

function removeBlur() {
  bodyBlur.removeAttribute("id", "blur");
  headerBlur.removeAttribute("id", "blur");
  footerBlur.removeAttribute("id", "blur");
}

userInputName.addEventListener("focus", () => {
  userInputName.style.borderTop = "none";
});

userInputName.addEventListener("blur", () => {
  userInputName.style.borderTop = "solid";
});

userInputName.addEventListener("focusout", () => {
  if (userInputName.value.length > 0) {
    userInputName.style.borderTop = "none";
  }
});

document
  .getElementById("userInputName")
  .addEventListener("input", function (event) {
    let input = event.target;
    input.value = input.value.replace(/(^|\s)\S/g, function (char) {
      return char.toUpperCase();
    });
  });
document.addEventListener("DOMContentLoaded", (event) => {
  let userInformationsForm = document.getElementById("userInformations");
  let showUserInformationsModal = document.getElementById("userData");
  let userAvatarImage = document.querySelector(".userAvatar");
  showUserInformationsModal.showModal();
  setBlur();

  let saveUserDataButton = document.getElementById("saveData");

  saveUserDataButton.addEventListener("click", (event) => {
    event.preventDefault();

    const inputName = document.querySelector("#userInputName");
    const userName = document.querySelector("#userName");
    const inputImage = document.getElementById("imagesInput");

    const userData = {
      name: inputName.value,
    };

    const { name } = userData;

    userName.textContent = name;

    if (inputName.value.length === 0) {
      let ErrorMessage = document.createElement("p");
      ErrorMessage.setAttribute("id", "errorMessage");

      ErrorMessage.textContent = "Digite um nome válido!";
      if (
        !errorMessageContent.hasChildNodes(ErrorMessage) &&
        inputName.value.length === 0
      ) {
        errorMessageContent.appendChild(ErrorMessage);
        inputName.style.borderColor = "#ff0000";
      }

      setTimeout(() => {
        errorMessageContent.removeChild(ErrorMessage);
        inputName.style.borderColor = "";
      }, 1500);
    }
    if (inputName.value !== "") {
      inputName.style.borderColor = "";

      removeBlur();
      showUserInformationsModal.close();
    }
  });

  userInformationsForm.addEventListener("submit", (event) => {
    event.preventDefault();
  });
});

function previewImage(input) {
  const file = input.files[0];
  const imagePreview = document.getElementById("placeholderImage");

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const result = e.target.result;
      imagePreview.src = result;
    };

    reader.readAsDataURL(file);
  }
}

document.getElementById("imagesInput").addEventListener("change", function () {
  previewImage(this);
});
