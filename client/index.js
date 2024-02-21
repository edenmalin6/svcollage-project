import storageService from "./storageService.js";

window.signOut = function () {
  storageService.clearAll();
  window.location.href = "signIn.html";
};


