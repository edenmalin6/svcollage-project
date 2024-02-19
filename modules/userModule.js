const { getCollection, toObjectId } = require("./dbModule");
const collectionName = "users";

async function getUserByEmail(email) {
  const collection = await getCollection(collectionName);
  return await collection.findOne({ email });
}

async function createUser(fullName, email, password) {
  const collection = await getCollection(collectionName);
  return await collection.insertOne({ fullName, email, password, cart: [] });
}

async function addProductToCart(userId, productId) {
  const collection = await getCollection(collectionName);
  await collection.updateOne(
    { _id: toObjectId(userId) },
    { $push: { cart: productId } }
  );
}

async function removeProductFromCart(userId, productId) {
  const collection = await getCollection(collectionName);
  await collection.updateOne(
    { _id: toObjectId(userId) },
    { $pull: { cart: productId } }
  );
}
async function clearCart(userId) {
  const collection = await getCollection(collectionName);
  await collection.updateMany(
    { _id: toObjectId(userId) },
    { $push: { cart: { $each: [] }, $slice: 0 } }
  );
}

module.exports = {
  getUserByEmail,
  createUser,
  addProductToCart,
  removeProductFromCart,
  clearCart,
};
