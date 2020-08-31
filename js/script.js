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
    cancel = document.getElementById('cancel'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent');

let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items');

startButton.style.pointerEvents = 'none';

const localData = JSON.parse(localStorage.getItem('savesCalcData')) || [];

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
        this.deleteAllCookies();
        this.budget = +salaryAmount.value;

        this.getExpInc();
        this.getInfoDeposit();
        this.getAddExpInc();
        this.getBudget();
        this.showResult();
        this.blockInput();
        this.saveData();

        periodSelect.addEventListener('input', this.changePeriod.bind(this));
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

    addBlock() {
        const btn = document.querySelector(`.${event.target.className.split(' ')[1]}`),
            startStr = event.target.className.split(' ')[1].split('_')[0];

        let parent = document.querySelectorAll(`.${startStr}-items`)[0],
            clone = parent.cloneNode(true);

        clone.querySelectorAll('input').forEach(item => {
            item.value = '';
        });

        btn.before(clone);

        incomeItems = document.querySelectorAll('.income-items');
        expensesItems = document.querySelectorAll('.expenses-items');
        this.validMethod();

        if (expensesItems.length === 3) {
            expensesAdd.style.display = 'none';
        }

        if (incomeItems.length === 3) {
            incomeAdd.style.display = 'none';
        }
    }

    getExpInc() {
        const count = item => {
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value,
                itemAmount = item.querySelector(`.${startStr}-amount`).value;

            if (itemTitle.trim() !== '' && itemAmount.trim() !== '') {
                this[startStr][itemTitle] = +itemAmount;
            }
        };

        incomeItems.forEach(count);
        expensesItems.forEach(count);

        for (let key in this.income) {
            this.incomeMonth += this.income[key];
        }

        for (let key in this.expenses) {
            this.expensesMonth += this.expenses[key];
        }
    }

    getAddExpInc() {
        const createString = item => {
            const classItem = item.className;

            if (classItem === 'additional_income-item') {
                item = item.value;
            }

            item = item.trim();

            if (item !== '') {
                if (classItem === 'additional_income-item') {
                    this.addIncome.push(item);
                } else {
                    this.addExpenses.push(item);
                }
            }
        };

        additionalIncomeItem.forEach(createString);

        additionalExpensesItem.value.split(',').forEach(createString);
    }

    getBudget() {
        const monthDepotsit = this.moneyDeposit * (this.precentDeposit / 100);
        this.budgetMonth = this.budget - this.expensesMonth + this.incomeMonth + monthDepotsit;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }

    getTargetMonth() {
        return Math.ceil(targetAmount.value / this.budgetMonth);
    }

    calcSavedMoney() {
        return this.budgetMonth * periodSelect.value;
    }

    validMethod() {
        let inputName = document.querySelectorAll('[placeholder="Наименование"]'),
            inputSum = document.querySelectorAll('[placeholder="Сумма"]'),
            persent = document.querySelector('[placeholder="Процент"]');

        const validNumber = item => {
                if (item.value === '.') {
                    item.value = item.value.replace(/[^0-9]/i, '');
                }
                item.value = item.value.replace(/[^0-9.]/i, '');
                if (item.className === 'deposit-percent') {
                    if (item.value === '0') {
                        startButton.style.pointerEvents = 'none';
                    } else {
                        startButton.style.pointerEvents = '';
                    }

                    if (+item.value > 101) {
                        if (+item.value.slice(0, 3) !== 100) {
                            item.value = item.value.slice(0, 2);
                        } else {
                            item.value = item.value.slice(0, 3);
                        }
                    }
                }
            },
            validString = item => {
                item.value = item.value.replace(/[^А-Яа-яЁё,.!? ]/i, '');
            };

        inputName.forEach(item => {
            item.addEventListener('input', () => {
                validString(item);
            });
        });

        inputSum.forEach(item => {
            item.addEventListener('input', () => {
                validNumber(item);
            });
        });

        persent.addEventListener('input', () => {
            validNumber(persent);
        });

        additionalExpensesItem.addEventListener('input', () => {
            validString(additionalExpensesItem);
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
        this.depositHandler();
        resultTotal.forEach(item => {
            item.value = '';
        });

        expensesItems.forEach((item, i) => {
            if (i !== 0) {
                item.remove();
            }
        });

        incomeItems.forEach((item, i) => {
            if (i !== 0) {
                item.remove();
            }
        });

        localStorage.removeItem('savesCalcData');
        this.deleteAllCookies();
    }

    getInfoDeposit() {
        if (this.deposit) {
            this.precentDeposit = parseFloat(depositPercent.value);
            this.moneyDeposit = +depositAmount.value;
        }
    }

    changePercent(value) {
        const valueSelect = value;
        if (valueSelect === 'other') {
            depositPercent.value = '';
            depositPercent.style.display = 'inline-block';
        } else {
            depositPercent.style.display = '';
            depositPercent.value = valueSelect;
        }
    }

    depositHandler() {
        if (depositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            startButton.style.pointerEvents = 'none';

            depositBank.addEventListener('change', () => {
                this.changePercent(depositBank.value);
                this.checkDeposit();
            });
        } else {
            this.deposit = false;
            depositBank.style.display = '';
            depositAmount.style.display = '';
            depositPercent.style.display = '';
            depositBank.value = '';
            depositAmount.value = '';
            depositPercent.value = '';
            depositBank.removeEventListener('change', () => {
                this.changePercent();
                this.checkDeposit();
            });
            startButton.style.pointerEvents = '';
        }

    }

    eventsListeners() {

        if (localData.length !== 0) {
            const arrLocal = [];

            for (let key in localData[localData.length - 1]) {
                this[key] = localData[localData.length - 1][key];
                arrLocal.push(key);
            }

            let cookies = document.cookie.split('; ');
            cookies = cookies.map(item => item.split('=')[0]);

            const checkCookies = () => {
                let check;
                for (let i = 0; i < arrLocal.length; i++) {

                    if (cookies[i] !== arrLocal[i]) {
                        check = false;
                        return check;
                    }
                    check = true;

                }

                return check;
            };

            if (checkCookies()) {
                this.showResult();
                this.blockInput();
                periodSelect.addEventListener('input', this.changePeriod.bind(this));
            } else {
                this.reset();
            }
        }

        this.validMethod();
        // Обработчики событий
        salaryAmount.addEventListener('input', () => {
            if (salaryAmount.value.trim() > 0) {
                startButton.style.pointerEvents = '';
            } else {
                startButton.style.pointerEvents = 'none';
            }
        });

        startButton.addEventListener('click', this.start.bind(this));

        expensesAdd.addEventListener('click', this.addBlock.bind(this));

        incomeAdd.addEventListener('click', this.addBlock.bind(this));

        periodSelect.addEventListener('input', () => {
            periodAmount.textContent = periodSelect.value;
        });

        cancel.addEventListener('click', this.reset.bind(this));

        depositCheck.addEventListener('change', this.depositHandler.bind(this));

        depositPercent.addEventListener('input', this.checkDeposit);

        depositAmount.addEventListener('input', this.checkDeposit);
    }

    blockInput() {
        const dataBlock = document.querySelector('.data'),
            inputs = dataBlock.querySelectorAll('[type="text"]');
        inputs.forEach(item => {
            item.disabled = true;
        });

        incomeAdd.disabled = true;
        expensesAdd.disabled = true;
        depositCheck.disabled = true;
        depositBank.disabled = true;
        startButton.style.display = 'none';
        cancel.style.display = 'block';
    }

    unblockInput() {
        const dataBlock = document.querySelector('.data'),
            inputs = dataBlock.querySelectorAll('[type="text"]');
        inputs.forEach(item => {
            item.disabled = false;
            item.value = '';
        });

        incomeAdd.disabled = false;
        expensesAdd.disabled = false;
        depositCheck.checked = false;
        depositCheck.disabled = false;
        depositBank.disabled = false;
        expensesAdd.style.display = '';
        incomeAdd.style.display = '';
        startButton.style.display = 'block';
        cancel.style.display = 'none';
        startButton.style.pointerEvents = 'none';
    }

    changePeriod() {
        incomePeriodValue.value = this.calcSavedMoney();
    }

    saveData() {
        const dataObj = {
            ...this
        };

        const setCookie = (key, value, year, month, day, path, domain, secure) => {
            let cookieStr = `${key}=${encodeURI(value)}`;

            if (year) {
                const expires = new Date(year, month, day);
                cookieStr += `; expires=${expires.toGMTString()}`;
            }

            cookieStr += path ? `; path=${path}` : '';
            cookieStr += domain ? `; domain=${domain}` : '';
            cookieStr += secure ? `; secure` : '';

            document.cookie = cookieStr;
        };

        for (let key in dataObj) {
            setCookie(key, dataObj[key], 2030, 12, 31);
        }

        setCookie('isLoad', true, 2030, 12, 31);

        localData.push(dataObj);
        localStorage.setItem('savesCalcData', JSON.stringify(localData));
    }
    deleteAllCookies() {
        let cookies = document.cookie.split(";");

        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            let eqPos = cookie.indexOf("=");
            let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }

    checkDeposit() {
            if (depositPercent.value !== '' && depositAmount.value !== '' && salaryAmount.value !== '') {
                startButton.style.pointerEvents = '';
            } else {
                startButton.style.pointerEvents = 'none';
            }
    }
}

let appData = new AppData();

appData.eventsListeners();