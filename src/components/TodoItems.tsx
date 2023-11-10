import React from "react";
import { Todo } from "./model";
import TodoItem from "./TodoItem";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const TodoItems: React.FC<Props> = ({ todos, setTodos }: Props) => {
  return (
    <div className="container">
      <div className="todos">
        {todos.map((todo) => (
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
