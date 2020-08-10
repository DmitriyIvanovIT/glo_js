'use strict';

let money = 40000,
income = 'Фриланс',
addExpenses = 'Кафе, метро, интернет, сотовая связь, коммуналка',
deposit = true,
mission = 200000,
period = 10,
budgetDay = money / 30,
budgetMonth;

console.log('money: ', typeof money);
console.log('income: ', typeof income);
console.log('deposit: ', typeof deposit);
console.log('Длинна строки addExpenses: ', addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log('Цель заработать ' + mission + ' рублей');
console.log(addExpenses.toLowerCase().split(', '));
console.log('budgetDay: ', budgetDay);

money = +prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');
let expenses1 = prompt('Введите обязательную статью расходов?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдется?');
let amount2 = +prompt('Во сколько это обойдется?');

budgetMonth = money - (amount1 + amount2);

console.log(Math.ceil(mission / budgetMonth));

budgetDay = budgetMonth / 30;
console.log(Math.floor(budgetDay));

if (budgetDay >= 1200) console.log('У вас высокий уровень дохода') 
else if (budgetDay >= 600 && budgetDay < 1200) console.log('У вас средний уровень дохода') 
else if (budgetDay < 600 || budgetDay === 0) console.log('У вас средний уровень дохода')
else if (budgetDay < 0) console.log('Что то пошло не так'); 