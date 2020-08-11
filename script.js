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
    budgetDay;

const getExpensesMonth = () => {
        return amount1 + amount2;
    },
    getAccumulatedMonth = () => {
        return money - getExpensesMonth();
    },
    getTargetMonth = () => {
        return Math.ceil(mission / accumulatedMonth);
    },
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

let accumulatedMonth = getAccumulatedMonth();

budgetDay = accumulatedMonth / 30;

showTypeOf();
console.log('Расходы за месяц: ', getExpensesMonth());
console.log('Расходы: ', addExpenses.toLowerCase().split(', '));
console.log('Цель будет достигнута через: ', getTargetMonth() + ' месяцев');
console.log('Бюджет на день: ', Math.floor(budgetDay));
getStatusIncome();

