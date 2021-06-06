export function heapSort(values) {
  const list = values.slice()
  const swaps = []
  sort(list, swaps)
  return swaps
}

function sort(arr, swaps) {
  var n = arr.length

  // Build heap (rearrange array)
  for (let i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i, swaps)

  // One by one extract an element from heap
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    const temp = arr[0]
    arr[0] = arr[i]
    arr[i] = temp

    // call max heapify on the reduced heap
    heapify(arr, i, 0, swaps)
  }
}

// To heapify a subtree rooted with node i which is
// an index in arr[]. n is size of heap
function heapify(arr, n, i, swaps) {
  let largest = i // Initialize largest as root
  const l = 2 * i + 1 // left = 2*i + 1
  const r = 2 * i + 2 // right = 2*i + 2

  // If left child is larger than root
  if (l < n && arr[l] > arr[largest]) largest = l

  // If right child is larger than largest so far
  if (r < n && arr[r] > arr[largest]) largest = r

  // If largest is not root
  if (largest != i) {
    var swap = arr[i]
    arr[i] = arr[largest]
    arr[largest] = swap

    swaps.push([i, largest])

    // Recursively heapify the affected sub-tree
    heapify(arr, n, largest, swaps)
  }
}
