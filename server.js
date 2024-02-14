const express = require("express");
const app = express();
const {createUser,getUser} = require("./modules/userModule")
const userModule = require("./modules/userModule")


app.use("/",express.static("client"));
app.use(express.json());


app.post("/api/signIn", async (req, res) => {
const savedUser =  await userModule.getUserByEmail(req.body.email) // היוזר ששמור בדטבייס
 if (req.body.password )



})



app.post("/api/submit", async(req, res)=>{

})

app.get("/cart/:userid")

app.put("/cart/:userid")

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
