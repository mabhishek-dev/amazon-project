import { cart, addToCart, loadFromStorage } from "../../data/cart.js";

describe("test suite: addToCart", () => {
  it("adds an existing product to the cart ", () => {
    // Prevent actual localStorage writes
    spyOn(localStorage, "setItem");

    // Mock existing cart data in localStorage
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "1",
        },
      ]);
    });

    loadFromStorage(); // Load mocked cart data

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");

    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(2);
  });

  it("adds a new product to the cart", () => {
    // Order matters: mock setItem before getItem
    spyOn(localStorage, "setItem");

    // Mock empty cart in localStorage
    spyOn(localStorage, "getItem").and.callFake(() => {
      // spyOn(object, method) replaces the real method
      // callFake() lets us return custom data (must be string for localStorage)
      return JSON.stringify([]);
    });

    loadFromStorage(); // Reload cart using mocked data

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");

    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    // Test passes only if all expectations succeed
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(1);
  });
});

/*
These are unit tests (testing individual functions).

In real-world applications, we also use integration tests,
which test multiple units working together.
*/
