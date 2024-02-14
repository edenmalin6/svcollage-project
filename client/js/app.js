const api = require("./api.js")

const togglePassword = document.getElementById("togglePassword");
const password = document.getElementById("password");

togglePassword.onclick = function () {
  if (password.type == "password") {
    password.type = "text";
    this.classList.toggle("bi-eye");
  } else {
    password.type = "password";
  }
};

function signin(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const signedInUser = {
    _id: Date.now().toString(),
    email,
    password,
  };
  // put here fetch to the post req 

  // console.log(signedInUser);

  //localStorage.setItem("signedInUser", JSON.stringify(signedInUser))

  storageService.setUser(signedInUser);
  window.location.href = "/home.html";
}

function signout() {
  storageService.clearAll();
}

function signup(event) {
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
    confirmPassword,
  };
  api.signUp(newUser)
  window.location.href = "/signIn.html";
}

function init() {
  // הפונקציה תופעל כל פעם שיוזר מתחבר. בעזרתה נבדוק האם היוזר קיים או לא
  const user = storageService.getUser();
  if (!user) {
    window.location.href = "signIn.html";
  }
}
