import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Slide,
} from "@material-ui/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import nbLocale from "@fullcalendar/core/locales/nb";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Calendar() {
  // copy paste dialog greier
  const [openAlert, setOpenAlert] = React.useState(false);
  const [lastClickedEvent, setLastClickedEvent] = React.useState(0);

  const handleAlertOpen = () => {
    setOpenAlert(true);
  };

  const handleAlertClose = () => {
    setOpenAlert(false);
  };

  const [currentEvents, setCurrentEvents] = useState([]);
  const [eventId, setEventId] = useState(1);

  function createEventId() {
    setEventId((eventId) => ++eventId);
    return eventId;
  }

  const handleDateSelect = (selectInfo) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  const handleEventClick = (clickInfo) => {
    setLastClickedEvent(clickInfo.event.id);
    setOpenAlert(true);
  };

  const deleteEvent = () => {
    setOpenAlert(false);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: lastClickedEvent }),
    };
    fetch("/backend/delete-event", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const addEvent = (event) => {
    console.log(event.event.title);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: event.event.title,
        start: event.event.start,
        end: event.event.end,
        allDay: event.event.allDay,
      }),
    };
    fetch("/backend/create-event", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const handleEvents = (events) => {
    setCurrentEvents(events);
  };

  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }

  return (
    <Grid container justify="center" style={{ fontFamily: "Roboto" }}>
      <Grid item xs={6}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          locale={nbLocale}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          events={"/backend/events"}
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          eventAdd={addEvent}
          /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
        />
        <Dialog
          open={openAlert}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleAlertClose}
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Delete event?"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleAlertClose} color="primary">
              Disagree
            </Button>
            <Button onClick={deleteEvent} color="primary">
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
}
