let bodyBlur = document.querySelector(".container");
let headerBlur = document.querySelector(".blurHeader");
let footerBlur = document.querySelector(".blurFooter");

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

document.addEventListener("DOMContentLoaded", (event) => {
  let userInformationsForm = document.getElementById("userInformations");
  let showUserInformationsModal = document.getElementById("userData");
  

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
    removeBlur();
    showUserInformationsModal.close();
  });

  userInformationsForm.addEventListener("submit", (event) => {
    event.preventDefault();
  });
});
