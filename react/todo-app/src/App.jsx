import { useState } from "react";
import "./App.css";
import { useLocalStorage } from "./hooks";

function App() {
  const [inputText, setInputText] = useState("");

  // custom hook
  const [savedTodos, setSavedTodos] = useLocalStorage("todos", []);

  function addTodo(name) {
    const todo = {
      id: Date.now(),
      name,
      completed: false,
    };
    setSavedTodos((prevTodos) => [...prevTodos, todo]);
    /* const updatedTodos = [...todos, todo];
    setTodos(updatedTodos); */
    setInputText("");
    return todo;
  }

  function completeTodo(id) {
    const todo = savedTodos.find((t) => t.id === id);
    if (todo) {
      const updatedTodo = { ...todo, completed: true };
      setSavedTodos((prevTodos) =>
        prevTodos.map((t) => (t.id === id ? updatedTodo : t)),
      );
      return;
    }
    alert("Todo not found");
  }

  /* useEffect(() => {
    console.log("use effect");
    console.log(todos);
  }, [todos]); */

  return (
    <>
      <h1>Todo app</h1>
      <div className="container">
        <input
          type="text"
          placeholder="Enter a new todo"
          required
          value={inputText}
          onKeyDown={(f) => f.key === "Enter" && addTodo(inputText)}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button type="button" onClick={() => addTodo(inputText)}>
          Add Todo
        </button>
      </div>

      <div className="container">
        <ul>
          {[...savedTodos]
            .sort((a, b) => a.completed - b.completed || a.id - b.id)
            .map((todo) => (
              <li
                key={todo.id}
                className={todo.completed ? "completed" : ""}
                onClick={() => completeTodo(todo.id)}
              >
                {todo.name}
              </li>
            ))}
        </ul>

        <pre>{JSON.stringify(savedTodos, null, 2)}</pre>
      </div>
    </>
  );
}

export default App;
