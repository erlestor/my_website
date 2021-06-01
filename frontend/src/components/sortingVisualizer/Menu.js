import React from "react"

import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ButtonGroup,
  Button,
} from "@material-ui/core"

const Menu = props => {
  const { alg, setAlg, sortValues, scrambleValues } = props

  return (
    <Grid container item xs={12} align="center" justify="center">
      <FormControl style={{ width: "200px" }}>
        <InputLabel>Pick an Algorithm</InputLabel>
        <Select
          value={alg}
          onChange={e => setAlg(e.target.value)}
          style={{ textAlign: "left" }}
        >
          <MenuItem value={"bubble"}>Bubble Sort</MenuItem>
        </Select>
      </FormControl>
      <ButtonGroup variant="contained">
        <Button color="primary" onClick={sortValues}>
          Visualize Algorithm
        </Button>
        <Button color="secondary" onClick={scrambleValues}>
          Scramble data
        </Button>
      </ButtonGroup>
    </Grid>
  )
}

export default Menu
