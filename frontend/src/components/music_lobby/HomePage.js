import React, { Component } from "react";
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

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomCode: null,
    };
    this.clearRoomCode = this.clearRoomCode.bind(this);
  }

  async componentDidMount() {
    fetch("/room_backend/user-in-room")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          roomCode: data.code,
        });
      });
  }

  renderHomePage() {
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
              to="/prosjekt/musikk-lobby/join"
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

  clearRoomCode() {
    this.setState({
      roomCode: null,
    });
  }

  render() {
    return (
      <div>
        <Route
          exact
          path="/prosjekt/musikk-lobby"
          render={() => {
            return this.state.roomCode ? (
              <Redirect
                to={`prosjekt/musikk-lobby/room/${this.state.roomCode}`}
              />
            ) : (
              this.renderHomePage()
            );
          }}
        />
        <Route path="/prosjekt/musikk-lobby/join" component={RoomJoinPage} />
        <Route
          path="/prosjekt/musikk-lobby/create/"
          component={CreateRoomPage}
        />
        <Route
          path="/prosjekt/musikk-lobby/room/:roomCode"
          render={(props) => {
            return <Room {...props} leaveRoomCallback={this.clearRoomCode} />;
          }}
        />
      </div>
    );
  }
}
