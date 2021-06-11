import React, { useState, useEffect } from "react"
import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core"
import TodoItem from "./TodoItem"

export default function Todolist() {
  const [inputText, setInputText] = useState("")
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    getTodos()
  }, [])

  function getTodos() {
    fetch("/backend/todos")
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)
        setTodos(data)
      })
    console.log(todos)
  }

  function handleTextChange(e) {
    setInputText(e.target.value)
  }

  function handleSubmit() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: inputText }),
    }
    fetch("/backend/create-todo", requestOptions)
      .then(response => response.json())
      .then(data => console.log(data))
      .then(() => {
        setInputText("")
        getTodos()
      })
  }

  function getPredicate() {
    if (filter === "completed") return todo => todo.completed
    if (filter === "notCompleted") return todo => !todo.completed
    return () => true
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
        <FormControl variant="outlined" style={{ minWidth: "200px" }}>
          <InputLabel>Filter</InputLabel>
          <Select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            label="Filter"
          >
            <MenuItem value={"all"}>All</MenuItem>
            <MenuItem value={"completed"}>Completed</MenuItem>
            <MenuItem value={"notCompleted"}>Not completed</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        {todos.filter(getPredicate()).map(todo => (
          <TodoItem todo={todo} getTodos={getTodos} />
        ))}
      </Grid>
    </Grid>
  )
}
