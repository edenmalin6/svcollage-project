
const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
addToCartBtns.forEach((btn) => {
  btn.addEventListener("click", addToCart); // hoisting
});
async function addToCart() {
  const signedInUser = storageService.getUser();

  const updatedCart = {
    action: "add",
    productId,
  };
  const response = await fetch(
    `/api/cart/${signedInUser._id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedCart),
    },
    updatedCart
  );

  if (response.status !== 200) throw Error(await response.text());

  storageService.addOneProduct();
}

const removeFromCartBtns = document.querySelectorAll(".remove-from-cart-btn");
removeFromCartBtns.forEach((btn) => {
  btn.addEventListener("click", addToCart);
}); // hoisting
async function removeFromCart(productId) {
  const updatedCart = {
    action: "remove",
    productId,
  };
  const response = await fetch(`api/cart/${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedCart),
  });
  if (response.status !== 200) {
    throw Error(await response.text());
  }
  storageService.removeOneProduct(productId);
  const updatedProducts = storageService.getProducts;
  renderProducts(updatedProducts);
}


// async function renderProducts(products){
//   const strHTMLSs = products.map((product)=> {let className = product}

// )
// }