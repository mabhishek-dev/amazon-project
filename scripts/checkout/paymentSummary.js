import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import formatCurrency from "../utils/money.js";
import { renderOrderSummary } from "./orderSummary.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary() {
  let productPricePaisa = 0;
  let shippingPricePaisa = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPricePaisa += product.pricePaisa * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPricePaisa += deliveryOption.pricePaisa;
  });

  const totalBeforeTaxPaisa = productPricePaisa + shippingPricePaisa;
  const taxPaisa = totalBeforeTaxPaisa * 0.1;
  const totalPaisa = totalBeforeTaxPaisa + taxPaisa;

  const paymentSummaryHTML = `
        <div class="payment-summary-title">Order Summary</div>

        <div class="payment-summary-row">
        <div>Items (3):</div>
        <div class="payment-summary-money">&#8377;${formatCurrency(
          productPricePaisa,
        )}</div>
        </div>

        <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">&#8377;${formatCurrency(
          shippingPricePaisa,
        )}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">&#8377;${formatCurrency(
          totalBeforeTaxPaisa,
        )}</div>
        </div>

        <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">&#8377;${formatCurrency(
          taxPaisa,
        )}</div>
        </div>

        <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">&#8377;${formatCurrency(
          totalPaisa,
        )}</div>
        </div>

        <button class="place-order-button button-primary js-place-order">
        Place your order
        </button>  
    `;

  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;
  renderOrderSummary();

  document
    .querySelector(".js-place-order")
    .addEventListener("click", async () => {
      try {
        // Use async/await for the fetch request
        const response = await fetch("https://supersimplebackend.dev/orders", {
          method: "POST", // Explicitly set method (default is GET)
          headers: {
            // Send metadata about the request
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // Data sent to backend must be JSON
            cart: cart,
          }),
        });

        const order = await response.json();
        addOrder(order);
      } catch (error) {
        console.log("Unexpected error. Try again later");
      }

      // Redirect to orders page after placing order
      window.location.href = "orders.html";
    });
}

/*
Main JavaScript Flow (MVC concept):

1. Save data -> Model
2. Generate HTML -> View
3. Add interactivity -> Controller
*/
