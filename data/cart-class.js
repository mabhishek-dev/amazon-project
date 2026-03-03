class Cart {
  cartItems;

  // Private property: accessible only inside this class
  // Used to store the localStorage key for each cart instance
  #localStorageKey;

  constructor(localStorageKey) {
    // Store the key and run setup logic
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  // Private method: loads cart data from localStorage
  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

    // If no data exists, initialize with default items
    if (!this.cartItems) {
      this.cartItems = [
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

  // Save current cart state to localStorage
  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  // Add a product to the cart
  addToCart(productId) {
    let matchingItem;

    // Check if item already exists
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) matchingItem = cartItem;
    });

    // Increase quantity if found, otherwise add new item
    if (matchingItem) matchingItem.quantity++;
    else {
      this.cartItems.push({
        productId,
        quantity: 1,
        deliveryOptionId: "1",
      });
    }

    this.saveToStorage();
  }

  // Remove a product from the cart
  removeFromCart(productId) {
    const newCart = [];

    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });

    this.cartItems = newCart;
    this.saveToStorage();
  }

  // Update delivery option for a product
  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) matchingItem = cartItem;
    });

    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
  }
}

// Create cart instances (constructor runs setup automatically)
const cart = new Cart("cart-oop");
const businessCart = new Cart("cart-business");

/*
Constructor rules:
1. Must be named "constructor"
2. Cannot return a value
*/

// Private fields use "#" and are only accessible inside the class
// Example: cart.#localStorageKey -> Error (private)

// Private methods work the same way (e.g., #loadFromStorage)

console.log(cart);
console.log(businessCart);

console.log(businessCart instanceof Cart); // true
