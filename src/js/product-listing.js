import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

//load header and footer
loadHeaderFooter();
//ul element to display product list
const ulElement = document.querySelector(".product-list");
const category = getParam("category");

const dataSource = new ProductData(category);
const prouctList = new ProductList(category, dataSource, ulElement);
prouctList.init();
