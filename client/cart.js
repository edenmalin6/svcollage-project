import storageService from "./modules/storageService.js";
import api from "./modules/api.js";

const userId = storageService.getUser()._id;
const menuContainer = document.getElementById("menu-container");

async function renderCart() {
  const cart = await api.getUserCart(userId); //[1,2,3]
  const cartProducts = await Promise.all(cart.map(api.getProduct)); // [{name: "cofee", price: 19},{...},{...}]

  const totalPrice = cartProducts.reduce((sum, { price }) => sum + price, 0);
  const roundedTotalPrice = Math.round(totalPrice * 100) / 100;
  console.log(roundedTotalPrice);

  menuContainer.innerHTML = "";
  cartProducts.forEach((product) => {
    menuContainer.innerHTML += `
    <div class="products">
    <img src="images/${product.image}" alt="" />
    <h2>${product.name}</h2>
    <div class="price">${product.price}$</div>
    <button onclick="removeProductClick('${product._id}')" class="add-to-cart-btn">Remove From Cart</button>
    </div>
    `;
  });
}

window.addOrder = async function addOrder() {
  await api.makeOrder(userId);
  await renderCart();
};

window.removeProductClick = async function removeProductClick(productId) {
  await api.removeProductFromCart(userId, productId);
  await renderCart();
};

renderCart();
