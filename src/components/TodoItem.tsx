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
  const [isCopied, setIsCopied] = useState<boolean>(false);
  
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
    const handleCopyToClipboard = () => {
      // Create a temporary textarea element
      const textarea = document.createElement("textarea");
      textarea.value = editTodo;

      // Append the textarea to the document
      document.body.appendChild(textarea);

      // Select the text inside the textarea
      textarea.select();

      // Copy the selected text to the clipboard
      document.execCommand("copy");

      // Remove the temporary textarea
      document.body.removeChild(textarea);

      // Update state to indicate successful copy
      setIsCopied(true);

      // Reset the copied state after a short delay
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    };
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
        <div
          onClick={handleCopyToClipboard}
          className={`btn btn-primary ml-1 ${isCopied ? "copied" : ""}`}
        >
          {isCopied ? "Copied" : "Copy"}
        </div>
      </div>
    </form>
  );
};

export default TodoItem;
