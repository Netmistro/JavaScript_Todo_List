// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

// Event Listeners
document.addEventListener("DOMContentLoaded", renderTodosFromStorage);
todoButton.addEventListener("click", handleAddTodo);
todoList.addEventListener("click", handleTodoAction);

// Modern: Unique ID for each todo for robust storage/removal
function generateId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

// Handle adding a new todo
function handleAddTodo(event) {
  event.preventDefault();
  const text = todoInput.value.trim();
  if (!text) {
    todoInput.classList.add("error");
    todoInput.placeholder = "Please enter a task!";
    setTimeout(() => {
      todoInput.classList.remove("error");
      todoInput.placeholder = "";
    }, 1200);
    return;
  }

  const todoObj = {
    id: generateId(),
    text,
    completed: false,
  };

  addTodoToDOM(todoObj);
  saveTodoToStorage(todoObj);

  todoInput.value = "";
}

// Handle complete/delete actions
function handleTodoAction(e) {
  const btn = e.target.closest("button");
  if (!btn) return;
  const todoDiv = btn.closest(".todo");
  const todoId = todoDiv?.dataset.id;

  if (btn.classList.contains("trash-btn")) {
    todoDiv.classList.add("fall");
    removeTodoFromStorage(todoId);
    todoDiv.addEventListener("transitionend", () => todoDiv.remove());
  } else if (btn.classList.contains("complete-btn")) {
    todoDiv.classList.toggle("completed");
    toggleTodoCompleted(todoId);
  }
}

// Render a single todo object to the DOM
function addTodoToDOM({ id, text, completed }) {
  const todoDiv = document.createElement("div");
  todoDiv.className = "todo";
  if (completed) todoDiv.classList.add("completed");
  todoDiv.dataset.id = id;

  const newTodo = document.createElement("li");
  newTodo.innerText = text;
  newTodo.className = "todo-item";
  todoDiv.appendChild(newTodo);

  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
  completedButton.className = "complete-btn";
  completedButton.setAttribute("aria-label", "Mark as completed");
  todoDiv.appendChild(completedButton);

  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  trashButton.className = "trash-btn";
  trashButton.setAttribute("aria-label", "Delete task");
  todoDiv.appendChild(trashButton);

  todoList.appendChild(todoDiv);
}

// Storage helpers
function getTodosFromStorage() {
  try {
    return JSON.parse(localStorage.getItem("todos")) || [];
  } catch {
    return [];
  }
}

function saveTodoToStorage(todoObj) {
  const todos = getTodosFromStorage();
  todos.push(todoObj);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeTodoFromStorage(id) {
  let todos = getTodosFromStorage();
  todos = todos.filter((todo) => todo.id !== id);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function toggleTodoCompleted(id) {
  const todos = getTodosFromStorage();
  const idx = todos.findIndex((todo) => todo.id === id);
  if (idx > -1) {
    todos[idx].completed = !todos[idx].completed;
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}

// Render all todos from storage
function renderTodosFromStorage() {
  todoList.innerHTML = "";
  getTodosFromStorage().forEach(addTodoToDOM);
}
