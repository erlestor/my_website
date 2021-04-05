import React, { useState, useEffect } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

export default function HomePage() {
  const [roomCode, setRoomCode] = useState(null);

  useEffect(() => {
    fetch("/room_backend/user-in-room")
      .then((response) => response.json())
      .then((data) => {
        setRoomCode(data.code);
      });
  }, []);

  function clearRoomCode() {
    setRoomCode(null);
  }

  function renderHomePage() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} align="center">
          <Typography variant="h3" compact="h3">
            House Party
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button
              color="primary"
              component={Link}
              to="/prosjekt/musikk-lobby/join"
            >
              Join a Room
            </Button>
            <Button
              color="secondary"
              to="/prosjekt/musikk-lobby/create"
              component={Link}
            >
              Create a Room
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  }

  return (
    <div>
      <Route
        exact
        path="/prosjekt/musikk-lobby"
        render={() => {
          return roomCode ? (
            <Redirect to={`musikk-lobby/room/${roomCode}`} />
          ) : (
            renderHomePage()
          );
        }}
      />
      <Route path="/prosjekt/musikk-lobby/join" component={RoomJoinPage} />
      <Route path="/prosjekt/musikk-lobby/create/" component={CreateRoomPage} />
      <Route
        path="/prosjekt/musikk-lobby/room/:roomCode"
        render={(props) => {
          return <Room {...props} leaveRoomCallback={clearRoomCode} />;
        }}
      />
    </div>
  );
}
