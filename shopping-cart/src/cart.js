function addToCart(productId) {
    const existing = state.cart.find((item) => item.productId === productId);
    if (existing) {
        existing.quantity++;
    } else {
        state.cart.push({ productId, quantity: 1 });
    }
    saveCart();
    renderCart();
}

function updateQuantity(productId, quantity) {
    const item = state.cart.find((i) => i.productId === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = parseInt(quantity, 10);
        }
        saveCart();
        renderCart();
    }
}

function removeFromCart(productId) {
    state.cart = state.cart.filter((item) => item.productId !== productId);
    saveCart();
    renderCart();
}

function getCartCount() {
    return state.cart.reduce((count, item) => count + item.quantity, 0);
}

function getCartTotal() {
    return state.cart.reduce((total, item) => {
        const product = state.products.find((p) => p.id === item.productId);
        return total + product.price * item.quantity;
    }, 0);
}
