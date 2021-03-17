import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Button,
  ButtonGroup,
} from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import DeleteIcon from "@material-ui/icons/Delete";

export default function TodoItem({ todo, getTodos }) {
  function handleComplete() {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: todo.id, completed: !todo.completed }),
    };
    fetch("/backend/update-todo", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .then(() => getTodos());
  }

  function handleDelete() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: todo.id }),
    };
    fetch("/backend/delete-todo", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .then(() => getTodos());
  }

  return (
    <Grid container justify="center">
      <Paper style={{ margin: "10px" }} elevation={3}>
        <Grid container direction="row">
          <Grid item xs={6}>
            <Typography
              variant="h6"
              className={todo.completed ? "completed" : ""}
            >
              {todo.text}
            </Typography>
          </Grid>
          <Grid item xs={6}>
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
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
