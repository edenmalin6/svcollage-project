const { getCollection, toObjectId } = require("./dbModule");
const collectionName = "products";

async function getAllProducts({ sort, search }) {
  if (!sort) {
    sort = "name";// אם לא בחרתי לפי שם ומחיר הברירת מחדל תהיה לפי השם (לפי הא-ב)
  }
  if (!search) {
    search = "";// אם לא בחרתי מה לחפש אל תפלטר לפי שם או מוצר שזה בעצם - תחזיר לי את כל המוצרים
  }
  const collection = await getCollection(collectionName);
  return await collection
    .find({ name: { $regex: search } })//find where the name field matches a regular expression specified by the search parameter. 
    .sort({ [sort]: 1 }) //sort by key name from small to big
    .toArray();
}
async function getProduct(productId) {
    const collection = await getCollection(collectionName);
    return await collection.findOne({_id: toObjectId(productId)})
  }

module.exports = { getAllProducts,getProduct };


// The $regex operator is used to perform a regular expression search on the name field.
// The search parameter is expected to be a string that can be used as a regular expression.

// const name = "eden";
// const test = {
//   [name]: "Asdasd", in order for key to be dynamic you place the key inside the -[]
// its a js thing
// };

// get /api/product?search=ap
