function makeDiagonalRed(table) {
  Array.from(table.rows).forEach((row, index) => {
    row.cells[index].style.backgroundColor = 'red';
  });
}
