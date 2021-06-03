// min metode
export function quickSort(values) {
  const swaps = []
  const list = values.slice()
  sort(0, list.length - 1, list, swaps)
  return swaps
}

// The main function that implements QuickSort
const sort = (start, end, array, swaps) => {
  if (start < end) {
    // p is partitioning index, array[p]
    // is at right place
    const p = partition(start, end, array, swaps)

    // Sort elements before partition
    // and after partition
    sort(start, p - 1, array, swaps)
    sort(p + 1, end, array, swaps)
  }
}

// helper function
const partition = (start, end, array, swaps) => {
  // Initializing pivot's index to start
  const pivot_index = start
  const pivot = array[pivot_index]

  // This loop runs till start pointer crosses
  // end pointer, and when it does we swap the
  // pivot with element on end pointer
  while (start < end) {
    // Increment the start pointer till it finds an
    // element greater than  pivot
    while (start < array.length && array[start] <= pivot) {
      start += 1
    }

    // Decrement the end pointer till it finds an
    // element less than pivot
    while (array[end] > pivot) {
      end -= 1
    }

    // If start and end have not crossed each other
    // (meaning they are in the wrong order)
    // swap the numbers on start and end,
    if (start < end) {
      const oldValue = array[start]
      array[start] = array[end]
      array[end] = oldValue

      swaps.push([start, end, pivot_index])
    }
  }

  // Swap pivot element with element on end pointer.
  // This puts pivot on its correct sorted place.
  const oldValue = array[pivot_index]
  array[pivot_index] = array[end]
  array[end] = oldValue
  swaps.push([pivot_index, end, pivot_index])

  // Returning end pointer to divide the array into 2
  return end
}
