import { renderListWithTemplate, formatCurrency } from "./utils.mjs";

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
  <div class="cart-image">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimarySmall}"
      alt="${item.Name}"
    />
  </a>
  </div>
  <div class="cart-details">
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">Color: ${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">Price: $${formatCurrency(item.FinalPrice)}</p>
  </div>
</li>`;

}

function cartTotalTemplate(total) {
  return `
    <div class="total-footer">
        <p class="cart-total">Total: $${formatCurrency(total)}</p>
        <button onClick="location.href='../checkout/'">Checkout</button>
    </div>          
  `;
}

export default class ShoppingCart {
    constructor(cartItems, listElement, totalElement) {
        this.cartItems = cartItems;
        this.listElement = listElement;
        this.totalElement = totalElement;
    }

   init() {
        // the dataSource will return a Promise...so you can use await to resolve it.
        this.renderList(this.cartItems);
    }

    renderList(list) {        
        if (list) {
            renderListWithTemplate(cartItemTemplate, this.listElement, list);
            const total = list.reduce((accum, item) => accum + item.FinalPrice, 0);
            this.totalElement.innerHTML = cartTotalTemplate(total);
        }
        
    }
}