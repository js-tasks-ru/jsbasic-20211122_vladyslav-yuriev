function sumSalary(salaries) {
  let result = 0;
  for (let key in salaries) {
    const salary = salaries[key];
    if (Number.isInteger(salary)) {
      result = salary + result;
    }
  }
  return result;
}
