export const orders = JSON.parse(localStorage.getItem("orders") || "[]");

export function addOrder(order) {
  orders.unshift(order); // we need every order thats new to be at the front not back so unshift
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}
