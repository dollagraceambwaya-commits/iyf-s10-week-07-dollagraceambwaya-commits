// Cache DOM elements once at the top
const productList = document.getElementById('product-list');
const cartDiv = document.getElementById('cart');
const cartCount = document.getElementById('cart-count');

function renderProducts() {
    productList.innerHTML = '';
    state.products.forEach((product) => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
        <img src="${product.image}" alt="${product.name}" width="100">
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(div);
    });
}

function renderCart() {
    cartDiv.innerHTML = '';
    state.cart.forEach((item) => {
        const product = state.products.find((p) => p.id === item.productId);
        if (!product) return;

        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
        ${product.name} - $${product.price} x
        <input type="number" value="${item.quantity}" min="0"
        onchange=updateQuantity(${item.productId}, this.value)">
        <button onclick="removeFromCart(${item.productId})">Remove</button>
        `;
        cartDiv.appendChild(div);
    });

    cartCount.textContent = `Cart: ${getCartCount()} items | Total: $${getCartTotal()}`;
}
