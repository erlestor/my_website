import React, { useState, useEffect } from "react"
import "./sortingVisualizer.css"
import { Grid } from "@material-ui/core"
import Menu from "./Menu"

import { bubbleSort } from "./algs/bubbleSort"
import { mergeSort } from "./algs/mergeSort"

const SortingVisualizer = () => {
  const [alg, setAlg] = useState("merge")
  const [values, setValues] = useState([])
  const [numberOfValues, setNumberOfValues] = useState(40)
  
  useEffect(() => {
    scrambleValues()
  }, [])

  const scrambleValues = () => {
    const newValues = []
    for (let i = 0; i < numberOfValues; i++) {
      // 1 - 100 (inkludert begge)
      const randomInt = Math.floor(Math.random() * 100) + 1
      newValues.push(randomInt)
    }
    setValues(newValues)
  }

  const sortValues = () => {
    const speed = 10
    const newValues = values
    let swaps = []
    if (alg === "bubble") swaps = bubbleSort(values)
    if (alg === "merge") swaps = mergeSort(values)

    for (let n = 0; n < swaps.length; n++) {
      const i1 = swaps[n][0]
      const i2 = swaps[n][1]
      setTimeout(() => {
        colorRed(i1, i2)
      }, n * 3 * speed)
      setTimeout(() => {
        switchHeights(i1, i2)
        switchValues(newValues, i1, i2)
      }, n * 3 * speed + speed)
      setTimeout(() => {
        colorNormal(i1, i2)
      }, n * 3 * speed + 2 * speed)
    }
    setValues(newValues)
  }

  const colorRed = (i1, i2) => {
    document.getElementById(`value-${i1}`).className = "value switching"
    document.getElementById(`value-${i2}`).className = "value switching"
  }

  const colorNormal = (i1, i2) => {
    document.getElementById(`value-${i1}`).className = "value"
    document.getElementById(`value-${i2}`).className = "value"
  }

  const switchHeights = (i1, i2) => {
    const h1 = document.getElementById(`value-${i1}`).style.height
    const h2 = document.getElementById(`value-${i2}`).style.height
    document.getElementById(`value-${i1}`).style.height = h2
    document.getElementById(`value-${i2}`).style.height = h1
  }

  const switchValues = (values, i1, i2) => {
    const oldValue = values[i1]
    values[i1] = values[i2]
    values[i2] = oldValue
  }

  const getCanvasHeight = () => {
    return Math.floor(window.innerHeight - 200)
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
        <div className="container" style={{height: `${getCanvasHeight()}px`}}>
          {values.map((val, vidx) => {
            const height = Math.floor(val * getCanvasHeight()/100)
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
