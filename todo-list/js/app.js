import { state } from "./state.js";
import { save, load } from "./storage.js";
import { renderTodos } from "./ui.js";
import { generateId } from "./utils.js";

function init() {
  state.todos = load("todos");
  renderTodos();

  document.getElementById("add-btn").addEventListener("click", () => {
    const input = document.getElementById("todo-input");
    state.todos.push({ id: generateId(), text: input.value });
    save("todos", state.todos);
    renderTodos();
    input.value = "";
  });
}

init();
