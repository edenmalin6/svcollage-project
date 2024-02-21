import storageService from "./modules/storageService.js";
import api from "./modules/api.js";
window.signUp = async function signUp(event) {
  event.preventDefault();
  const fullName = document.getElementById("full-name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-pass").value;

  const newUser = {
    fullName,
    email,
    password,
  };
  if (password !== confirmPassword)
    return alert("Passwords are not matching. Please make sure they do.");

  try {
    await api.signUp(newUser);
  } catch (e) {
    alert(e);
    throw e;
  }

  window.location.href = "/signIn.html";
};

if (storageService.isUserLoggedIn()) {
  // אם המשתמש מחובר ומזין ביו אר אל את הכתובת להרשמה - תחזיר את המשתמש לעמוד הבית
  window.location.href = "/index.html";
}
