const express = require("express");
const app = express();
const { createUser, getUser } = require("./modules/userModule");
const userModule = require("./modules/userModule");

app.use("/", express.static("client"));
app.use(express.json());

app.post("/api/signIn", async (req, res) => {
  try {
    const { email, password } = req.body; // מה שהלקוח מכניס באינפוט
    const savedUser = await userModule.getUserByEmail(email); // היוזר ששמור בדטבייס
    if (savedUser === null)
      return res.status(404).send("User does not exist. ");

    // אם אין המייל שהוכנס באינפוט לא שמור בדטהבייס אז הפיינד וואן יחזיר נאל. זאת בדיקה למייל

    if (savedUser.password !== password)
      return res.status(400).send("Invalid password.");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
  return res.send(savedUser._id);
});

app.post("/api/signUp", async (req, res) => {
  const { fullName, username, email, password } = req.body;
  await userModule.createUser(req.body);
});

app.get("/cart/:userid");

app.patch("/api/cart/:userid", async (req, res) => {
  try {
    const { productId, action } = req.body
    if (action === "add") // update the cart by productId
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
  // get the user id
  // kind of action - delete, add
  // productId
  //
  // תשלח
  // inputs :
  //  לאיזה משתמש להוסיף את הפריט - לפי איידי
  // איזה סוג פריט להוסיף וכמה להוסיף לעגלה , לפי איידי
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
