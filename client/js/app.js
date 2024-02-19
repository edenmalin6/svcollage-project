const togglePassword = document.getElementById("togglePassword");
const password = document.getElementById("password");

togglePassword.onclick = function () {
  if (password.type == "password") {
    password.type = "text";
    this.classList.toggle("bi-eye");
  } else {
    password.type = "password";
  }
};

async function signIn(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const signedInUser = {
    email,
    password,
  };
  const response = await fetch("/api/signIn", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signedInUser),
  });
  if (response.status === 404)
    return alert(
      "User not found. Please make sure you already have an account."
    );
  else if (response.status === 400)
    return alert(
      "Password is incorrect. Please make you you entered the right password."
    );
  else if (response.status !== 200) throw Error(await response.text());

  storageService.setUser(signedInUser);
  window.location.href = "/home.html";
}

async function signOut() {
  storageService.clearAll();
  window.location.href = "signIn.html";
}

async function signUp(event) {
  event.preventDefault();
  const fullName = document.getElementById("full-name").value;
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-pass").value;

  const newUser = {
    fullName,
    username,
    email,
    password,
  };
  if (password !== confirmPassword)
    return alert("Passwords are not matching. Please make sure they do.");

  const response = await fetch("/api/signUp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      body: JSON.stringify(newUser),
    },
  });
  if (response.status !== 200) throw Error(await response.text());

  window.location.href = "/signIn.html";
}

//  async function init() {
//    // הפונקציה תופעל כל פעם שיוזר מתחבר. בעזרתה נבדוק האם היוזר קיים או לא
//   const user = storageService.getUser();

//    const products = storageService.getProducts()
//    if(products.length > 0){
//      renderProducts(products)
//    } else {}app.patch("/api/cart/:userid", async (req, res) => {
//   try {
//     const { productId, action } = req.body
//     if (action === "add"){}} // update the cart by productId
//    catch (error) {
//     res.status(500).send("Internal Server Error");
//   }
//   // get the user id
//   // kind of action - delete, add
//   // productId
//   //
//   // תשלח
//   // inputs :
//   //  לאיזה משתמש להוסיף את הפריט - לפי איידי
//   // איזה סוג פריט להוסיף וכמה להוסיף לעגלה , לפי איידי
// });
//    }


   document.getElementsByClassName("add-to-cart-btn").addEventListener("click", addToCart) 
  async function addToCart() {
  const signedInUser = storageService.getUser()

  const updatedCart = {
    action: add,
    productId,
  }
  const response = await fetch(`/api/cart/${signedInUser._id}`,{
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedCart),
  })

   if (response.status !== 200) throw Error(await response.text());
  
   storageService.addOneProduct()


  }



async function renderProducts(products){
  const strHTMLSs = products.map((product)=> {
    let className = product.
  })
}
// buyNow();

async function removeFromCart(productId) {
  const response = await fetch(`api/buy/${productId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (response.status !== 200) {
    throw Error(await response.text());
  }
  storageService.removeOneProduct(productId);
  const updatedProducts = storageService.getProducts;
  renderProducts(updatedProducts);
}

// { email, password } = req.body
// req.body.email , req.body.password
