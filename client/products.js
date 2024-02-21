import storageService from "./modules/storageService.js";
import api from "./modules/api.js";

const userId = storageService.getUser()._id;
const menuContainer = document.getElementById("menu-container");

// const cartt =  await api.getUserCart(userId);
// cartt.map(api.getProduct)

async function renderProducts() {
  const cart = await api.getUserCart(userId);
  const products = await api.getProducts();
  menuContainer.innerHTML = "";
  products.forEach((product) => {
    const removeButtonId = `product-${product.name}-remove`;
    const addButtonId = `product-${product.name}-add`;

    menuContainer.innerHTML += `
    <div class="products">
    <img src="images/${product.image}" alt="" />
    <h2>${product.name}</h2>
    <div class="price">${product.price}$</div>
    <button onclick="addProductClick('${product._id}')" id="${addButtonId}" class="add-to-cart-btn">Add To Cart</button>
    <button onclick="removeProductClick('${product._id}')" id="${removeButtonId}" class="add-to-cart-btn">Remove From Cart</button>
    </div>
    `;
    const removeButton = document.getElementById(removeButtonId);
    const addButton = document.getElementById(addButtonId);

    if (cart.includes(product._id)) {
      removeButton.hidden = false;
      addButton.hidden = true;
    } else {
      removeButton.hidden = true;
      addButton.hidden = false;
    }
  });
}

window.addProductClick = async function addProductClick(productId) {
  await api.addProductToCart(userId, productId);
  await renderProducts();
}
window.removeProductClick = async function removeProductClick(productId) {
  await api.removeProductFromCart(userId, productId);
  await renderProducts();
}

renderProducts();
