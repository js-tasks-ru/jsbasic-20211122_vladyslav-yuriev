function filterRange(arr, a, b) {
  return arr.filter(number => {
    if (number >= a && number <= b) return number;
  });
}
