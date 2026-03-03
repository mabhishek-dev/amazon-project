export let cart;

// Load cart immediately when file runs
loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart"));

  // Initialize default cart if nothing exists in storage
  if (!cart) {
    cart = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: "1",
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: "2",
      },
    ];
  }
}

// Alternative direct initialization approach (commented out)
// export let cart = JSON.parse(localStorage.getItem("cart"));
// If empty, assign default items

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem;

  // Check if product already exists
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) matchingItem = cartItem;
  });

  // Increase quantity or add new item
  if (matchingItem) matchingItem.quantity++;
  else {
    cart.push({
      productId,
      quantity: 1,
      deliveryOptionId: "1",
    });
  }

  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];

  // Create new array without the removed product
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  /*
  Alternative approach:
  const index = cart.findIndex(item => item.productId === productId);
  if (index !== -1) cart.splice(index, 1);
  */

  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  // Find matching product
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) matchingItem = cartItem;
  });

  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}
