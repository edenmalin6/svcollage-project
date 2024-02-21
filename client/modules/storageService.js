
const USER_KEY = "signedInUser";
const PROD_KEY = "products";

export default {
  getProducts() {
    // תביא את הרשימת מוצרים מהדטה
    const products = JSON.parse(localStorage.getItem(PROD_KEY));
    return products || [];
  },
  setProducts(products) {
    localStorage.setItem(TODO_KEY, JSON.stringify(products));
  },
  addOneProduct(newProduct) {
    const products = this.getProducts();
    products.push(newProduct);
    this.setProducts(products);
  },
  removeOneProduct(productId) {
    const products = this.getProducts();
    const updatedProducts = products.filter(
      (product) => product._id !== productId
    );
    this.setProducts(updatedProducts);
  },
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
    localStorage.removeItem(PROD_KEY);
  },
  toggleDone(productId) {
    const products = this.getProducts();
    const updatedProducts = products.map((product) => {
      if (product._id === productId) {
        product.wasAdded = !product.wasAdded; //  ככה לא משנה מה יש באיז דאן נגיד אם הוא פולס אז נקבל
      }
      return product;
    });
    this.setTodos(updatedTodos);
  },
};
