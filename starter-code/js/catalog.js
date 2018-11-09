/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
var cart = new Cart([]);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

  //TODO: Add an <option> tag inside the form's select for each product
  var selectElement = document.getElementById('items');
  for (var i in Product.allProducts) {
    var optionsEl = document.createElement('option');
    optionsEl.id = 'opt'+[i];
    selectElement.appendChild(optionsEl);
    optionsEl.value = Product.allProducts[i].name;
    optionsEl.textContent = Product.allProducts[i].name;
  }

}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {

  // TODO: Prevent the page from reloading
  event.preventDefault();
  // Do all the things ...
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();

}

// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart() {

  var itemEl = document.getElementById('items');
  var a = itemEl.options[itemEl.selectedIndex].value;
  console.log(a);

  var quantityEl = document.getElementById('quantity');
  var b = quantityEl.value;
  console.log(b);
  // TODO: suss out the item picked from the select list
  // TODO: get the quantity
  // TODO: using those, add one item to the Cart
  cart.addItem(a,b);

}

// TODO: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  var data1 = localStorage.getItem('cartData');
  var cartData = JSON.parse(data1);
  var counter = cartData.length;
  console.log(counter);

  var itemCountEl = document.getElementById('itemCount');
  itemCountEl.textContent = counter;
}
// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  var itemEl = document.getElementById('items');
  var item = itemEl.options[itemEl.selectedIndex].value;
  console.log(item);

  var quantityEl = document.getElementById('quantity');
  var quantity = quantityEl.value;
  console.log(quantity);
  // TODO: Get the item and quantity from the form
  // TODO: Add a new element to the cartContents div with that information
  var divEl = document.getElementById('cartContents');
  var pEl = document.createElement('p');
  divEl.appendChild(pEl);
  pEl.textContent = item + ': ' + quantity;


}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
