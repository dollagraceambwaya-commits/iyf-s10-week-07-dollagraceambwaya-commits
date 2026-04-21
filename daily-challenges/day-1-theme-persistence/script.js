const body = document.body;
const toggleBtn = document.getElementById('theme-toggle');

// Load saved theme on page load
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
} else {
    body.classList.add('light-mode'); // default
}

// Toggle theme on button click
toggleBtn.addEventListener('click', () => {
    if (body.classList.contains('light-mode')) {
        body.classList.replace('light-mode', 'dark-mode');
        localStorage.setItem('theme', 'dark-mode');
    } else {
        body.classList.replace('dark-mode', 'light-mode');
        localStorage.setItem('theme', 'light-mode');
    }
});
