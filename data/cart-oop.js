/*
OOP (Object-Oriented Programming)
= Organizing code into objects.

Procedural Programming
= Writing step-by-step functions.

OOP helps us create multiple similar objects
without copying large blocks of code.
*/

// const cart = {
//   cartItems: undefined,
//   loadFromStorage() {
//     this.cartItems = JSON.parse(localStorage.getItem("cart-oop"));

//     if (!this.cartItems) {
//       this.cartItems = [
//         {
//           productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
//           quantity: 2,
//           deliveryOptionId: "1",
//         },
//         {
//           productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
//           quantity: 1,
//           deliveryOptionId: "2",
//         },
//       ];
//     }
//   },
//   saveToStorage() {
//     localStorage.setItem("cart-oop", JSON.stringify(this.cartItems));
//   },
//   addToCart(productId) {
//     let matchingItem;

//     this.cartItems.forEach((cartItem) => {
//       if (productId === cartItem.productId) matchingItem = cartItem;
//     });

//     if (matchingItem) matchingItem.quantity++;
//     else {
//       this.cartItems.push({
//         productId,
//         quantity: 1,
//         deliveryOptionId: "1",
//       });
//     }

//     this.saveToStorage();
//   },
//   removeFromCart(productId) {
//     const newCart = [];

//     this.cartItems.forEach((cartItem) => {
//       if (cartItem.productId !== productId) {
//         newCart.push(cartItem);
//       }
//     });
//     this.cartItems = newCart;

//     this.saveToStorage();
//   },
//   updateDeliveryOption(productId, deliveryOptionId) {
//     let matchingItem;

//     this.cartItems.forEach((cartItem) => {
//       if (productId === cartItem.productId) matchingItem = cartItem;
//     });

//     matchingItem.deliveryOptionId = deliveryOptionId;
//     this.saveToStorage();
//   },
// };

// Naming convention: use PascalCase for object-creating functions
function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,

    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));

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
    },

    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },

    addToCart(productId) {
      let matchingItem;

      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) matchingItem = cartItem;
      });

      if (matchingItem) matchingItem.quantity++;
      else {
        this.cartItems.push({
          productId,
          quantity: 1,
          deliveryOptionId: "1",
        });
      }

      this.saveToStorage();
    },

    removeFromCart(productId) {
      const newCart = [];

      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      });

      this.cartItems = newCart;
      this.saveToStorage();
    },

    updateDeliveryOption(productId, deliveryOptionId) {
      let matchingItem;

      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) matchingItem = cartItem;
      });

      matchingItem.deliveryOptionId = deliveryOptionId;
      this.saveToStorage();
    },
  };

  return cart;
}

const cart = Cart("cart-oop");
cart.loadFromStorage(); // Load before using methods
cart.addToCart("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");

const businessCart = Cart("cart-business");
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);

/*
Classes are a cleaner, built-in way to generate objects.
*/
