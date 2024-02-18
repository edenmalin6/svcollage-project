const { getCollection, toObjectId } = require("./dbModule");
const collectionName = "standByOrders";

async function getUserById(id){
  const collection = await getCollection(collectionName);
  return await collection.findOne({_id: toObjectId(id)});
}