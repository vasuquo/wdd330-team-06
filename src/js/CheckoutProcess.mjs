import { formatCurrency, getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
    document.getElementById("zip").addEventListener("change", 
        this.calculateOrderTotal.bind(this));
  }

  calculateItemSummary() {
     this.calculateItemSubTotal();
//     this.calculateOrderTotal();
  }

  calculateItemSubTotal() {
    // calculate and display the total dollar amount of the items in the cart, and the number of items.
    this.itemTotal = this.list.reduce((accum, item) => accum + item.FinalPrice, 0);
    const subtotal = document.querySelector(`${this.outputSelector} #subtotal`);
    subtotal.innerText = `Subtotal:  $${formatCurrency(this.itemTotal)}`;        
    
  }

  calculateOrderTotal() {
    // calculate the tax and shipping amounts. Add those to the cart total to figure out the order total
    this.tax = (this.itemTotal * .06);
    this.shipping = 10 + (this.list.length-1) * 2; 
    this.orderTotal = this.itemTotal + this.shipping + this.tax;

    // display the totals.
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
    
    const tax = document.querySelector(`${this.outputSelector} #tax`);
    tax.innerText = `Tax:  $${this.tax.toFixed(2)}`;

    const shipping = document.querySelector(`${this.outputSelector} #shipping`);
    shipping.innerText = `Shipping:  $${formatCurrency(this.shipping)}`;

    const order = document.querySelector(`${this.outputSelector} #order`);
    order.innerText = `Order Total:  $${formatCurrency(this.orderTotal)}`;
  }
}