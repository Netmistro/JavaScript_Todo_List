// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

// Event Listeners
todoButton.addEventListener('click', addTodo);

// Functions
function addTodo(event) {
  // Prevent form from submitting
  event.preventDefault();

  // Todo DIV
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  // Create LI
  const newTodo = document.createElement('li');
  newTodo.innerText = 'Hey';
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);

  // Completed or check-marked button
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fa-solid fa-check"></li>';
  completedButton.classList.add('complete-btn');
  todoDiv.appendChild(completedButton);

  // Trash button
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fa-solid fa-trash"></li>';
  trashButton.classList.add('trash-button');
  todoDiv.appendChild(trashButton);

  // Append to List
  todoList.appendChild(todoDiv);
}
