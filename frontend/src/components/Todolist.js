import React, { useState, useEffect } from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import Event from "./Event";

export default function Todolist() {
  const [text, setText] = useState("");
  const [events, setEvents] = useState([]);
  const [eventId, setEventId] = useState(1);

  useEffect(() => {
    console.log("hva faen");
  }, [events]);

  function createEventId() {
    setEventId((eventId) => {
      return ++eventId;
    });
    return eventId;
  }

  function handleTextChange(e) {
    setText(e.target.value);
  }

  function handleSubmit() {
    setEvents((events) => {
      events.push({
        id: createEventId(),
        text: text,
      });
    });
  }

  return (
    <Grid container>
      <Grid container item justify="center">
        <TextField
          label="Todo"
          variant="outlined"
          onChange={handleTextChange}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Legg til
        </Button>
      </Grid>
      <Grid container item xs={12} justify="center">
        {events.map((event) => (
          <Event text={event.text} />
        ))}
      </Grid>
    </Grid>
  );
}
