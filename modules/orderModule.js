const { getCollection, toObjectId } = require("./dbModule");
const userModule = require("./userModule");
const productModule = require("./productModule");

const collectionName = "orders";

async function addOrder(userId) {
  const collection = await getCollection(collectionName);
  const cart = await userModule.getCart(userId);
  if (cart.length === 0) {
    throw Error("Cannot make order with empty cart");
  }
  const cartProducts = await Promise.all(cart.map(productModule.getProduct)); // [{name: "cofee", price: 19},{...},{...}]
  const totalPrice = cartProducts.reduce((sum, { price }) => sum + price, 0);
  const roundedTotalPrice = Math.round(totalPrice * 100) / 100;

  await collection.insertOne({ userId, cart, total: roundedTotalPrice });
  await userModule.clearCart(userId);
}
async function getOrders() {
  const collection = await getCollection(collectionName);
  return await collection.find().toArray();
}

module.exports = { getOrders, addOrder };
