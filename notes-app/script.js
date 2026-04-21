// Create reusable helpers
function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getFromStorage(key, defaultValue = []) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
}

const noteInput = document.getElementById('noteInput');
const addNoteButton = document.getElementById('addNoteBtn');
const notesList = document.getElementById('notesList');
const clearNotesButton = document.getElementById('clearNotesBtn');
const toggleThemeButton = document.getElementById('toggleThemeBtn');

// Load settings from localStorage
const settings = getFromStorage('settings', { theme: 'light' });

// Apply saved theme
function applyTheme() {
    if (settings.theme === 'dark') {
        document.body.style.backgroundColor = '#333';
        document.body.style.color = 'white';
    } else {
        document.body.style.backgroundColor = '#fff';
        document.body.style.color = 'black';
    }
}

// Toggle theme
toggleThemeButton.addEventListener('click', () => {
    settings.theme = settings.theme === 'light' ? 'dark' : 'light';
    saveToStorage('settings', settings);
    applyTheme();
});

// Load existing notes from localStorage
let notes = getFromStorage('notes', []);

// Render notes on page load
function renderNotes() {
    notesList.innerHTML = '';
    notes.forEach((noteText, index) => {
        const li = document.createElement('li');
        li.textContent = noteText;

        // Add delete button for each note
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        li.appendChild(deleteBtn);

        deleteBtn.addEventListener('click', () => {
            notes.splice(index, 1);
            saveToStorage('notes', notes);
            renderNotes();
        });

        notesList.appendChild(li);
    });
}

// Add new note
addNoteButton.addEventListener('click', () => {
    const noteText = noteInput.value.trim();
    if (noteText) {
        notes.push(noteText);
        saveToStorage('notes', notes);
        renderNotes();
        noteInput.value = '';
    }
});

// Clear all notes
clearNotesButton.addEventListener('click', () => {
    notes = [];
    saveToStorage('notes', notes);
    renderNotes();
});

// Initial calls
renderNotes();
applyTheme();
