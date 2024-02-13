const express = require("express");
const app = express();


app.use("/",express.static("client"));
app.use(express.json());

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "signIn.html"));
// });

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
