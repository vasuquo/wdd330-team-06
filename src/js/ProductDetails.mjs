import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    addProductToCart() {
      const cartItems = getLocalStorage("so-cart");
      cartItems.push(this.product);
      setLocalStorage("so-cart", cartItems);
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();
        document
            .getElementById("addToCart")
            .addEventListener("click", this.addProductToCart.bind(this));
    }

    renderProductDetails() {
        const container = document.querySelector(".container");
        const template = document.querySelector("#product-template");
        const clone = template.content.cloneNode(true);
        const [brandName, name, img, price, color, descrp, cartBtn] = clone.querySelectorAll("h3, h2, img, p, p, p, button");        
        brandName.textContent = this.product.Brand.Name;
        name.textContent = this.product.NameWithoutBrand;
        img.src = this.product.Image;
        img.alt = this.product.NameWithoutBrand;
        price.textContent = `$${this.product.ListPrice}`;
        color.textContent = this.product.Colors[0].ColorName;
        descrp.innerHTML = this.product.DescriptionHtmlSimple;
        cartBtn.textContent = "Add to Cart";
        cartBtn.dataset.id =  this.product.Id;

        container.appendChild(clone);
    }

    
}