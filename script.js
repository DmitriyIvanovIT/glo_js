'use strict';

let money = +prompt('Ваш месячный доход?'),
income = 'Фриланс',
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
deposit = confirm('Есть ли у вас депозит в банке?'),
mission = 200000,
period = 10,
expenses1 = prompt('Введите обязательную статью расходов?'),
amount1 = +prompt('Во сколько это обойдется?'),
expenses2 = prompt('Введите обязательную статью расходов?'),
amount2 = +prompt('Во сколько это обойдется?'),
budgetMonth = money - (amount1 + amount2),
budgetDay = budgetMonth / 30;

console.log('money: ', typeof money);
console.log('income: ', typeof income);
console.log('deposit: ', typeof deposit);
console.log('Длинна строки addExpenses: ', addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log('Цель заработать ' + mission + ' рублей');
console.log(addExpenses.toLowerCase().split(', '));
console.log('Бюджет на месяц: ', budgetMonth);
console.log('Цель будет достигнута за: ', Math.ceil(mission / budgetMonth));
console.log('Бюджет на день: ', Math.floor(budgetDay));

if (budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода');
}
else if (budgetDay >= 600 && budgetDay < 1200) {
    console.log('У вас средний уровень дохода'); 
}
else if (budgetDay < 600 || budgetDay === 0) {
    console.log('У вас средний уровень дохода');
}
else if (budgetDay < 0) {
    console.log('Что то пошло не так');
} 