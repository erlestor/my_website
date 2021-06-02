export function bubbleSort(values) {
  let list = values.slice()
  let swaps = []

  while (true) {
    let numberOfSwaps = 0

    for (let i = 1; i < list.length; i++) {
      if (list[i - 1] > list[i]) {
        const oldValue = list[i]
        list[i] = list[i - 1]
        list[i - 1] = oldValue

        numberOfSwaps++
        swaps.push(i)
      }
    }

    if (numberOfSwaps === 0) break
  }

  return swaps
}
