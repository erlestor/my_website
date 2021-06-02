export function mergeSort(values) {
    const swaps = []
    sort(values.slice(), swaps, 0)
    return swaps
}

const sort = (a, swaps, index) => {
    // hvis vi bare har en verdi avslutter vi rekursjonen
    if (a.length < 2) return a
    // finner midtpunktet
    const middle = Math.floor(a.length / 2)
    const left_a = a.slice(0, middle)
    const right_a = a.slice(middle, a.length)
    const sorted_left = sort(left_a, swaps, index)
    const sorted_right = sort(right_a, swaps, index+middle)
    return mergeArrays(sorted_left, sorted_right, swaps, index)
}

const mergeArrays = (a, b, swaps, index) => {
// her er index starten på a i forhold til selve listens
  const c = []

  let n_swaps = 0
  while (a.length && b.length) {
    if (a[0] > b[0]) {
    c.push(b.shift())
    swaps.push([index + n_swaps, index +n_swaps +  a.length])
    n_swaps++
    } else {
    c.push(a.shift())
    }
  }

  //if we still have values, let's add them at the end of `c`
  while (b.length) {
    c.push(b.shift())
    b++
  }

  return c
}