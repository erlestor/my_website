import React, { useState, useEffect } from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import TodoItem from "./TodoItem";

export default function Todolist() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);

  // useEffect(() => {
  //   setTodos();
  // }, []);

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
      .then((data) => console.log(data));
    setInputText("");
  }

  return (
    <Grid container>
      <Grid container item justify="center" style={{ marginBottom: "20px" }}>
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
      <Grid container justify="center">
        {todos.map((todo) => (
          <TodoItem
            text={todo.text}
            todo={todo}
            todos={todos}
            setTodos={setTodos}
          />
        ))}
      </Grid>
    </Grid>
  );
}
