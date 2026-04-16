import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState("");

  function addTodo(name) {
    const todo = {
      id: Date.now(),
      name,
      completed: false,
    };
    setTodos((prevTodos) => [...prevTodos, todo]);
    /* const updatedTodos = [...todos, todo];
    setTodos(updatedTodos); */
    setInputText("");
    return todo;
  }

  function completeTodo(id) {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      const updatedTodo = { ...todo, completed: true };
      setTodos((prevTodos) =>
        prevTodos.map((t) => (t.id === id ? updatedTodo : t)),
      );
      return;
    }
    alert("Todo not found");
  }

  useEffect(() => {
    console.log("use effect");
    console.log(todos);
  }, [todos]);

  return (
    <>
      <h1>Todo app</h1>
      <div className="container">
        <input
          type="text"
          placeholder="Enter a new todo"
          required
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button type="button" onClick={() => addTodo(inputText)}>
          Add Todo
        </button>
      </div>

      <div className="container">
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={todo.completed ? "completed" : ""}
              onClick={() => completeTodo(todo.id)}
            >
              {todo.name}
            </li>
          ))}
        </ul>

        <pre>{JSON.stringify(todos, null, 2)}</pre>
      </div>
    </>
  );
}

export default App;
