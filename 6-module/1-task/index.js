  /**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.elem = this.elem();
  }

  elem() {
    const table = document.createElement('table');
    const header = document.createElement('thead');
    const body = document.createElement('tbody');

    header.innerHTML = `<tr><th>Имя</th><th>Возраст</th><th>Зарплата</th><th>Город</th><th></th></tr>`; 
    table.append(header) 

    const tdArr = this.rows.map(row => {
      return `<tr><td>${row.name}</td><td>${row.age}</td><td>${row.salary}</td><td>${row.city}</td><td><button>X</button></td></tr>`;
    });

    
    body.innerHTML = tdArr.join(''); 
    body.addEventListener('click', this.removeRow);
    table.append(body);

    
    return table;
  }

  removeRow(event) {
    if (event.target.closest('button')) {
      event.target.closest('tr').remove();
    }
  }
}