function highlight(table) {
  let table_body = table.getElementsByTagName('tBody')[0];
  let table_rows = table_body.getElementsByTagName('tr');
  Array.from(table_rows).forEach(row => {
    let data_available_value = row.querySelector('tr > [data-available]')?.getAttribute('data-available');
    if (data_available_value === 'true') {
      row.classList.add('available');
    } else if (data_available_value === 'false') {
      row.classList.add('unavailable');
    } else {
      row.hidden = true;
    }

    let age = row.children[1].innerText;
    if (age < 18) { row.style.textDecoration = 'line-through'; }

    let gender = row.children[2].innerText;
    if (gender === 'm') {
      row.classList.add('male');
    } else if (gender === 'f') {
      row.classList.add('female');
    }
  });
}
