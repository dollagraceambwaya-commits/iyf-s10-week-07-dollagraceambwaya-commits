// Messy version

// Find and fix all bugs in this code
// function calculateOrderTotal(items) {
//   let total = 0;

//   for (let i = 0; i <= items.length; i++) {
//     const item = items[i];
//     total += item.price * item.quanity;
//   }

//   if (total > 100) {
//     total = total * 0.9; // 10% discount
//   }

//   return total;
// }

// const order = [
//   { name: "Book", price: 15, quantity: 2 },
//   { name: "Pen", price: 3, quantity: 5 },
//   { name: "Notebook", price: 8, quantity: 3 },
// ];

// console.log(calculateOrderTotal(order));
// Expected: 69 (before discount) or 62.1 (after discount)
// Actual: ???

// Refactored version

function calculateOrderTotal(items) {
    let total = 0;

    // Fix loop condition: i <= items.length -> i < items.length
    for (let i = 0; i < items.length; i++) {
        const item = items[i];

        // Fix typo: quanity -> quantity
        total += item.price * item.quantity;
    }

    // Apply discount if total exceeds 100
    if (total > 100) {
        total = total * 0.9; // 10% discount
    }
    return total;
}

const order = [
    { name: 'Book', price: 15, quantity: 2 }, // 30
    { name: 'Pen', price: 3, quantity: 5 }, // 15
    { name: 'Notebook', price: 8, quantity: 3 }, // 24
];
console.log(calculateOrderTotal(order));
// Expected: 69 (before discount) or 62.1 (after discount)
// Actual: 69
