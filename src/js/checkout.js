import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

const orderElement = ".order-summary";
loadHeaderFooter();
const checkoutProcess = new CheckoutProcess("so-cart", orderElement);
checkoutProcess.init();