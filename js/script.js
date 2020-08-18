'use strict';
const startButton = document.getElementById('start'),
incomeAdd = document.getElementsByTagName('button')[0],
expensesAdd = document.getElementsByTagName('button')[1],
depositCheck = document.querySelector('#deposit-check'),
additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
budgetMonthValue = document.getElementsByClassName('result-total')[0],
budgetDayValue = document.getElementsByClassName('result-total')[1],
expensesMonthValue = document.getElementsByClassName('result-total')[2],
additionalIncomeValue = document.getElementsByClassName('result-total')[3],
additionalExpensesValue = document.getElementsByClassName('result-total')[4],
incomePeriodValue = document.getElementsByClassName('result-total')[5],
targetMonthValue = document.getElementsByClassName('result-total')[6],
salaryAmount = document.querySelector('.salary-amount'),
incomeTitle = document.querySelector('input.income-title'),
incomeAmount = document.querySelector('.income-amount'),
expensesTitle = document.querySelector('input.expenses-title'),
expensesAmount = document.querySelector('.expenses-amount'),
additionalExpensesItem = document.querySelector('.additional_expenses-item'),
range = document.querySelector('[type="range"]');

let money;

let isNumber = n => {
        return !isNaN(parseFloat(n)) && isFinite(n);
    },
    start = () => {
        money = prompt('Ваш месячный доход?', 50000);

        while (!isNumber(money)) {
            money = prompt('Ваш месячный доход?');
        };

        return money = +money;
    },
    isString = n => {
        if (n !== null) {
            if (n.trim().length > 0 && !isNumber(n)) {
                for (let i = 0; i< n.length; i++) {
                    if (isNumber(n[i])) {
                        return false;
                    };
                };
                
                return true;
            }
        }

        return false;
    },
    convertString = elem => {
        let arr = [];
        const ucFirst = str => {
            return str[0].toUpperCase() + str.slice(1);
        }

        elem.forEach((item, i) => {
            arr[i] = ucFirst(item);
        });

        return console.log(arr.join(', '));
    };

start();

let appData = {
    budget: money,
    income: {},
    addIncome: [],
    addExpenses: [],
    deposit: false,
    precentDeposit: 0,
    moneyDeposit: 0,
    mission: 200000,
    period: 10,
    expenses: {},
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function () {

        if (confirm('Есть ли у вас дополнительный заработок')) {
            let itemIncome = prompt('Какой у вас дополнительный заработок?', 'Курьер');

            while (!isString(itemIncome)) {
                itemIncome = prompt('Какой у вас дополнительный заработок?', 'Курьер');
            }; 

            let cachIncome = prompt('Сколько в месяц вы зарабатываете?', 10000);
            while (!isNumber(cachIncome)) {
                    cachIncome = prompt('Сколько в месяц вы зарабатываете?', 10000);
            };   
            appData.income[itemIncome] = +cachIncome;
        }
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Еда, кварт. плата, проезд, отдых');

        while (!isString(addExpenses)) {
            addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Еда, кварт. плата, проезд, отдых');
        }; 

        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        let amount,
            expens;

        for (let i = 0; i < 2; i++) {
            expens = prompt('Введите обязательную статью расходов?', 'еда');
            while (!isString(expens)) {
                expens = prompt('Введите обязательную статью расходов?', 'еда');
            }; 
            
            amount = prompt('Во сколько это обойдется?', 10000);
            while (!isNumber(amount)) {
                amount = prompt('Во сколько это обойдется?', 10000);
            };

            if (appData.expenses[expens] !== undefined) {
                appData.expenses[expens] += +amount;
            } else {
                appData.expenses[expens] = +amount;
            }
            
        }

        for (let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }
    },
    getBudget: function () {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function () {
        return Math.ceil(appData.mission / appData.budgetMonth);
    },
    getStatusIncome: function () {
        if (appData.budgetDay >= 1200) {
            console.log('У вас высокий уровень дохода');
        } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
            console.log('У вас средний уровень дохода');
        } else if (appData.budgetDay < 600 || appData.budgetDay === 0) {
            console.log('У вас средний уровень дохода');
        } else if (appData.budgetDay < 0) {
            console.log('Что то пошло не так');
        }
    },
    getInfoDeposit: function () {
        if (appData.deposit) {
            appData.precentDeposit = prompt('Какой годовой процент?', '10');
            while (!isNumber(appData.precentDeposit)) {
                appData.precentDeposit = prompt('Какой годовой процент?', '10');
            }; 
            appData.moneyDeposit = prompt('Сумма накопления?', 10000);
            while (!isNumber(appData.moneyDeposit)) {
                appData.moneyDeposit = +prompt('Сумма накопления?', 10000);
            }; 
        }
    },
    calcSavedMoney: function() {
        return appData.budgetMonth * appData.period;
    }
};

appData.asking();
appData.getInfoDeposit();
appData.getBudget();
appData.calcSavedMoney();


console.log('Расходы за месяц: ', appData.expensesMonth);
appData.getTargetMonth() > 0 ? console.log('Цель будет достигнута через: ', appData.getTargetMonth() + ' месяцев') : console.log('Цель не будет достигнута');
appData.getStatusIncome();
let strData = [];
for (let key in appData) {
    console.log(`Наша программа включает в себя данные: ключ ${key} и его значение`, appData[key]);
};

convertString(appData.addExpenses);

console.log(startButton);
console.log(incomeAdd);
console.log(expensesAdd);
console.log(depositCheck);
console.log(additionalIncomeItem);
console.log(budgetMonthValue);
console.log(budgetDayValue);
console.log(expensesMonthValue);
console.log(additionalIncomeValue);
console.log(additionalExpensesValue);
console.log(incomePeriodValue);
console.log(targetMonthValue);
console.log(salaryAmount);
console.log(incomeTitle);
console.log(incomeAmount);
console.log(expensesTitle);
console.log(expensesAmount);
console.log(additionalExpensesItem);
console.log(range);