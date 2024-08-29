// This is the boilerplate code given for you
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Shopping cart (initially from session storage or empty)
const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });

  // Attach event listeners to 'Add to Cart' buttons after rendering
  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', (event) => {
      addToCart(parseInt(event.target.getAttribute('data-id')));
    });
  });
}

// Render cart list
function renderCart() {
  cartList.innerHTML = ''; // Clear the list

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    cart.push(product);
    sessionStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
}

// Clear cart
function clearCart() {
  sessionStorage.removeItem("cart");
  while (cart.length > 0) {
    cart.pop();
  }
  renderCart();
}

// Attach event listener to 'Clear Cart' button
clearCartBtn.addEventListener('click', clearCart);

// Initial render
renderProducts();
renderCart();