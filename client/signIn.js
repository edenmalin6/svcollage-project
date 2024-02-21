import storageService from "./modules/storageService.js";

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


window.signIn = async function(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const signedInUser = {
    email,
    password,
  };
  const response = await fetch("/api/signIn", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signedInUser),
  });

  if (response.status !== 200) {
    const text = await response.text();
    alert(text);
    throw Error(text);
  }

  storageService.setUser(signedInUser);
  window.location.href = "/index.html";
}

if (storageService.isUserLoggedIn()) {
  window.location.href = "/index.html";
}
