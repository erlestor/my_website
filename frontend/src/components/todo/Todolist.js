import React, { useState, useEffect } from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import TodoItem from "./TodoItem";

export default function Todolist() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);

  function handleTextChange(e) {
    setInputText(e.target.value);
    console.log(inputText);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (e != "") {
      setTodos([
        ...todos,
        { text: inputText, completed: false, id: Math.random() * 1000 }, // id byttes ut med django sin backend
      ]);
      setInputText("");
    }
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
