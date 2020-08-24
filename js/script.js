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
    periodAmount = document.querySelector('.period-amount'),
    cancel = document.getElementById('cancel');

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
                    }
                }

                return true;
            }
        }

        return false;
    },
    convertString = elem => {
        let arr = [];
        const ucFirst = str => {
            return str[0].toUpperCase() + str.slice(1);
        };

        elem.forEach((item, i) => {
            arr[i] = ucFirst(item);
        });

        return console.log(arr.join(', '));
    },
    blockInput = function () {
        const dataBlock = document.querySelector('.data'),
            inputs = dataBlock.querySelectorAll('[type="text"]');
        inputs.forEach(function (item) {
            item.disabled = true;
        });
    },
    unblockInput = function () {
        const dataBlock = document.querySelector('.data'),
            inputs = dataBlock.querySelectorAll('[type="text"]');
        inputs.forEach(function (item) {
            item.disabled = false;
            item.value = '';
        });
    }, 
    changePeriod = function() {
        incomePeriodValue.value = this.calcSavedMoney();
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
    start: function () {
        this.budget = +salaryAmount.value;

        this.getExpenses();
        this.getIncome();
        this.getBudget();
        this.getAddExpenses();
        this.getAddIncome();

        this.showResult();

        blockInput();

        incomeAdd.disabled = true;
        expensesAdd.disabled = true;
        depositCheck.disabled = true;

        startButton.style.display = 'none';
        cancel.style.display = 'block';

        periodSelect.addEventListener('input', changePeriod.bind(appData));
        cancel.addEventListener('click', appData.reset.bind(appData));
    },
    showResult: function () {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcSavedMoney();
    },
    addExpensesBlock: function () {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.querySelectorAll('input').forEach(function (item) {
            item.value = '';
        });
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
        expensesItems = document.querySelectorAll('.expenses-items');
        this.validMethod();

        if (expensesItems.length === 3) {
            expensesAdd.style.display = 'none';
        }
    },
    addIncomeBlock: function () {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.querySelectorAll('input').forEach(function (item) {
            item.value = '';
        });
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
        incomeItems = document.querySelectorAll('.income-items');
        this.validMethod();

        if (incomeItems.length === 3) {
            incomeAdd.style.display = 'none';
        }
    },
    getExpenses: function () {
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value,
                cashExpenses = item.querySelector('.expenses-amount').value;

            if (itemExpenses.trim() !== '' && cashExpenses.trim() !== '') {
                appData.expenses[itemExpenses] = +cashExpenses;
            }
        });

        for (let key in this.expenses) {
            this.expensesMonth += this.expenses[key];
        }
    },
    getIncome: function () {
        incomeItems.forEach(function (item) {
            let itemIncome = item.querySelector('.income-title').value,
                cashIncome = item.querySelector('.income-amount').value;

            if (itemIncome.trim() !== '' && cashIncome.trim() !== '') {
                appData.income[itemIncome] = +cashIncome;
            }
        });


        for (let key in this.income) {
            this.incomeMonth += this.income[key];
        }
    },
    getAddExpenses: function () {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function () {
        additionalIncomeItem.forEach(function (item) {
            let itemValue = item.value.trim();

            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },
    getBudget: function () {
        this.budgetMonth = this.budget - this.expensesMonth + this.incomeMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    },
    getTargetMonth: function () {
        return Math.ceil(targetAmount.value / this.budgetMonth);
    },
    getInfoDeposit: function () {
        if (appData.deposit) {
            appData.precentDeposit = prompt('Какой годовой процент?', '10');
            while (!isNumber(appData.precentDeposit)) {
                appData.precentDeposit = prompt('Какой годовой процент?', '10');
            }
            appData.moneyDeposit = prompt('Сумма накопления?', 10000);
            while (!isNumber(appData.moneyDeposit)) {
                appData.moneyDeposit = +prompt('Сумма накопления?', 10000);
            }
        }
    },
    calcSavedMoney: function () {
        return this.budgetMonth * periodSelect.value;
    },
    validMethod: function () {
        let inputName = document.querySelectorAll('[placeholder="Наименование"]'),
            inputSum = document.querySelectorAll('[placeholder="Сумма"]');

        inputName.forEach(function (item) {
            item.addEventListener('input', function () {
                item.value = item.value.replace(/[^А-Яа-яЁё,.!? ]/i, '');
            });
        });

        inputSum.forEach(function (item) {
            item.addEventListener('input', function () {
                if (item.value === '0') {
                    item.value = item.value.replace(/[^1-9]/i, '');
                }
                item.value = item.value.replace(/[^0-9]/i, '');
            });
        });
    },
    reset: function () {
        let resultTotal = document.querySelectorAll('.result-total');

        for(let key in cloneAppData) {
            appData[key] = cloneAppData[key];
        }
        
        periodSelect.value = 1;
        periodAmount.textContent = periodSelect.value;

        unblockInput();
        resultTotal.forEach(function (item) {
            item.value = '';
        });

        expensesItems.forEach(function (item, i) {
            if (i !== 0) {
                item.remove();
            }
        });

        incomeItems.forEach(function (item, i) {
            if (i !== 0) {
                item.remove();
            }
        });

        expensesAdd.style.display = '';
        incomeAdd.style.display = '';
        incomeAdd.disabled = false;
        expensesAdd.disabled = false;
        depositCheck.checked = false;
        depositCheck.disabled = false;
        startButton.style.display = 'block';
        cancel.style.display = 'none';
        startButton.style.pointerEvents = 'none';
    }
},
cloneAppData = {
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
    start: function () {
        this.budget = +salaryAmount.value;

        this.getExpenses();
        this.getIncome();
        this.getBudget();
        this.getAddExpenses();
        this.getAddIncome();

        this.showResult();

        blockInput();

        incomeAdd.disabled = true;
        expensesAdd.disabled = true;
        depositCheck.disabled = true;

        startButton.style.display = 'none';
        cancel.style.display = 'block';

        periodSelect.addEventListener('input', changePeriod.bind(appData));
        cancel.addEventListener('click', appData.reset.bind(appData));
    },
    showResult: function () {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcSavedMoney();
    },
    addExpensesBlock: function () {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.querySelectorAll('input').forEach(function (item) {
            item.value = '';
        });
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
        expensesItems = document.querySelectorAll('.expenses-items');
        this.validMethod();

        if (expensesItems.length === 3) {
            expensesAdd.style.display = 'none';
        }
    },
    addIncomeBlock: function () {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.querySelectorAll('input').forEach(function (item) {
            item.value = '';
        });
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
        incomeItems = document.querySelectorAll('.income-items');
        this.validMethod();

        if (incomeItems.length === 3) {
            incomeAdd.style.display = 'none';
        }
    },
    getExpenses: function () {
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value,
                cashExpenses = item.querySelector('.expenses-amount').value;

            if (itemExpenses.trim() !== '' && cashExpenses.trim() !== '') {
                appData.expenses[itemExpenses] = +cashExpenses;
            }
        });

        for (let key in this.expenses) {
            this.expensesMonth += this.expenses[key];
        }
    },
    getIncome: function () {
        incomeItems.forEach(function (item) {
            let itemIncome = item.querySelector('.income-title').value,
                cashIncome = item.querySelector('.income-amount').value;

            if (itemIncome.trim() !== '' && cashIncome.trim() !== '') {
                appData.income[itemIncome] = +cashIncome;
            }
        });


        for (let key in this.income) {
            this.incomeMonth += this.income[key];
        }
    },
    getAddExpenses: function () {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function () {
        additionalIncomeItem.forEach(function (item) {
            let itemValue = item.value.trim();

            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },
    getBudget: function () {
        this.budgetMonth = this.budget - this.expensesMonth + this.incomeMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    },
    getTargetMonth: function () {
        return Math.ceil(targetAmount.value / this.budgetMonth);
    },
    getInfoDeposit: function () {
        if (appData.deposit) {
            appData.precentDeposit = prompt('Какой годовой процент?', '10');
            while (!isNumber(appData.precentDeposit)) {
                appData.precentDeposit = prompt('Какой годовой процент?', '10');
            }
            appData.moneyDeposit = prompt('Сумма накопления?', 10000);
            while (!isNumber(appData.moneyDeposit)) {
                appData.moneyDeposit = +prompt('Сумма накопления?', 10000);
            }
        }
    },
    calcSavedMoney: function () {
        return this.budgetMonth * periodSelect.value;
    },
    validMethod: function () {
        let inputName = document.querySelectorAll('[placeholder="Наименование"]'),
            inputSum = document.querySelectorAll('[placeholder="Сумма"]');

        inputName.forEach(function (item) {
            item.addEventListener('input', function () {
                item.value = item.value.replace(/[^А-Яа-яЁё,.!? ]/i, '');
            });
        });

        inputSum.forEach(function (item) {
            item.addEventListener('input', function () {
                if (item.value === '0') {
                    item.value = item.value.replace(/[^1-9]/i, '');
                }
                item.value = item.value.replace(/[^0-9]/i, '');
            });
        });
    },
    reset: function () {
        let resultTotal = document.querySelectorAll('.result-total');

        for(let key in cloneAppData) {
            appData[key] = cloneAppData[key];
        }
        
        periodSelect.value = 1;
        periodAmount.textContent = periodSelect.value;

        unblockInput();
        resultTotal.forEach(function (item) {
            item.value = '';
        });

        expensesItems.forEach(function (item, i) {
            if (i !== 0) {
                item.remove();
            }
        });

        incomeItems.forEach(function (item, i) {
            if (i !== 0) {
                item.remove();
            }
        });

        expensesAdd.style.display = '';
        incomeAdd.style.display = '';
        incomeAdd.disabled = false;
        expensesAdd.disabled = false;
        depositCheck.checked = false;
        depositCheck.disabled = false;
        startButton.style.display = 'block';
        cancel.style.display = 'none';
        startButton.style.pointerEvents = 'none';
    }
};

appData.validMethod();

// Обработчики событий
salaryAmount.addEventListener('change', function () {
    if (salaryAmount.value.trim()) {
        startButton.style.pointerEvents = '';
    } else {
        startButton.style.pointerEvents = 'none';
    }
});

startButton.addEventListener('click', appData.start.bind(appData));

expensesAdd.addEventListener('click', appData.addExpensesBlock.bind(appData));

incomeAdd.addEventListener('click', appData.addIncomeBlock.bind(appData));

periodSelect.addEventListener('input', function () {
    periodAmount.textContent = periodSelect.value;
});

