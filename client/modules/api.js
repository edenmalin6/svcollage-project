const headers = {
  "Content-Type": "application/json",
};

export default {
  async removeProductFromCart(userId, productId) {
    const response = await fetch(`/api/cart/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "remove",
        productId,
      }),
    });
    if (response.status !== 200) {
      throw Error(await response.text());
    }
  },

  async addProductToCart(userId, productId) {
    const response = await fetch(`/api/cart/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "add",
        productId,
      }),
    });
    if (response.status !== 200) {
      throw Error(await response.text());
    }
  },

  async getUserCart(userId) {
    const response = await fetch(`/api/cart/${userId}`);
    if (response.status !== 200) {
      throw Error(await response.text());
    }
    return await response.json();
  },

  // [111,222,33] -> map -> [{_id: "asd", name: "cofee", price: 11},...]
  async getProduct(productId) {
    const response = await fetch(`/api/product/${productId}`);
    if (response.status !== 200) {
      throw Error(await response.text());
    }
    return await response.json();
  },

  async getProducts(queryParams) {
    const response = await fetch(
      "/api/product?" + new URLSearchParams(queryParams) // הופך מאובייקט לסטרינג
    );
    if (response.status !== 200) {
      throw Error(await response.text());
    }
    return await response.json();
  },
  async makeOrder(userId) {
    const response = await fetch(`/api/order/${userId}`, { method: "POST" });
    if (response.status !== 200) {
      throw Error(await response.text());
    }
  },
  async getAllOrders(queryParams) {
    const response = await fetch("/api/order?" + queryParams);
    if (response.status !== 200) {
      throw Error(await response.text());
    }
    return await response.json();
  },

  async signUp(newUser) {
    const response = await fetch("/api/signUp", {
      method: "POST",
      headers,
      body: JSON.stringify(newUser),
    });
    if (response.status !== 200) {
      throw Error(await response.text());
    }
  },
  async signIn(signedInUser) {
    const response = await fetch("/api/signIn", {
      method: "POST",
      headers,
      body: JSON.stringify(signedInUser),
    });

    if (response.status !== 200) {
      throw Error(await response.text());
    }
    return await response.text();
  },
};

// try {
//   signUp();
//   console.log("Signed up!!");
// } catch (e) {
//     console.error("failed")
// }

// api.getProducts({
// sort: "name"
// })

// /api/product?sort=name
