import { state } from "./state.js";

export function renderTodos() {
  const list = document.getElementById("todo-list");
  list.innerHTML = "";
  state.todos.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo.text;
    list.appendChild(li);
  });
}
