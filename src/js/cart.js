import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

const cartItems = getLocalStorage("so-cart");
const cartElement = document.querySelector(".cart-list");
const totalElement = document.querySelector(".cart-footer");

const shoppingCart = new ShoppingCart(cartItems, cartElement, totalElement);

loadHeaderFooter();
shoppingCart.init();

/* function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
} */

/* function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}  */

// renderCartContents();
