const state = {
    products: [
        {
            id: 1,
            name: 'Laptop',
            price: 999,
            image: 'public/images/laptop.jpg',
        },
        { id: 2, name: 'Phone', price: 699, image: 'public/images/phone.jpg' },
        {
            id: 3,
            name: 'Headphones',
            price: 199,
            image: 'public/images/headphones.jpg',
        },
    ],
    cart: [],
};

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(state.cart));
}

function loadCart() {
    const saved = localStorage.getItem('cart');
    if (saved) state.cart = JSON.parse(saved);
}
