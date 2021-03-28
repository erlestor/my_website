import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Slide,
} from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteDialog(props) {
  const { openAlert, setOpenAlert, handleDeleteEvent } = props;

  return (
    <Dialog
      open={openAlert}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setOpenAlert(false)}
    >
      <DialogTitle id="alert-dialog-slide-title">{"Delete event?"}</DialogTitle>
      <DialogActions>
        <Button onClick={() => setOpenAlert(false)} color="primary">
          Disagree
        </Button>
        <Button onClick={handleDeleteEvent} color="primary">
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
