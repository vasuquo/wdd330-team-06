import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

//ul element to display product list
const ulElement = document.querySelector(".product-list");

const dataSource = new ProductData("tents");
const prouctList = new ProductList("tents", dataSource, ulElement);
prouctList.init();
