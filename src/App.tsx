import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import InputField from "./components/InputField";
import { Todo } from "./components/model";
import TodoItems from "./components/TodoItems";
import SearchBar from "./components/SearchBar";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo }]);
      setTodo("");
    }
  };

  return (
    <div className="app">
      <div className="w-75">
        <span className="heading float-left mr-5">Todo App</span>
        <div className="float-right mt-5 ml-5 ">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </div>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />

      <TodoItems todos={todos} setTodos={setTodos} searchTerm={searchTerm} />
    </div>
  );
};

export default App;
