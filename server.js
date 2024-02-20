const express = require("express");
const app = express();
const userModule = require("./modules/userModule.js");

app.use("/", express.static("client"));
app.use(express.json());

app.post("/api/signIn", async (req, res) => {
  const { email, password } = req.body; // מה שהלקוח מכניס באינפוט
  let savedUser;
  try {
    savedUser = await userModule.getUserByEmail(email); // היוזר ששמור בדטבייס
  } catch (error) {
    console.error("Error fetching signInUser", error);
    return res.status(500).send("Internal Server Error");
  }
  // אם אין המייל שהוכנס באינפוט לא שמור בדטהבייס אז הפיינד וואן יחזיר נאל. זאת בדיקה למייל

  if (savedUser === null) return res.status(404).send("User does not exist. ");

  if (savedUser.password !== password)
    return res.status(400).send("Invalid password.");
  return res.send(savedUser._id);
});

app.post("/api/signUp", async (req, res) => {
  const { fullName, username, email, password } = req.body;
  try {
    await userModule.createUser(req.body);
  } catch (error) {
    console.error("Error fetching newUser", error);
    return res.status(500).send("Internal Server Error");
  }
});

// app.get("/cart/:userid");

app.patch("/api/cart/:userid", async (req, res) => {
  const { productId, action } = req.body;
  try {
    if (action === "add") return await userModule.addProductToCart(productId)
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});
app.delete("/api/cart/:userid", async (req, res) => {
  const { productId, action } = req.body;
  try {
    if( action === "delete") return await userModule.removeProductFromCart(productId)
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}
  )
 // update the cart by productId
// get the user id
// sort of action - delete, add
// productId
//
// תשלח
// inputs :
//  לאיזה משתמש להוסיף את הפריט - לפי איידי
// איזה סוג פריט להוסיף וכמה להוסיף לעגלה , לפי איידי

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
