export function mergeSort(values) {
  const swaps = []
  const a = values.slice()
  sort(a, swaps, 0)
  return swaps
}

const sort = (a, swaps, idx) => {
  // hvis vi bare har en verdi avslutter vi rekursjonen
  if (a.length < 2) return a
  // finner midtpunktet
  const middle = Math.floor(a.length / 2)
  const left_a = a.slice(0, middle)
  const right_a = a.slice(middle, a.length)
  const sorted_left = sort(left_a, swaps, idx)
  const sorted_right = sort(right_a, swaps, idx + middle)
  return mergeArrays(sorted_left, sorted_right, swaps, idx)
}

const mergeArrays = (a, b, swaps, idx) => {
  // idx er startpunktet (index) til dette segmentet i den orginale listen
  const c = []

  // FANT PROBLEMET:
  // preIndices og postIndices tilsvarer bare ny posisjon og gammel posisjon
  // man kan ikke bare swappe den nye og den gamle for å få riktig resultat

  // FORSLAG TIL LØSNING:
  // ikke endre preIndices og postIndices
  // heller regne ut hvilke swaps som trengs for å bytte alle verdiene når c er ferdig lagd

  let a_idx = 0
  let b_idx = 0
  while (a_idx < a.length && b_idx < b.length) {
    if (a[a_idx] > b[b_idx]) {
      c.push(b[b_idx])
      b_idx++
    } else {
      c.push(a[a_idx])
      a_idx++
    }
  }

  //if we still have values, let's add them at the end of `c`
  while (a_idx < a.length) {
    c.push(a[a_idx])
    a_idx++
  }
  while (b_idx < b.length) {
    c.push(b[b_idx])
    b_idx++
  }

  // hvordan få riktige swaps
  // - vi lagrer istedet segmenter som blir merget
  for (let i = 0; i < c.length; i++) {
    swaps.push([idx + i, c[i]])
  }

  return c
}
