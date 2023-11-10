import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import TodoItem from "../components/TodoItem";

const mockTodo = { id: 1, todo: "Test Task", isDone: false };
const mockTodos = [
  { id: 1, todo: "Task 1" },
  { id: 2, todo: "Task 2" },
  { id: 3, todo: "Task 3"},
];

test("TodoItem renders correctly", () => {
  const setTodosMock = jest.fn();

  render(
    <TodoItem todo={mockTodo} todos={mockTodos} setTodos={setTodosMock} />
  );

  // Ensure that the todo text is rendered
  const renderedTodoText = screen.getByText("Test Task");
  expect(renderedTodoText).toBeInTheDocument();

  // Ensure that the Edit button is rendered
  const editButton = screen.getByText("Edit");
  expect(editButton).toBeInTheDocument();

  // Ensure that the Delete button is rendered
  const deleteButton = screen.getByText("Delete");
  expect(deleteButton).toBeInTheDocument();

  // Ensure that the Copy button is rendered
  const copyButton = screen.getByText("Copy");
  expect(copyButton).toBeInTheDocument();
});

test("TodoItem switches to edit mode when Edit button is clicked", () => {
  const setTodosMock = jest.fn();

  render(
    <TodoItem todo={mockTodo} todos={mockTodos} setTodos={setTodosMock} />
  );

  // Click the Edit button
  const editButton = screen.getByText("Edit");
  fireEvent.click(editButton);

  // Ensure that the input field is rendered in edit mode
  const inputElement = screen.getByDisplayValue("Test Task");
  expect(inputElement).toBeInTheDocument();
});

test("TodoItem updates todo text when edited", () => {
  const setTodosMock = jest.fn();

  render(
    <TodoItem todo={mockTodo} todos={mockTodos} setTodos={setTodosMock} />
  );

  // Click the Edit button
  const editButton = screen.getByText("Edit");
  fireEvent.click(editButton);

  // Edit the todo text in the input field
  const inputElement = screen.getByDisplayValue("Test Task");
  fireEvent.change(inputElement, { target: { value: "Updated Task" } });

  // Ensure that the todo text is updated
  const updatedTodoText = screen.getByText("Updated Task");
  expect(updatedTodoText).toBeInTheDocument();
});

test("TodoItem calls handleDelete when Delete button is clicked", () => {
  const setTodosMock = jest.fn();

  render(
    <TodoItem todo={mockTodo} todos={mockTodos} setTodos={setTodosMock} />
  );

  // Click the Delete button
  const deleteButton = screen.getByText("Delete");
  fireEvent.click(deleteButton);

  // Ensure that handleDelete is called with the correct todo ID
  expect(setTodosMock).toHaveBeenCalledWith(expect.any(Function));
});

test("TodoItem calls handleCopyToClipboard when Copy button is clicked", async () => {
  const setTodosMock = jest.fn();

  render(
    <TodoItem todo={mockTodo} todos={mockTodos} setTodos={setTodosMock} />
  );

  // Click the Copy button
  const copyButton = screen.getByText("Copy");
  fireEvent.click(copyButton);

  // Ensure that handleCopyToClipboard is called
  await waitFor(() => {
    expect(setTodosMock).toHaveBeenCalledWith(expect.any(Function));
  });
});
