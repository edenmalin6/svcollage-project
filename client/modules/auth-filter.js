import storageService from "./storageService.js";

if (!storageService.isUserLoggedIn()) {
  window.location.href = "/signIn.html";
} 
// בדיקת אוטנטיקציה 
//  כדי שלא יהיה אפשר להכנס לשום עמוד באפליקציה שלנו מתוך היו אר אל בדפדפן
//  זא שאם אין לך משתמש לא יעבוד לך להכניס את הכתובת של העמוד - תפריט בדפדפן. זה תמיד יוביל אותך לעמוד כניסה