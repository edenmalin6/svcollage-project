const { getCollection, toObjectId } = require("./dbModule");
const collectionName = "users";

async function getUserByEmail(email){
  const collection = await getCollection(collectionName);
  return await collection.findOne({email});
}

// async function getUser(id) {
//   const collection = await getCollection(collectionName);
//   return await collection.findOne({ _id: toObjectId(id)});
// }

async function createUser(fullName, email, password) {
  const collection = await getCollection(collectionName);
  return await collection.insertOne({ fullName, email, password, cart:[] });
}

async function updateCartById(id, updatedCart){
  const collection = await getCollection(collectionName);
  await collection.updateOne({_id: toObjectId(id)}, {$set: {cart: updatedCart}})
}

module.exports = { getUserByEmail, createUser };
