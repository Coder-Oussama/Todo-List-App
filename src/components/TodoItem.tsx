import React, { useEffect, useRef, useState } from "react";
import { Todo } from "./model";
import "./styles.css";
type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const TodoItem = ({ todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);
  return (
    <form className="todosSingle" onSubmit={(e) => handleEdit(e, todo.id)}>
      {edit ? (
        <input
          ref={inputRef}
          type="text"
          className="todosSingle--text"
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
        />
      ) : (
        <span className="todosSingle--text">{todo.todo}</span>
      )}
      <div>
        <div
          onClick={() => {
            if (edit === false) {
              setEdit(true);
            }
          }}
          className="btn btn-warning ml-2"
        >
          Edit
        </div>

        <div
          onClick={() => handleDelete(todo.id)}
          className="btn btn-danger ml-1"
        >
          Delete
        </div>
        <div onClick={() => {}} className="btn btn-primary ml-1">
          Copy
        </div>
      </div>
    </form>
  );
};

export default TodoItem;
