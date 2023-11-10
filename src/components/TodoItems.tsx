import React from "react";
import { Todo } from "./model";
import TodoItem from "./TodoItem";

interface Props {
  todos: Todo[];
  searchTerm: string;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const TodoItems: React.FC<Props> = ({ todos, setTodos, searchTerm }: Props) => {
   const filteredTodos = todos.filter((todo) =>
     todo.todo.toLowerCase().includes(searchTerm.toLowerCase())
   );

  return (
    <div className="container">
      <div className="todos">
        {filteredTodos.map((todo) => (
          <TodoItem
            todo={todo}
            key={todo.id}
            todos={todos}
            setTodos={setTodos}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoItems;
