import '../style/style.scss'
import { validateInput } from "./validateInput.ts";
import { calculateTip } from "./calculateTip.ts";

const elements = {
    customButton: document.querySelector<HTMLButtonElement>('#custom-button'),
    customInput: document.querySelector<HTMLInputElement>('#custom-input'),
    percentButtons: document.querySelectorAll<HTMLButtonElement>('.percent'),
    billInput: document.querySelector<HTMLInputElement>('#bill-input'),
    peopleInput: document.querySelector<HTMLInputElement>('#people-input'),
    billError: document.querySelector<HTMLSpanElement>('#bill-error'),
    peopleError: document.querySelector<HTMLSpanElement>('#people-error'),
    resetButton: document.querySelector<HTMLButtonElement>('#reset-button'),
    elementTipPerPerson: document.querySelector<HTMLSpanElement>('#tip-per-person'),
    elementTotalPerPerson: document.querySelector<HTMLSpanElement>('#total-per-person'),
} as const;

if (
    !elements.customButton ||
    !elements.customInput ||
    !elements.percentButtons ||
    !elements.billInput ||
    !elements.peopleInput ||
    !elements.billError ||
    !elements.peopleError ||
    !elements.resetButton ||
    !elements.elementTipPerPerson ||
    !elements.elementTotalPerPerson
) {
    throw new Error('Required DOM elements missing');
}

const {
    customButton,
    customInput,
    percentButtons,
    billInput,
    peopleInput,
    billError,
    peopleError,
    resetButton,
    elementTipPerPerson,
    elementTotalPerPerson,
} = elements;

let tipPercent: number = 0;

function enableReset() {
    resetButton.disabled = false;
}


function toggleCustomInput(showCustom: boolean) {
    if (showCustom) {
        customButton.classList.add('hide');
        customInput.classList.remove('hide');
    } else {
        customButton.classList.remove('hide');
        customInput.classList.add('hide');
    }
}

function tryCalculate() {
    const bill = Number(billInput.value);
    const people = Number(peopleInput.value);

    const hasBill = bill > 0;
    const hasPeople = people > 0;

    if (hasBill && hasPeople) {
        calculateTip(bill, people, tipPercent);
    }
}

percentButtons.forEach(button => {
    button.addEventListener('click', () => {
        tipPercent = Number(button.dataset.percent || '0');
        toggleCustomInput(false);
        tryCalculate();
        enableReset();
    });
});

billInput.addEventListener('input', () => {
    validateInput(billInput, billError);
    tryCalculate();
    enableReset();
});

peopleInput.addEventListener('input', () => {
    validateInput(peopleInput, peopleError);
    tryCalculate();
    enableReset();
});

customButton.addEventListener('click', () => {
    toggleCustomInput(true);
    enableReset();
});

customInput.addEventListener('input', () => {
    tipPercent = Number(customInput.value || '0');
    tryCalculate();
    enableReset();
});

resetButton.addEventListener('click', () => {
    billInput.value = '';
    peopleInput.value = '';
    billError.classList.add('hide');
    peopleError.classList.add('hide');
    toggleCustomInput(false);
    tipPercent = 0;
    resetButton.disabled = true;
    elementTipPerPerson.innerHTML = '$0.00'
    elementTotalPerPerson.innerHTML = '$0.00'
});