let bodyBlur = document.querySelector(".container");
let headerBlur = document.querySelector(".blurHeader");
let footerBlur = document.querySelector(".blurFooter");
let userInputName = document.getElementById("userInputName");
let errorMessageContent = document.getElementById("errorMessageContent");
let uploadArchiveText = document.getElementById("imagesInput");
const welcomeModal = document.getElementById("welcomeModal");

function setBlur() {
  bodyBlur.setAttribute("id", "blur");
  headerBlur.setAttribute("id", "blur");
  footerBlur.setAttribute("id", "blur");

  bodyBlur.setAttribute("disabled", true);
  headerBlur.setAttribute("disabled", true);
  footerBlur.setAttribute("disabled", true);


  document.body.style.overflow = 'hidden';
}

welcomeModal.style.outline = 'none'

function removeBlur() {
  bodyBlur.removeAttribute("id", "blur");
  headerBlur.removeAttribute("id", "blur");
  footerBlur.removeAttribute("id", "blur");

  bodyBlur.removeAttribute("disabled");
  headerBlur.removeAttribute("disabled");
  footerBlur.removeAttribute("disabled");


  document.body.style.overflow = '';
  document.body.style.height = '';
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
  let userNameStored = localStorage.getItem("userName") || "";

  if (userNameStored.trim() !== "") {
    let welcomeMessage = document.getElementById("welcomeMessage");
    welcomeMessage.textContent = `Seja bem-vindo, ${userNameStored}`;

    let buttonConfirm = document.getElementById("buttonConfirm");
    setBlur();

    welcomeModal.showModal();

    buttonConfirm.addEventListener("click", (event) => {
      event.preventDefault();
      const userNameDisplay = document.querySelector("#userName");
      userNameDisplay.textContent = userNameStored;

      removeBlur();
      welcomeModal.close();
    });
  } else {
    showUserInformationsModal.showModal();
    setBlur();

    let saveUserDataButton = document.getElementById("saveData");

    saveUserDataButton.addEventListener("click", (event) => {
      const inputName = document.querySelector("#userInputName");
      const userName = document.querySelector("#userName");

      const userData = {
        name: inputName.value,
      };

      const { name } = userData;

      userName.textContent = name;

      localStorage.setItem("userName", name);

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
  }
});
