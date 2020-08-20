'use strict';
let startButton = document.getElementById('start'),
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
    expensesTitle = document.querySelector('input.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    incomeItems = document.querySelectorAll('.income-items'),
    periodAmount = document.querySelector('.period-amount');

    startButton.style.pointerEvents = 'none';

let isNumber = n => {
        return !isNaN(parseFloat(n)) && isFinite(n);
    },
    isString = n => {
        if (n !== null) {
            if (n.trim().length > 0 && !isNumber(n)) {
                for (let i = 0; i < n.length; i++) {
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

let appData = {
    budget: 0,
    income: {},
    addIncome: [],
    addExpenses: [],
    deposit: false,
    precentDeposit: 0,
    moneyDeposit: 0,
    expenses: {},
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    incomeMonth: 0,
    start: () => {
        
        appData.budget = +salaryAmount.value;

        appData.getExpenses();
        appData.getIncome();
        appData.getBudget();
        appData.getAddExpenses();
        appData.getAddIncome();

        appData.showResult();
    },
    showResult: function() {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = appData.getTargetMonth();
        incomePeriodValue.value = appData.calcSavedMoney();

        periodSelect.addEventListener('input', appData.showResult);
    },
    addExpensesBlock: function() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
        expensesItems = document.querySelectorAll('.expenses-items')
        if (expensesItems.length === 3) {
            expensesAdd.style.display = 'none';
        }
    },
    addIncomeBlock: function() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            incomeAdd.style.display = 'none';
        }
    },
    getExpenses: function() {
        expensesItems.forEach(function(item) {
            let itemExpenses = item.querySelector('.expenses-title').value,
            cashExpenses = item.querySelector('.expenses-amount').value;

            if (itemExpenses.trim() !== '' && cashExpenses.trim() !== '') {
                    appData.expenses[itemExpenses] = +cashExpenses;
            }
        });

        for (let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        };
    },
    getIncome: function() {
        incomeItems.forEach(function(item) {
            let itemIncome = item.querySelector('.income-title').value,
            cashIncome = item.querySelector('.income-amount').value;

            if (itemIncome.trim() !== '' && cashIncome.trim() !== '') {
                    appData.income[itemIncome] = +cashIncome;
            }
        });
        

        for (let key in appData.income) {
            appData.incomeMonth += appData.income[key];
        };        
    },
    getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(',');

        addExpenses.forEach(function(item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function() {
        additionalIncomeItem.forEach(function(item) {
            let itemValue = item.value.trim();

            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },
    getBudget: function () {
        appData.budgetMonth = appData.budget - appData.expensesMonth + appData.incomeMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function () {
        return Math.ceil(targetAmount.value / appData.budgetMonth);
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
    calcSavedMoney: function () {
        return appData.budgetMonth * periodSelect.value;
    }
};

// Обработчики событий
salaryAmount.addEventListener('change', function() {
    if (salaryAmount.value.trim()) {
        startButton.style.pointerEvents = '';
    } else {
        startButton.style.pointerEvents = 'none';
    }
});
startButton.addEventListener('click', appData.start);
expensesAdd.addEventListener('click', appData.addExpensesBlock);
incomeAdd.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', function() {
    periodAmount.textContent = periodSelect.value;
});

// appData.getTargetMonth() > 0 ? console.log('Цель будет достигнута через: ', appData.getTargetMonth() + ' месяцев') : console.log('Цель не будет достигнута');
// appData.getStatusIncome();


