const express = require("express");
const app = express();
const { createUser, getUser } = require("./modules/userModule");
const userModule = require("./modules/userModule");

app.use("/", express.static("client"));
app.use(express.json());

app.post("/api/signIn", async (req, res) => {
  const { email, password } = req.body; // מה שהלקוח מכניס באינפוט
  const savedUser = await userModule.getUserByEmail(email); // היוזר ששמור בדטבייס
  if (savedUser === null) {
    // אם אין המייל שהוכנס באינפוט לא שמור בדטהבייס אז הפיינד וואן יחזיר נאל. זאת בדיקה למייל
    return res.status(404).send("User not found");
  }

  if (savedUser.password !== password) {
    return res.status(400).send("Password is incorrect");
  }
  return res.send(savedUser._id);
});

app.post("/api/signUp", async (req, res) => {
  const { fullName, username, email, password } = req.body;
  await userModule.createUser(req.body);
});

app.get("/cart/:userid");

app.post("/api/cart/:userid", async (req, res) => {
  // תשלח
  // inputs :
  //  לאיזה משתמש להוסיף את הפריט - לפי איידי
  // איזה סוג פריט להוסיף וכמה להוסיף לעגלה , לפי איידי
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
