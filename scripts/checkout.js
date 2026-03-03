import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";

/*
Async/Await
= Cleaner way to handle asynchronous code.
= Built on top of promises.

async -> makes a function return a promise.
await -> pauses execution until a promise resolves.
*/

async function loadPage() {
  try {
    // Wait until products are loaded before continuing
    await loadProductsFetch();
  } catch (error) {
    // Async error handling requires try/catch
    console.log(`Unexpected error: ${error}. Try again later`);
  }

  renderOrderSummary();
  renderPaymentSummary();
}

loadPage();

/*
Promises
= Improved way to manage asynchronous code.
= Helps avoid deeply nested callbacks.

Benefits:
- Keeps code flatter and cleaner.
- Allows chaining with .then().
- Supports Promise.all() to run multiple promises in parallel.
*/

/*
Promise features:

1. resolve(value) -> passes value to .then().
2. Promise.all([...]) -> runs multiple promises in parallel and waits for all.

Notes:
- await can only be used inside an async function.
- async/await is a cleaner alternative to promise chaining.
*/
