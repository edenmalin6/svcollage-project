const express = require("express");
const app = express();
const userModule = require("./modules/userModule.js");
const productModule = require("./modules/productModule.js");
const orderModule = require("./modules/orderModule.js");

app.use("/", express.static("client"));
app.use(express.json());

app.post("/api/signIn", async (req, res) => {
  const { email, password } = req.body; // מה שהלקוח מכניס באינפוט

  // const email = req.body.email;
  // const password = req.body.password;

  let savedUser;
  try {
    savedUser = await userModule.getUserByEmail(email); // היוזר ששמור בדטבייס

    // אם אין המייל שהוכנס באינפוט לא שמור בדטהבייס אז הפיינד וואן יחזיר נאל. זאת בדיקה למייל
    if (savedUser === null)
      return res
        .status(404)
        .send("User not found. Please make sure you already have an account.");

    if (savedUser.password !== password)
      return res
        .status(400)
        .send(
          "Invalid password. Please make you you entered the right password."
        );
  } catch (error) {
    console.error("Error fetching signInUser", error);
    return res.status(500).send("Internal Server Error");
  }
  return res.send(savedUser._id.toString());
});

app.post("/api/signUp", async (req, res) => {
  const { fullName, email, password } = req.body;
  // const fullName = req.body.fullName;
  // const email = req.body.email;
  // const password = req.body.password;
  try {
    await userModule.createUser(fullName, email, password);
  } catch (error) {
    console.error("Error fetching newUser", error);
    return res.status(500).send("Internal Server Error");
  }
  return res.send();
});

app.patch("/api/cart/:userId", async (req, res) => {
  const { productId, action } = req.body;
  const { userId } = req.params;
  try {
    if (action === "add") {
      await userModule.addProductToCart(userId, productId);
    } else if (action === "remove") {
      await userModule.removeProductFromCart(userId, productId);
    }
  } catch (error) {
    console.error("Error updating cart", error);
    return res.status(500).send("Internal Server Error");
  }
  return res.send();
});

app.get("/api/cart/:userId", async (req, res) => {
  const { userId } = req.params;

  let cart;
  try {
    cart = await userModule.getCart(userId);
  } catch (error) {
    console.error("Error getting cart", error);
    return res.status(500).send("Internal Server Error");
  }
  return res.send(cart);
});

// get /api/product?sort=name&search=es
app.get("/api/product", async (req, res) => {
  let products;
  try {
    products = await productModule.getAllProducts(req.query);
  } catch (error) {
    console.error("Error getting products", error);
    return res.status(500).send("Internal Server Error");
  }
  return res.send(products);
});

app.get("/api/product/:productId", async (req, res) => {
  const { productId } = req.params;
  let product;
  try {
    product = await productModule.getProduct(productId);
  } catch (error) {
    console.error("Error getting product", error);
    return res.status(500).send("Internal Server Error");
  }
  return res.send(product);
});
app.post("/api/order/:userId", async (req, res) => {
  try {
    await orderModule.addOrder(req.params.userId);
  } catch (error) {
    console.error("Error making order", error);
    return res.status(500).send("Internal Server Error");
  }
  return res.send();
});

app.use("/api/order", (req, res, next) => {
  console.log("Request Type:", req.method);
  if (req.query.admin !== "true") {
    return res.status(400).send("Only admins allowed here");
  }
  return next();
});
app.get("/api/order", async (req, res) => {
  let orders;
  try {
    orders = await orderModule.getOrders();
  } catch (error) {
    console.error("Error getting orders", error);
    return res.status(500).send("Internal Server Error");
  }
  return res.send(orders);
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
