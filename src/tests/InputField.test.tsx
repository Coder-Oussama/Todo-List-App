import React, { useState } from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import InputField from "../components/InputField";

test("InputField renders correctly", () => {
  const { getByPlaceholderText } = render(
    <InputField todo="" setTodo={() => {}} handleAdd={() => {}} />
  );
  const inputElement = getByPlaceholderText("Enter a Task");
  expect(inputElement).toBeInTheDocument();
});

test("InputField handles input correctly", () => {
  const [inputValue, setInputValue] = useState<string>("");
  const setTodo: React.Dispatch<React.SetStateAction<string>> = (value) => {
      setInputValue(value);
  };

  render(
    <InputField todo={inputValue} setTodo={setTodo} handleAdd={() => {}} />
  );
  const inputElement = screen.getByPlaceholderText("Enter a Task");

  fireEvent.change(inputElement, { target: { value: "New Task" } });
  expect(inputValue).toBe("New Task");
});

test("InputField submits form correctly", () => {
  let submitted = false;
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    submitted = true;
  };

  render(<InputField todo="" setTodo={() => {}} handleAdd={handleAdd} />);
  const addButton = screen.getByText("Add");
  fireEvent.click(addButton);

  expect(submitted).toBe(true);
});
