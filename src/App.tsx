import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import InputField from "./components/InputField";
import { Todo } from "./components/model";
import TodoItems from "./components/TodoItems";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo }]);
      setTodo("");
    }
  };

  return (
    <div className="app">
      <span className="heading">Todo App</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoItems todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;
