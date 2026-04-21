function saveToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getFromStorage(key, defaultValue = []) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
}

const STORAGE_KEY = "todos";
const FILTER_KEY = "filter";

function loadTodos() {
  return getFromStorage(STORAGE_KEY, []);
}

function saveTodos(todos) {
  saveToStorage(STORAGE_KEY, todos);
}

function addTodo(text) {
  const newTodo = {
    id: Date.now(),
    text,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  const todos = loadTodos();
  todos.push(newTodo);
  saveTodos(todos);
  renderTodos();
}

function toggleTodo(id) {
  const todos = loadTodos();
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos(todos);
    renderTodos();
  }
}

function deleteTodo(id) {
  let todos = loadTodos();
  todos = todos.filter((t) => t.id !== id);
  saveTodos(todos);
  renderTodos();
}
// function renderTodos() {
const todoList = document.getElementById("todo-list");
const filter = getFromStorage(FILTER_KEY, "all");
const todos = loadTodos();

todoList.innerHTML = "";

todos.forEach((todo) => {
  if (filter === "completed" && !todo.completed) return;
  if (filter === "active" && todo.completed) return;

  const li = document.createElement("li");
  li.textContent = todo.text;

  if (todo.completed) {
    li.style.textDecoration = "line-through";
  }

  // Toggle button
  const toggleBtn = document.createElement("button");
  toggleBtn.textContent = todo.completed ? "Undo" : "Complete";
  toggleBtn.addEventListener("click", () => toggleTodo(todo.id));

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

  li.appendChild(toggleBtn);
  li.appendChild(deleteBtn);
  todoList.appendChild(li);
});

// Update stats
const itemsLeft = todos.filter((t) => !t.completed).length;
document.getElementById("items-left").textContent = `${itemsLeft} items left`;

function renderTodos() {
  const todoList = document.getElementById("todo-list");
  const filter = getFromStorage(FILTER_KEY, "all");
  const todos = loadTodos();

  todoList.innerHTML = "";

  todos.forEach((todo) => {
    if (filter === "completed" && !todo.completed) return;
    if (filter === "active" && todo.completed) return;

    const li = document.createElement("li");
    li.textContent = todo.text;

    if (todo.completed) {
      li.style.textDecoration = "line-through";
    }

    // Toggle button
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = todo.completed ? "Undo" : "Complete";
    toggleBtn.addEventListener("click", () => toggleTodo(todo.id));

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

    li.appendChild(toggleBtn);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });

  // Update stats
  const itemsLeft = todos.filter((t) => !t.completed).length;
  document.getElementById("items-left").textContent = `${itemsLeft} items left`;
}

document.querySelectorAll(".filter").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".filter")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    saveToStorage(FILTER_KEY, btn.dataset.filter);
    renderTodos();
  });
});

document.getElementById("clear-completed").addEventListener("click", () => {
  let todos = loadTodos();
  todos = todos.filter((t) => !t.completed);
  saveTodos(todos);
  renderTodos();
});

document.getElementById("todo-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("todo-input");
  const text = input.value.trim();
  if (text) {
    addTodo(text);
    input.value = "";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  renderTodos();
});
