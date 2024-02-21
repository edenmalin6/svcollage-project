import storageService from "./modules/storageService.js";
window.signUp = async function (event) {
  event.preventDefault();
  const fullName = document.getElementById("full-name").value;
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-pass").value;

  const newUser = {
    fullName,
    username,
    email,
    password,
  };
  if (password !== confirmPassword)
    return alert("Passwords are not matching. Please make sure they do.");

  const response = await fetch("/api/signUp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });
  if (response.status !== 200) {
    const text = await response.text();
    alert(text);
    throw Error(text);
  }

  window.location.href = "/signIn.html";
};

if (storageService.isUserLoggedIn()) { // אם המשתמש מחובר ומזין ביו אר אל את הכתובת להרשמה - תחזיר את המשתמש לעמוד הבית()
  window.location.href = "/index.html";
}
