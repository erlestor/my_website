export function bubbleSort(values) {
  let numberOfSwaps = 1
  const swaps = []
  const list = values.slice()

  while (numberOfSwaps > 0) {
    numberOfSwaps = 0

    for (let i = 1; i < list.length; i++) {
      if (list[i - 1] > list[i]) {
        const oldValue = list[i]
        list[i] = list[i - 1]
        list[i - 1] = oldValue

        numberOfSwaps++
        swaps.push(i)
      }
    }
  }

  return swaps
}
