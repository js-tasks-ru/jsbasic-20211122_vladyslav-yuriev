function getMinMax(str) {
  let sorted_arr = str
    .split(' ')
    .filter(num => !isNaN(num))
    .map(item => Number(item))
    .sort((a, b) => a - b );

  return { min: sorted_arr.at(0), max: sorted_arr.at(-1) };
}
