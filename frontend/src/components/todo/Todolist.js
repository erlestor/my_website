import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, FormControl } from "@material-ui/core";
import TodoItem from "./TodoItem";

export default function Todolist() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos();
  }, []); // arrayen definerer når den skal sjekke på nytt

  function getTodos() {
    fetch("/backend/todos")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setTodos(data);
      });
    console.log(todos);
  }

  function handleTextChange(e) {
    setInputText(e.target.value);
  }

  function handleSubmit() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: inputText }),
    };
    fetch("/backend/create-todo", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .then(() => {
        setInputText("");
        getTodos();
      });
  }

  return (
    <Grid container spacing={6} justify="center" align="center">
      <Grid container item xs={12} justify="center">
        <TextField
          label="Todo"
          variant="outlined"
          onChange={handleTextChange}
          value={inputText}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Legg til
        </Button>
      </Grid>
      <Grid item>
        {todos.map((todo) => (
          <TodoItem todo={todo} getTodos={getTodos} />
        ))}
      </Grid>
    </Grid>
  );
}
