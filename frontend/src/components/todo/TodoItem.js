import React from "react"
import { Paper, Typography, Button, ButtonGroup } from "@material-ui/core"
import DoneIcon from "@material-ui/icons/Done"
import DeleteIcon from "@material-ui/icons/Delete"
import styles from "./TodoItemStyles.module.css"

const TodoItem = props => {
  const { todo, getTodos, moveTodo, setMoveTodo, todoIdx } = props
  const isSelected = todoIdx == moveTodo

  function handleComplete() {
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: todo.id,
        completed: !todo.completed,
      }),
    }
    fetch("/backend/update-todo", requestOptions)
      .then(response => response.json())
      .then(data => console.log(data))
      .then(() => getTodos())
  }

  function handleDelete() {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: todo.id }),
    }
    fetch("/backend/delete-todo", requestOptions)
      .then(response => response.json())
      .then(data => console.log(data))
      .then(() => getTodos())
  }

  return (
    <Paper
      className={`${styles.todo} ${isSelected ? styles.selected : ""}`}
      elevation={3}
      onMouseDown={() => setMoveTodo(todoIdx)}
    >
      <Typography
        className={todo.completed ? styles.completed : ""}
        variant="h6"
        style={{ marginRight: "15px" }}
      >
        {todoIdx} : {todo.text}
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

export default TodoItem
