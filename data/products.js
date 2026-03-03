import formatCurrency from "../scripts/utils/money.js";

export function getProduct(productId) {
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) matchingProduct = product;
  });

  return matchingProduct;
}

class Product {
  id;
  image;
  name;
  rating;
  pricePaisa;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    // Backend sends priceCents, so we assign it to pricePaisa
    this.pricePaisa = productDetails.priceCents;
  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice() {
    return `&#8377; ${formatCurrency(this.pricePaisa)}`;
  }

  extraInfoHTML() {
    return "";
  }
}

class Clothing extends Product {
  sizeChartLink;

  constructor(productDetails) {
    super(productDetails); // Call parent constructor
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  // Method overriding (parent class also defines this method)
  extraInfoHTML() {
    // super.extraInfoHTML(); // Used to access parent version if needed
    return `<a href="${this.sizeChartLink}" target="_blank">
      Size chart
    </a>`; // "_blank" opens link in a new tab
  }
}

/*
Date is a built-in class.
Libraries like dayjs provide more features and convenience.
*/

/*
Product list can be imported from backend instead of hardcoding.
*/

/*
fetch() is a modern way to make HTTP requests.
It uses promises instead of callbacks like XMLHttpRequest.
*/

export let products = [];

export function loadProductsFetch() {
  // fetch sends a GET request and returns a promise
  const promise = fetch("https://supersimplebackend.dev/products")
    .then((response) => {
      // response.json() extracts JSON data (returns a promise)
      return response.json();
    })
    .then((productsData) => {
      // Convert each product object into a class instance
      products = productsData.map((productDetails) => {
        if (productDetails.type === "clothing")
          return new Clothing(productDetails);
        return new Product(productDetails);
      });
      console.log("load products");
    })
    .catch((error) => {
      // Promise error handling
      console.log(`Unexpected error: ${error}. Try again later`);
    });

  return promise; // Allows chaining with .then()
}

/*
Alternative usage:
loadProductsFetch().then(() => {
  console.log("Products loaded");
});
*/

/*
Older approach using XMLHttpRequest (callback-based).
*/

/*
Built-in classes example:
new Date() -> creates a Date object.
*/

/*
Understanding "this":

1. Inside a method -> "this" refers to the object.
2. Inside a regular function -> "this" is undefined (in strict mode).
   It can be changed using .call().
3. Arrow functions do not bind their own "this";
   they inherit it from the surrounding scope.
*/
