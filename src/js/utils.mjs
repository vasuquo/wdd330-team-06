// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  const data = localStorage.getItem(key);
   const parsed = data ? JSON.parse(data) : [];
   return Array.isArray(parsed) ? parsed : [];
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
// get a url parameter
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
};

// render a temple with a given list of products
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
    if (clear) {
      parentElement.innerHTML = "";
    }
    const htmlStrings = list.map(templateFn);
    parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

// HTML rendering with templates
export function renderWithTemplate(template, parentElement, data, callback) {
    parentElement.innerHTML = template;  
    if (callback) {
      callback(data);
    }
}
// Retrieves file content of header and footer as template
export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}
// Loading the templates
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const footerTemplate = await loadTemplate("../partials/footer.html");
  const headerElement = document.querySelector("#so-header");
  const footerElement = document.querySelector("#so-footer");
  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}

//Currency formater
export function formatCurrency(num) {
    return Number(num.toFixed(2)).toLocaleString();
}



