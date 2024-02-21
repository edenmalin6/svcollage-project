import storageService from "./modules/storageService.js";
import api from "./modules/api.js";
// const togglePassword = document.querySelector(".togglePassword");
// const password = document.getElementById("password");
// const confirmPassword = document.getElementById("confirm-pass");
// togglePassword.onclick = function () {
//   if (password.type == "password") {
//     password.type = "text";
//     this.classList.add("bi-eye");
//   } else {
//     password.type = "password";
//     this.classList.remove("bi-eye");
//   }
// };

window.signIn = async function (event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const signedInUser = {
    email,
    password,
  };
  try {
    signedInUser._id = await api.signIn(signedInUser);
  } catch (e) {
    alert(e);
    throw e;
  }

  storageService.setUser(signedInUser);
  window.location.href = "/index.html";
};

if (storageService.isUserLoggedIn()) {
  window.location.href = "/index.html"; // אם היזור מנסה לגשת לעמוד התחברות מתוך היו אר אז תשאיר אותו מחובר
}
