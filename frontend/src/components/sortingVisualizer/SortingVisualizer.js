import React, { useState, useEffect } from "react"
import "./sortingVisualizer.css"
import { Grid } from "@material-ui/core"
import Menu from "./Menu"

import { bubbleSort } from "./algs/bubbleSort"

const SortingVisualizer = () => {
  const [alg, setAlg] = useState("bubble")
  const [values, setValues] = useState([])

  useEffect(() => {
    scrambleValues()
  }, [])

  const scrambleValues = () => {
    const newValues = []
    for (let i = 0; i < 30; i++) {
      const randomInt = Math.floor(Math.random() * 100) + 1
      newValues.push(randomInt)
    }
    setValues(newValues)
  }

  const sortValues = () => {
    const swaps = bubbleSort(values)
    console.log(swaps)
    for (let n = 0; n < swaps.length; n++) {
      const i = swaps[n]
      setTimeout(() => {
        colorRed(i - 1, i)
      }, n * 3000)
      setTimeout(() => {
        switchValues(i - 1, i)
      }, n * 3000 + 1000)
      setTimeout(() => {
        colorNormal(i - 1, i)
      }, n * 3000 + 2000)
    }
  }

  const colorRed = (i1, i2) => {
    document.getElementById(`value-${i1}`).className = "value switching"
    document.getElementById(`value-${i2}`).className = "value switching"
  }

  const colorNormal = (i1, i2) => {
    document.getElementById(`value-${i1}`).className = "value"
    document.getElementById(`value-${i2}`).className = "value"
  }

  const switchValues = (i1, i2) => {
    const newValues = (values.slice()[(newValues[0], newValues[1])] = [
      newValues[1],
      newValues[0],
    ])
    setValues(newValues)
  }

  return (
    <Grid container id="pathfinding" direction="column" id="sorting">
      <Menu
        sortValues={sortValues}
        scrambleValues={scrambleValues}
        alg={alg}
        setAlg={setAlg}
      />
      <Grid item xs={12} align="center">
        <div className="container">
          {values.map(val => {
            const height = Math.floor(val * 7)
            const index = values.indexOf(val)
            return (
              <div
                id={`value-${index}`}
                className="value"
                style={{ height: height }}
              />
            )
          })}
        </div>
      </Grid>
    </Grid>
  )
}

export default SortingVisualizer
