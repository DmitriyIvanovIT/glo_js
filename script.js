let money, 
income, 
addExpenses, 
deposit, 
mission, 
period;

money = 40000;
income = 'Фриланс';
addExpenses = 'Кафе, метро, интернет, сотовая связь, коммуналка';
deposit = true;
mission = 200000;
period = 10;

console.log('money: ', typeof money);
console.log('income: ', typeof income);
console.log('deposit: ', typeof deposit);
console.log('Длинна строки addExpenses: ', addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log('Цель заработать ' + mission + ' рублей');
console.log(addExpenses.toLowerCase().split(', '));

let budgetDay = money / 30;
console.log('budgetDay: ', budgetDay);

