import { formatCurrency, getLocalStorage } from "./utils.mjs";

function packageItems(items) {
  const simpleItems = items.map((item) => {
    return {id: item.id, name: item.name, price: item.FinalPrice, quantity: 1};
  });

  return simpleItems;        
}

// takes a form element and returns an object where the key is the "name" of the form input.
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}


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

    document.getElementById("submit-order").addEventListener("click", (event) => {
      event.preventDefault();
      this.checkout();
    });
  }

  calculateItemSummary() {
     this.calculateItemSubTotal();

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

  async checkout() {
     const orderDetails = formDataToJSON(document.getElementById("orderForm"));
     const orderDate = new Date().toDateString();
     orderDetails.orderDate = orderDate;
     orderDetails.orderTotal = this.orderTotal;
     orderDetails.tax = this.tax;
     orderDetails.shipping = this.shipping;
     orderDetails.items = packageItems(this.list);

     const checkoutUrl = "https://wdd330-backend.onrender.com:3000/checkout";

     const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderDetails)
     }

     try {

      const response = await fetch(checkoutUrl, options);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json(); 
      console.log('Success:', result);
      
     } catch (error) {
        console.error('Error:', error);      
     }
  }
}