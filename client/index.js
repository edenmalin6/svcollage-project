import storageService from "./modules/storageService.js";

window.signOut = function signOut() {
  storageService.clearAll();
  window.location.href = "signIn.html";
};


