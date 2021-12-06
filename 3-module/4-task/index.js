function showSalary(users, age) {
  let report = ''
  users.forEach(user => {
    if (user.age > age) return;

    report += `${user.name}, ${user.balance}\n`;
  });
  return report.substring(0, report.length - 1);
}
