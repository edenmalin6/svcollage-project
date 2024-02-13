const users = [{
  fullName: "Daniel K",
  username: "dan",
  email: "dan@is",
  password: 123,
}]
const standbyOrders = []

function signUp(userDetails){
  // send details to server
  users.push(userDetails)

}

function sendOrder(orderDetails){
  standbyOrders.push(orderDetails)
}

module.exports = {signUp , sendOrder}