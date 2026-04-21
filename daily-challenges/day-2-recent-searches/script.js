const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const dropdown = document.getElementById('history-dropdown');

// Load history from localStorage
let history = JSON.parse(localStorage.getItem('searchHistory')) || [];

function renderHistory() {
    dropdown.innerHTML = '';
    history.forEach((term) => {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.textContent = term;
        div.addEventListener('click', () => {
            input.value = term;
            runSearch(term);
        });
        dropdown.appendChild(div);
    });
}

function runSearch(term) {
    alert(`Searching for: ${term}`); // Replace with real search logic
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const term = input.value.trim();
    if (!term) return;

    // Add to history (limit 5)
    history.push(term);
    history = history.slice(-5);

    localStorage.setItem('searchHistory', JSON.stringify(history));
    renderHistory();
    runSearch(term);
    input.value = '';
});

// Render on page load
renderHistory();
