import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import InputField from "./components/InputField";
import { Todo } from "./components/model";
import TodoItems from "./components/TodoItems";
import SearchBar from "./components/SearchBar";

const App: React.FC = () => {
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // Save todos to localStorage whenever todos change

  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo }]);
      setTodo("");
      localStorage.setItem(
        "todos",
        JSON.stringify([...todos, { id: Date.now(), todo }])
      );
    }
  };

  // useEffect(() => {
  //   localStorage.setItem("todos", JSON.stringify(todos));
  // }, [todos]);
  return (
    <div className="app">
      <div className="w-75 head">
        <span className="heading float-left mr-5">TodoApp</span>
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
