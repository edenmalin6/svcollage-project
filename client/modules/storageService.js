
const USER_KEY = "signedInUser";

export default {
  isUserLoggedIn(){
    return this.getUser() !== null
  },
  getUser() {
    const user = JSON.parse(localStorage.getItem(USER_KEY));
    return user || null; // או שהלוקל סטורג ריק או שיש בו יוזר
    // אם יש יוזר הוא אמור להחזיר את הערך שלו(הואליו)
   // null = ריק
    //  זה במקום לעשות איף אלס
    // אפשר גם לעשות טרנרי
  },
  setUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  clearAll() {
    localStorage.removeItem(USER_KEY);
  },
};
