'use strict';
let isNumber = n => {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

let money,
    income = 'Фриланс',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 200000,
    period = 10,
    expenses = [],
    budgetDay,
    accumulatedMonth,
    expensesAmount;

const start = () => {
    money = prompt('Ваш месячный доход?');

    while (!isNumber(money)) {
        money = prompt('Ваш месячный доход?');
    };

    return money = +money;
},
getExpensesMonth = () => {
    let sum = 0,
    amount;

    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt('Введите обязательную статью расходов?');
        amount = prompt('Во сколько это обойдется?');
        while (!isNumber(amount)) {
            amount = prompt('Во сколько это обойдется?');
        };
        sum +=  +amount;
    }
    return sum;
},
    getAccumulatedMonth = item => money - item,
    getTargetMonth = item =>  Math.ceil(mission / item),
    showTypeOf = () => {
        console.log('money: ', typeof money);
        console.log('income: ', typeof income);
        console.log('deposit: ', typeof deposit);
    },
    getStatusIncome = () => {
        if (budgetDay >= 1200) {
            console.log('У вас высокий уровень дохода');
        } else if (budgetDay >= 600 && budgetDay < 1200) {
            console.log('У вас средний уровень дохода');
        } else if (budgetDay < 600 || budgetDay === 0) {
            console.log('У вас средний уровень дохода');
        } else if (budgetDay < 0) {
            console.log('Что то пошло не так');
        }
    };

start();

expensesAmount = getExpensesMonth();
accumulatedMonth = getAccumulatedMonth(expensesAmount);
budgetDay = accumulatedMonth / 30;

showTypeOf();
console.log('Расходы за месяц: ', expensesAmount);
console.log('Расходы: ', addExpenses.toLowerCase().split(', '));
getTargetMonth(accumulatedMonth) > 0 ? console.log('Цель будет достигнута через: ', getTargetMonth(accumulatedMonth) + ' месяцев') : console.log('Цель не будет достигнута');
console.log('Бюджет на день: ', Math.floor(budgetDay));
getStatusIncome();

