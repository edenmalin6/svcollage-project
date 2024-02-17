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

async function signin(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const signedInUser = {
    _id: Date.now().toString(),
    email,
    password,
  };
  const response = await fetch("/api/signIn", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      body: JSON.stringify(signedInUser),
    },
  });
  if (response.status === 404)
    return alert(
      "User not found. Please make sure you already have an account."
    );
  else if (response.status === 400)
    return alert(
      "Password is incorrect. Please make you you entered the right password."
    );
  else if (response.status !== 200) throw Error(await response.text());

  // console.log(signedInUser);

  //localStorage.setItem("signedInUser", JSON.stringify(signedInUser))

  storageService.setUser(signedInUser);
  window.location.href = "/home.html";
}

async function signout() {
  storageService.clearAll();
}

async function signup(event) {
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
      body: JSON.stringify(newUser),
    },
  });
  if (response.status !== 200) throw Error(await response.text());

  window.location.href = "/signIn.html";
}

function init() {
  // הפונקציה תופעל כל פעם שיוזר מתחבר. בעזרתה נבדוק האם היוזר קיים או לא
  const user = storageService.getUser();
  if (!user) {
    window.location.href = "signIn.html";
  }
}

addToCart();
buyNow();
