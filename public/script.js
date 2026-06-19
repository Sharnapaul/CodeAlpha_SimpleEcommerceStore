let cart = [];
let currentUser = null;

async function loadProducts() {
    const res = await fetch('/api/products');
    const products = await res.json();
    const grid = document.getElementById('products-grid');

    grid.innerHTML = products.map(p => `
        <div class="card">
            <img src="${p.img}">
            <h3>${p.name}</h3>
            <p style="color: #27ae60; font-weight: bold;">$${p.price}</p>
            <button onclick="addToCart(${p.id}, '${p.name}', ${p.price})">Add to Cart</button>
        </div>
    `).join('');
}

function login() {
    currentUser = prompt("Enter your Name to Login:");
    if(currentUser) {
        document.getElementById('user-info').innerHTML = `User: <b>${currentUser}</b>`;
    }
}

function addToCart(id, name, price) {
    cart.push({id, name, price});
    updateUI();
}

function updateUI() {
    document.getElementById('count').innerText = cart.length;
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = cart.map(i => `<p>${i.name} - $${i.price}</p>`).join('');
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('total-price').innerText = `Total: $${total}`;
}

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('hidden');
}

async function placeOrder() {
    if(!currentUser) return alert("Please Login first!");
    if(cart.length === 0) return alert("Your cart is empty!");

    const res = await fetch('/api/order', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ cart, user: currentUser })
    });

    const data = await res.json();
    alert(`Success! ${data.message}\nOrder ID: ${data.orderId}`);
    cart = [];
    updateUI();
    toggleCart();
}

loadProducts();