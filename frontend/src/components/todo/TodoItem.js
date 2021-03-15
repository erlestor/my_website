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

export default function TodoItem({ text, todo, todos, setTodos }) {
  const deleteHandler = () => {
    setTodos(todos.filter((el) => el.id !== todo.id));
  };

  const completeHandler = () => {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return item;
      })
    );
  };

  return (
    <Grid container item justify="center" alignItems="center">
      <Paper>
        <Grid container direction="row">
          <Typography
            variant="h6"
            className={todo.completed ? "completed" : ""}
          >
            {text}
          </Typography>
          <ButtonGroup>
            <Button
              variant="contained"
              color="primary"
              startIcon={<DoneIcon />}
              onClick={completeHandler}
            >
              Completed
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={deleteHandler}
            >
              Delete
            </Button>
          </ButtonGroup>
        </Grid>
      </Paper>
    </Grid>
  );
}
