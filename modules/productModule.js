const { getCollection, toObjectId } = require("./dbModule");
const collectionName = "products";

async function getAllProducts({ sort, search }) {
  if (!sort) {
    sort = "name";// אם לא בחרתי לפי שם ומחיר הברירת מחדל תהיה לפי השם (לפי הא-ב)
  }
  if (!search) {
    search = "";// אם לא בחרתי מה לחפש תחזיר לי את כל המוצרים
  }
  const collection = await getCollection(collectionName);
  return await collection
    .find({ name: { $regex: search } })
    .sort({ [sort]: 1 })
    .toArray();
}
async function getProduct(productId) {
    const collection = await getCollection(collectionName);
    return await collection.findOne({_id: toObjectId(productId)})
  }

module.exports = { getAllProducts,getProduct };

// const name = "eden";
// const test = {
//   [name]: "Asdasd", in order for key to be dynamic you place the key inside the -[]
// its a js thing
// };

// get /api/product?search=ap
