import React, { useState, useEffect } from "react"
import "./sortingVisualizer.css"
import { Grid, List } from "@material-ui/core"
import Menu from "./Menu"

import { bubbleSort } from "./algs/bubbleSort"
import { mergeSort } from "./algs/mergeSort"
import { quickSort } from "./algs/quickSort"
import { heapSort } from "./algs/heapSort"

const SortingVisualizer = () => {
  const [alg, setAlg] = useState("heap")
  const [values, setValues] = useState([])

  useEffect(() => {
    scrambleValues()
  }, [])

  const scrambleValues = () => {
    const newValues = []
    for (let i = 0; i < getNumberOfValues(); i++) {
      // 1 - 100 (inkludert begge)
      const randomInt = Math.floor(Math.random() * 100) + 1
      newValues.push(randomInt)
    }
    setValues(newValues)
  }

  const sortValues = () => {
    const speed_multiplier = 1
    const time_per_action = Math.max(
      0.1,
      200 / values.length / speed_multiplier
    )

    const newValues = values.slice()
    let swaps = []
    if (alg === "bubble") swaps = bubbleSort(values)
    if (alg === "merge") swaps = mergeSort(values)
    if (alg === "quick") swaps = quickSort(values)
    if (alg === "heap") swaps = heapSort(values)

    for (let n = 0; n < swaps.length; n++) {
      const i1 = swaps[n][0]
      const i2 = swaps[n][1]
      const idx = swaps[n][0]
      const newVal = swaps[n][1]

      setTimeout(() => {
        if (n > 0 && swaps[n - 1].length > 2) {
          const old_pivot_idx = swaps[n - 1][2]
          changeClass([old_pivot_idx], "value")
        }
        if (swaps[n].length > 2) {
          const pivot_idx = swaps[n][2]
          changeClass([pivot_idx], "value pivot")
        }
        alg === "merge"
          ? changeClass([idx], "value switching")
          : changeClass([i1, i2], "value switching")
      }, n * 3 * time_per_action)
      setTimeout(() => {
        alg === "merge" ? setValue(newValues, idx, newVal) : swapValues(i1, i2)
      }, n * 3 * time_per_action + time_per_action)
      setTimeout(() => {
        alg === "merge"
          ? changeClass([idx], "value")
          : changeClass([i1, i2], "value")
      }, n * 3 * time_per_action + 2 * time_per_action)
    }
    setValues(newValues)
  }

  const changeClass = (indices, className) => {
    for (let n = 0; n < indices.length; n++) {
      document.getElementById(`value-${indices[n]}`).className = className
    }
  }

  const setValue = (values, i, newVal) => {
    // bytter verdi
    values[i] = newVal

    // bytter høyde
    const newHeight = Math.floor((newVal * getCanvasHeight()) / 100)
    document.getElementById(`value-${i}`).style.height = `${newHeight}px`
  }

  const swapValues = (i1, i2) => {
    // bytter verdi
    const oldValue = values[i1]
    values[i1] = values[i2]
    values[i2] = oldValue

    // bytter høyde
    const el1 = document.getElementById(`value-${i1}`)
    const el2 = document.getElementById(`value-${i2}`)
    const h1 = el1.style.height
    el1.style.height = el2.style.height
    el2.style.height = h1
  }

  const getCanvasWidth = () => {
    return Math.floor(window.innerWidth - 50)
  }

  const getCanvasHeight = () => {
    return Math.floor(window.innerHeight - 200)
  }

  const getNumberOfValues = () => {
    return Math.floor(getCanvasWidth() / 20)
    // return 2
  }

  const handleValueClick = el => {
    if (el.className === "value") el.className = "value switching"
    else if (el.className === "value switching") el.className = "value"
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
        <div
          className="container"
          style={{
            height: `${getCanvasHeight()}px`,
            width: `${getCanvasWidth()}px`,
          }}
        >
          {values.map((val, vidx) => {
            const height = Math.floor((val * getCanvasHeight()) / 100)
            return (
              <div
                id={`value-${vidx}`}
                className="value"
                style={{ height: height }}
                onClick={e => handleValueClick(e.target)}
              />
            )
          })}
        </div>
      </Grid>
    </Grid>
  )
}

export default SortingVisualizer
