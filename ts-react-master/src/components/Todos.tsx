import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import TodosInput from "./TodosInput";
import TodosItem from "./TodosItem";

export interface TodoItems {
  title: string;
  status: boolean;
  id: number;
}

const Todos = () => {
  const [todos, setTodos] = useState<TodoItems[]>([]);
  const handleAdd = (title: string) => {
    const payload = {
      title,
      status: false,
    };

    axios.post("http://localhost:8080/todos", payload).then(getTodos);
    // setTodos([...todos, payload]);
  };

  const handleDelete = (id: number) => {
    axios.delete(`http://localhost:8080/todos/${id}`).then(getTodos);
  };

  const handleToggle = (id: number, status: boolean) => {
    axios
      .patch(`http://localhost:8080/todos/${id}`, { status: status })
      .then(getTodos);
  };

  const getTodos = () => {
    axios
      .get("http://localhost:8080/todos")
      .then((response: AxiosResponse<TodoItems[]>) => setTodos(response.data));
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      <Header label="Todos" />
      <TodosInput onClick={handleAdd} />
      {todos.length > 0 &&
        todos.map((item) => (
          <TodosItem
            key={item.id}
            {...item}
            onClick={handleDelete}
            onChange={handleToggle}
            getTodos={getTodos}
          />
        ))}
    </div>
  );
};

export default Todos;
