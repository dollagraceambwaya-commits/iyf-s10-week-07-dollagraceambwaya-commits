const form = document.getElementById('auto-form');

// Load saved data on page load
const savedData = JSON.parse(localStorage.getItem('formData')) || {};
for (const [key, value] of Object.entries(savedData)) {
    const field = form.elements[key];
    if (field) field.value = value;
}

// Auto-save every 5 seconds
setInterval(() => {
    const data = {};
    for (const field of form.elements) {
        if (field.name) {
            data[field.name] = field.value;
        }
    }
    localStorage.setItem('formData', JSON.stringify(data));
}, 5000);

// Clear saved data on submit
form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Form submitted!');
    localStorage.removeItem('formData');
    form.reset();
});
