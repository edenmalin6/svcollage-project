"use strict"

const USER_KEY = "signedInUser"
const PROD_KEY = "products"

const storageService = {
  getProducts() {// תביא את הרשימת מוצרים מהדטה
    const products = JSON.parse(localStorage.getItem(PROD_KEY))
    return products || []
  },
  setProducts(todos) {
    localStorage.setItem(TODO_KEY, JSON.stringify(todos))
  },
  getUser() { 
    const user = JSON.parse(localStorage.getItem(USER_KEY))
    return user || null // או שהלוקל סטורג ריק או שיש בו יוזר
    // אם יש יוזר הוא אמור להחזיר את הערך שלו(הואליו)
    //  זה במקום לעשות איף אלס
    // אפשר גם לעשות טרנרי
  },
  setUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  },
  clearAll() {
    localStorage.removeItem(USER_KEY)
    localStorage.removeItem(PROD_KEY)
  },
  toggleDone(todoId) {
    const todos = this.getTodos()
    const updatedTodos = todos.map((todo) => {
      if (todo._id === todoId) {
        todo.isDone = !todo.isDone//  ככה לא משנה מה יש באיז דאן נגיד אם הוא פולס אז נקבל
      }
      return todo
    })
    this.setTodos(updatedTodos)
  },
  addOneProduct(newTodo) {
    const todos = this.getTodos()// מצביע על האובייקט שעליו נמצאת המתודה .מצביע על הטודו כי הוא אובייקט
    todos.push(newTodo)
    this.setTodos(todos)
  },
  removeOneProduct(todoId) {
    const todos = this.getTodos()
    const updatedTodos = todos.filter((todo) => todo._id !== todoId)
    this.setTodos(updatedTodos)
  },
}