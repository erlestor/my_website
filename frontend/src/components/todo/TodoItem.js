import React from "react"
import { Paper, Typography, Button, ButtonGroup } from "@material-ui/core"
import DoneIcon from "@material-ui/icons/Done"
import DeleteIcon from "@material-ui/icons/Delete"

export default function TodoItem({ todo, getTodos }) {
  function handleComplete() {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: todo.id, completed: !todo.completed }),
    }
    fetch("/backend/update-todo", requestOptions)
      .then(response => response.json())
      .then(data => console.log(data))
      .then(() => getTodos())
  }

  function handleDelete() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: todo.id }),
    }
    fetch("/backend/delete-todo", requestOptions)
      .then(response => response.json())
      .then(data => console.log(data))
      .then(() => getTodos())
  }

  return (
    <Paper
      style={{
        margin: "10px",
        display: "flex",
        justifyContent: "space-between",
        padding: "5px",
      }}
      elevation={3}
    >
      <Typography
        variant="h6"
        className={todo.completed ? "completed" : ""}
        style={{ marginRight: "15px" }}
      >
        {todo.text}
      </Typography>
      <ButtonGroup>
        <Button
          variant="contained"
          color="primary"
          startIcon={<DoneIcon />}
          onClick={handleComplete}
        >
          Completed
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </ButtonGroup>
    </Paper>
  )
}
