import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const dataSource = new ProductData("tents");
const productId = getParam("product");
const product = new ProductDetails(productId, dataSource);
loadHeaderFooter();
product.init();

/* Moved to ProductDetails.mjs
 function addProductToCart(product) {
  const cartItems = getLocalStorage("so-cart");
  cartItems.push(product);
  setLocalStorage("so-cart", cartItems);
} */

// add to cart button event handler
/* Moved to ProductDetails.mjs
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
} */

// add listener to Add to Cart button
/* Moved to ProductDetails.mjs
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
*/
