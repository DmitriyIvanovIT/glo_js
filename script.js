'use strict';
let money;

let isNumber = n => {
        return !isNaN(parseFloat(n)) && isFinite(n);
    },
    start = () => {
        money = prompt('Ваш месячный доход?');

        while (!isNumber(money)) {
            money = prompt('Ваш месячный доход?');
        };

        return money = +money;
    };

start();

let appData = {
    budget: money,
    income: {},
    addIncome: [],
    addExpenses: [],
    deposit: false,
    mission: 200000,
    period: 10,
    expenses: {},
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function () {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(', ')
        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        let amount,
            expens;

        for (let i = 0; i < 2; i++) {
            expens = prompt('Введите обязательную статью расходов?');
            amount = prompt('Во сколько это обойдется?');
            while (!isNumber(amount)) {
                amount = prompt('Во сколько это обойдется?');
            };
            appData.expenses[expens] = +amount;
        }

        for(let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }
    },
    getBudget: function() {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function() {
        return Math.ceil(appData.mission / appData.budgetMonth)
    },
    getStatusIncome: function() {
        if (appData.budgetDay >= 1200) {
            console.log('У вас высокий уровень дохода');
        } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
            console.log('У вас средний уровень дохода');
        } else if (appData.budgetDay < 600 || appData.budgetDay === 0) {
            console.log('У вас средний уровень дохода');
        } else if (appData.budgetDay < 0) {
            console.log('Что то пошло не так');
        }
    }
};

appData.asking();
appData.getBudget();


console.log('Расходы за месяц: ', appData.expensesMonth);
appData.getTargetMonth() > 0 ? console.log('Цель будет достигнута через: ', appData.getTargetMonth() + ' месяцев') : console.log('Цель не будет достигнута');
appData.getStatusIncome();
let strData = [];
for(let key in appData) {
    console.log(`Наша программа включает в себя данные: ключ ${key} и его значение`, appData[key]);
};

