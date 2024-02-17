const express = require("express");
const app = express();
const { createUser, getUser } = require("./modules/userModule");
const userModule = require("./modules/userModule");

app.use("/", express.static("client"));
app.use(express.json());

app.post("/api/signIn", async (req, res) => {
  const { email, password } = req.body;// מה שהלקוח מכניס באינפוט
  const savedUser = await userModule.getUserByEmail(email); // היוזר ששמור בדטבייס
  if (savedUser === null) { // אם אין המייל שהוכנס באינפוט לא שמור בדטהבייס אז הפיינד וואן יחזיר נאל. זאת בדיקה למייל
    return res.status(404).send("User not found");
  }

  if(savedUser.password !== password){
    return res.status(400).send("Password is incorrect");
  }
  return res.send(savedUser._id)

});

app.post("/api/submit", async (req, res) => {});

app.get("/cart/:userid");

app.put("/cart/:userid");

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
