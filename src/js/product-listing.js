import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

//load header and footer
loadHeaderFooter();
//ul element to display product list
const ulElement = document.querySelector(".product-list");
const category = getParam("category");
const catUpper = category.charAt(0).toUpperCase() + category.slice(1);

document.getElementById("top").innerHTML = `Top Products: ${catUpper}`;

const dataSource = new ExternalServices(category);
const prouctList = new ProductList(category, dataSource, ulElement);
prouctList.init();
