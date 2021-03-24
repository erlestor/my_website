import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import nbLocale from "@fullcalendar/core/locales/nb";
import DeleteDialog from "./DeleteDialog";

export default function Calendar() {
  // copy paste dialog greier
  const [openAlert, setOpenAlert] = React.useState(false);
  const [lastClickedEvent, setLastClickedEvent] = React.useState({});

  const [currentEvents, setCurrentEvents] = useState([]);

  const handleDateSelect = (selectInfo) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
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

  const updateEvent = (event) => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: event.event.id,
        title: event.event.title,
        description: event.event.description,
        start: event.event.start,
        end: event.event.end,
        allDay: event.event.allDay,
      }),
    };
    fetch("/backend/update-event", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const handleEventClick = (clickInfo) => {
    setLastClickedEvent(clickInfo.event);
    setOpenAlert(true);
  };

  const handleDeleteEvent = () => {
    setOpenAlert(false);
    lastClickedEvent.remove();
  };

  const deleteEvent = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: lastClickedEvent.id }),
    };
    fetch("/backend/delete-event", requestOptions)
      .then((response) => response.json())
      .then((data) => setLastClickedEvent({}));
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
      <Grid item xs={12} sm={6}>
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
          eventChange={updateEvent}
          eventRemove={deleteEvent}
        />
        <DeleteDialog
          openAlert={openAlert}
          setOpenAlert={setOpenAlert}
          handleDeleteEvent={handleDeleteEvent}
        />
      </Grid>
    </Grid>
  );
}
