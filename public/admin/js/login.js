const userName = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");
const form = document.querySelector(".container form");

const showError = (input, message) => {
  // const parent = input.parentNode;
  const parent = input.parentElement;
  const small = parent.querySelector("small");
  parent.classList.add("error");
  small.innerText = message;
};
const showSussces = (input) => {
  // const parent = input.parentNode;
  const parent = input.parentElement;
  const small = parent.querySelector("small");
  parent.classList.remove("error");
  small.innerText = "";
};

const checkError = (listInput) => {
  let isEmptyError = false;
  listInput.forEach((input) => {
    input.value = input.value.trim();
    isEmptyError = true;
    if (!input.value) {
      isEmptyError = true;
      showError(input, "Không được để trống !");
    } else {
      showSussces(input);
    }
  });
  return isEmptyError;
};

const checkEmail = (input) => {
  if (input.value) {
    const regexEmail =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    input.value = input.value.trim();

    let isEmailError = !regexEmail.test(input.value);
    if (regexEmail.test(input.value)) {
      showSussces();
    } else {
      showError(input, "Email sai cú pháp!");
    }
    return isEmailError;
  }
};
const checkLengthError = (input, min, max) => {
  if (input.value) {
    input.value = input.value.trim();
    if (input.value.length < min) {
      showError(input, `Phải có ít nhât ${min} ký tự !`);
      return true;
    }

    if (input.value.length > max) {
      showError(input, `Không được vượt quá ${max} ký tự!`);
      return true;
    }

    showSussces(input);
    return false;
  }
};
const checkPassword = (passWord, confirmPassword) => {
  if (passWord.value && confirmPassword.value) {
    if (passWord.value != confirmPassword.value) {
      showError(confirmPassword, "Mật khẩu không trùng khớp!");
      return true;
    }
  }
  return false;
};
form.addEventListener("submit", (event) => {
  event.preventDefault();
  checkError([userName, email, password, confirmPassword]);
  checkLengthError(userName, 5, 20);
  checkLengthError(password, 10, 20);
  checkPassword(password, confirmPassword);
  checkEmail(email);
  console.log("ok");
});
