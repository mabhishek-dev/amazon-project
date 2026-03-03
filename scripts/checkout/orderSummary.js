import {
  // loadFromStorage, // Added manually (not currently used)
  cart,
  removeFromCart,
  updateDeliveryOption,
} from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import formatCurrency from "../utils/money.js";
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export function renderOrderSummary() {
  let cartSummaryHTML = "";
  // loadFromStorage(); // Added manually (not currently used)

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);
    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");

    cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container js-cart-item-container-${
          matchingProduct.id // Used for testing and dynamic selection
        }">
            <div class="delivery-date">
                Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">

                <div class="cart-item-details">
                    <div class="product-name">
                        ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                       ${
                         matchingProduct.getPrice()
                         // Product is now a class instance (from products.js), so it includes methods like getPrice()
                       } 
                    </div>
                    <div class="product-quantity js-product-quantity-${
                      matchingProduct.id // Used for testing
                    }">
                        <span> 
                        Quantity: <span class="quantity-label">${
                          cartItem.quantity
                        }</span>
                        </span>
                        <span class="update-quantity-link link-primary">
                        Update
                        </span>
                        <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${
                          matchingProduct.id
                        }" data-product-id="${
                          matchingProduct.id // Used for testing
                        }">
                        Delete
                        </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    ${deliveryOptionsHTML(matchingProduct, cartItem)}
                </div>
            </div>
        </div>
    `;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = "";

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
      const dateString = deliveryDate.format("dddd, MMMM D");

      const priceString =
        deliveryOption.pricePaisa === 0
          ? "FREE"
          : `&#8377;${formatCurrency(deliveryOption.pricePaisa)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
        <div class="delivery-option js-delivery-option" data-product-id="${
          matchingProduct.id
        }"
        data-delivery-option-id="${deliveryOption.id}">
                <input type="radio"
                ${isChecked ? "checked" : " "}
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}"
                >
            <div>
                <div class="delivery-option-date">
                    ${dateString}
                </div>
                <div class="delivery-option-price">
                    ${priceString}
                </div>
            </div>
        </div>
    `;
    });

    return html;
  }

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      renderPaymentSummary();

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`,
      );

      if (container) container.remove(); // Safe removal check
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}

/*
MVC (Model-View-Controller)

Model: Manages data (data folder)
View: Displays data (checkout.js)
Controller: Handles user interactions (event listeners)

Flow:
Model -> View -> Controller -> Model

Instead of manually updating individual parts, we re-render the UI to keep it in sync with the data.
MVC is a common design pattern.
*/
