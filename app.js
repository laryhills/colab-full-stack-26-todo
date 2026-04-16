// Manually selecting elements and updating the DOM
const button = document.getElementById("add-button");
const list = document.getElementById("todo-list");

/// read from localstorage
class LocalStorageService {
  static getItem(key) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  static setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

const todos = LocalStorageService.getItem("todos") || [];

function syncTodosWithLocalStorage() {
  LocalStorageService.setItem("todos", todos);
}

function addTodo(name) {
  const todo = {
    id: Date.now(),
    name,
    completed: false,
  };
  todos.push(todo);
  syncTodosWithLocalStorage();
  return todo;
}

function completeTodo(id) {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.completed = true;
    syncTodosWithLocalStorage();
    return todo;
  }
  return null;
}

function styleCompletedTodo(listItem) {
  listItem.style.textDecoration = "line-through";
  listItem.style.textDecorationColor = "red";
  listItem.style.cursor = "not-allowed";
}

function displayTodos() {
  const storedTodos = todos;
  list.innerHTML = ""; // clear existing list items
  storedTodos.forEach((todo) => {
    const listItem = document.createElement("li");
    listItem.textContent = todo.name;
    if (todo.completed) {
      styleCompletedTodo(listItem);
    }
    listItem.addEventListener("click", () => {
      completeTodo(todo.id);
      styleCompletedTodo(listItem);
    });
    list.appendChild(listItem);
  });
}

// call getTodos to initialize the list from localStorage
// function initializeTodos() {
//   displayTodos();
// }
displayTodos();

button.addEventListener("click", () => {
  const todoText = document.getElementById("todo-input").value;
  const newTodo = addTodo(todoText);
  displayTodos();

  // clear input
  document.getElementById("todo-input").value = "";
});
