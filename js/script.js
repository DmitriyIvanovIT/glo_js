'use strict';
// Элементы DOM
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
    expensesTitle = document.querySelector('input.expenses-title'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    cancel = document.getElementById('cancel');

let expensesItems = document.querySelectorAll('.expenses-items'),
incomeItems = document.querySelectorAll('.income-items');

startButton.style.pointerEvents = 'none';

class AppData {
    constructor() {
        this.budget = 0;
        this.income = {};
        this.addIncome = [];
        this.addExpenses = [];
        this.deposit = false;
        this.precentDeposit = 0;
        this.moneyDeposit = 0;
        this.expenses = {};
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.incomeMonth = 0;
    }

    start() {
        this.budget = +salaryAmount.value;
    
        this.getExpenses();
        this.getIncome();
        this.getBudget();
        this.getAddExpenses();
        this.getAddIncome();
    
        this.showResult();
    
        this.blockInput();
    
        incomeAdd.disabled = true;
        expensesAdd.disabled = true;
        depositCheck.disabled = true;
    
        startButton.style.display = 'none';
        cancel.style.display = 'block';
    
        periodSelect.addEventListener('input', this.changePeriod.bind(this));
        cancel.addEventListener('click', this.reset.bind(this));
    }

    showResult() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcSavedMoney();
    }

    addExpensesBlock() {
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
    }

    addIncomeBlock() {
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
    }

    getExpenses() {
        expensesItems.forEach(item => {
            let itemExpenses = item.querySelector('.expenses-title').value,
                cashExpenses = item.querySelector('.expenses-amount').value;
    
            if (itemExpenses.trim() !== '' && cashExpenses.trim() !== '') {
                this.expenses[itemExpenses] = +cashExpenses;
            }
        });
    
        for (let key in this.expenses) {
            this.expensesMonth += this.expenses[key];
        }
    }

    getIncome() {
        incomeItems.forEach(item => {
            let itemIncome = item.querySelector('.income-title').value,
                cashIncome = item.querySelector('.income-amount').value;
    
            if (itemIncome.trim() !== '' && cashIncome.trim() !== '') {
                this.income[itemIncome] = +cashIncome;
            }
        });
    
    
        for (let key in this.income) {
            this.incomeMonth += this.income[key];
        }
    }

    getAddExpenses() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(item => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        });
    }

    getAddIncome() {

        additionalIncomeItem.forEach(item => {
            let itemValue = item.value.trim();
    
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        });
    }

    getBudget() {
        this.budgetMonth = this.budget - this.expensesMonth + this.incomeMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }

    getTargetMonth() {
        return Math.ceil(targetAmount.value / this.budgetMonth);
    }

    getInfoDeposit() {
        if (this.deposit) {
            this.precentDeposit = prompt('Какой годовой процент?', '10');
            while (!isNumber(this.precentDeposit)) {
                this.precentDeposit = prompt('Какой годовой процент?', '10');
            }
            this.moneyDeposit = prompt('Сумма накопления?', 10000);
            while (!isNumber(this.moneyDeposit)) {
                this.moneyDeposit = +prompt('Сумма накопления?', 10000);
            }
        }
    }

    calcSavedMoney() {
        return this.budgetMonth * periodSelect.value;
    }

    validMethod() {
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
    }

    reset() {
        let cloneAppData = new AppData();
    
        let resultTotal = document.querySelectorAll('.result-total');
    
        for (let key in cloneAppData) {
            this[key] = cloneAppData[key];
        }
    
        periodSelect.value = 1;
        periodAmount.textContent = periodSelect.value;
    
        this.unblockInput();
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

    eventsListeners() {

        this.validMethod();
        // Обработчики событий
        salaryAmount.addEventListener('input', function () {
            if (salaryAmount.value.trim() > 0) {
                startButton.style.pointerEvents = '';
            } else {
                startButton.style.pointerEvents = 'none';
            }
        });
    
        startButton.addEventListener('click', this.start.bind(this));
    
        expensesAdd.addEventListener('click', this.addExpensesBlock.bind(this));
    
        incomeAdd.addEventListener('click', this.addIncomeBlock.bind(this));
    
        periodSelect.addEventListener('input', function () {
            periodAmount.textContent = periodSelect.value;
        });
    }

    blockInput() {
        const dataBlock = document.querySelector('.data'),
            inputs = dataBlock.querySelectorAll('[type="text"]');
        inputs.forEach(function (item) {
            item.disabled = true;
        });
    }

    unblockInput() {
        const dataBlock = document.querySelector('.data'),
            inputs = dataBlock.querySelectorAll('[type="text"]');
        inputs.forEach(function (item) {
            item.disabled = false;
            item.value = '';
        });
    }
    changePeriod() {
        incomePeriodValue.value = this.calcSavedMoney();
    }
}

let appData = new AppData();

appData.eventsListeners();