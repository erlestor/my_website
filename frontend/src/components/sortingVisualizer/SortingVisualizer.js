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
    const speed = 10
    const swaps = bubbleSort(values)
    console.log(swaps.length)

    for (let n = 0; n < swaps.length; n++) {
      const i = swaps[n]
      const i1 = i - 1
      const i2 = i
      setTimeout(() => {
        colorRed(i1, i2)
      }, n * 3 * speed)
      setTimeout(() => {
        switchValues(i1, i2)
      }, n * 3 * speed + speed)
      setTimeout(() => {
        colorNormal(i1, i2)
      }, n * 3 * speed + 2 * speed)
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
    const newValues = values.slice()
    const oldValue = newValues[i1]
    newValues[i1] = newValues[i2]
    newValues[i2] = oldValue
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
          {values.map((val, vidx) => {
            const height = Math.floor(val * 7)
            return (
              <div
                id={`value-${vidx}`}
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
