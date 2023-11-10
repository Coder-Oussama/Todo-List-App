
import { render, screen } from "@testing-library/react";
import TodoItems from "../components/TodoItems";

const mockTodos = [
  { id: 1, todo: "Task 1" },
  { id: 2, todo: "Task 2" },
  { id: 3, todo: "Task 3" },
];

test("TodoItems renders filtered todos correctly", () => {
  const searchTerm = "Task 1";
  const setTodosMock = jest.fn();

  render(
    <TodoItems
      todos={mockTodos}
      setTodos={setTodosMock}
      searchTerm={searchTerm}
    />
  );

  const renderedTodo = screen.getByText("Task 1");
  expect(renderedTodo).toBeInTheDocument();

  const notRenderedTodo2 = screen.queryByText("Task 2");
  const notRenderedTodo3 = screen.queryByText("Task 3");
  expect(notRenderedTodo2).not.toBeInTheDocument();
  expect(notRenderedTodo3).not.toBeInTheDocument();
});

test("TodoItems renders all todos when searchTerm is an empty string", () => {
  const searchTerm = "";
  const setTodosMock = jest.fn();

  render(
    <TodoItems
      todos={mockTodos}
      setTodos={setTodosMock}
      searchTerm={searchTerm}
    />
  );

  const renderedTodo1 = screen.getByText("Task 1");
  const renderedTodo2 = screen.getByText("Task 2");
  const renderedTodo3 = screen.getByText("Task 3");
  expect(renderedTodo1).toBeInTheDocument();
  expect(renderedTodo2).toBeInTheDocument();
  expect(renderedTodo3).toBeInTheDocument();
});

test("TodoItems renders no todos when there are no matches", () => {
  const searchTerm = "Non-existent Task";
  const setTodosMock = jest.fn();

  render(
    <TodoItems
      todos={mockTodos}
      setTodos={setTodosMock}
      searchTerm={searchTerm}
    />
  );

  const notRenderedTodo1 = screen.queryByText("Task 1");
  const notRenderedTodo2 = screen.queryByText("Task 2");
  const notRenderedTodo3 = screen.queryByText("Task 3");
  expect(notRenderedTodo1).not.toBeInTheDocument();
  expect(notRenderedTodo2).not.toBeInTheDocument();
  expect(notRenderedTodo3).not.toBeInTheDocument();
});
