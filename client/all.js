import api from "./modules/api.js";

const menuContainer = document.getElementById("menu-container");

async function renderOrders() {
  let orders;
  try {
    orders = await api.getAllOrders(
      new URLSearchParams(window.location.search)
    );
  } catch (e) {
    alert(e);
    throw e;
  }
  menuContainer.innerHTML = "";
  orders.forEach((order) => {
    let html = `
      <div class="products">
      <h2>userId: ${order.userId}</h2>
      <h2>products:</h2>`;
    console.log(order.cart);
    order.cart.forEach((productId) => {
      html += `<h2>${productId}</h2>`;
    });

    html += `
      <div class="price">${order.total}$</div>
      </div>`;

    menuContainer.innerHTML += html;
  });
}
document.addEventListener("DOMContentLoaded", async function  () {
  await renderOrders();
},false);
