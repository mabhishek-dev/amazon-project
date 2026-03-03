import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";
import { loadProductsFetch } from "../../data/products.js";

describe("test suite: renderOrderSummary", () => {
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

  beforeAll((done) => {
    // Jasmine's done() ensures async code finishes before tests run
    // Without done(), tests may run before products are loaded

    loadProductsFetch().then(() => {
      done(); // Continue only after products are fetched
    });
  });

  // Hook: runs before each test
  beforeEach(() => {
    // Prevent real localStorage changes
    spyOn(localStorage, "setItem");

    // Create test DOM structure
    document.querySelector(".js-test-container").innerHTML = `
        <div class="js-order-summary"></div>
        <div class="js-payment-summary"></div>
    `;

    // Mock localStorage data
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: "2",
        },
      ]);
    });

    loadFromStorage(); // Load mocked cart data
    renderOrderSummary(); // Render UI for testing
  });

  // Hook: runs after each test
  afterEach(() => {
    // Clean up DOM after each test
    document.querySelector(".js-test-container").innerHTML = " ";
  });

  it("displays the cart", () => {
    // Check if correct number of cart items render
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      2,
    );

    // Verify quantities are displayed correctly
    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText,
    ).toContain("Quantity: 2");

    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText,
    ).toContain("Quantity: 1");
  });

  it("removes a product", () => {
    // Simulate clicking delete
    document.querySelector(`.js-delete-link-${productId1}`).click();

    // Only one item should remain
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      1,
    );

    // First product should be removed from DOM
    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`),
    ).toEqual(null);

    // Second product should still exist
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`),
    ).not.toEqual(null);

    // Cart data should update correctly
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);
  });
});

/*
What to test:
1. UI rendering (how the page looks)
2. Behavior (how it responds to actions)

Hooks:
beforeEach() -> runs before every test
afterEach() -> runs after every test
beforeAll() -> runs once before all tests
afterAll() -> runs once after all tests

Typical workflow:
1. Make changes
2. Re-run tests
3. Save to Git
*/
