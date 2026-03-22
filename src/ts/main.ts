import '../style/style.scss'
import { validateInput } from "./validateInput.ts";
import { calculateTip } from "./calculateTip.ts";

const customButton = document.querySelector<HTMLButtonElement>('#custom-button')!;
const customInput = document.querySelector<HTMLInputElement>('#custom-input')!;
const percentButton = document.querySelectorAll<HTMLButtonElement>('.percent')!;
const billInput = document.querySelector<HTMLInputElement>('#bill-input')!;
const peopleInput = document.querySelector<HTMLInputElement>('#people-input')!;
const billError = document.querySelector<HTMLSpanElement>('#bill-error')!;
const peopleError = document.querySelector<HTMLSpanElement>('#people-error')!;
const resetButton = document.querySelector<HTMLButtonElement>('#reset-button')!;

let tipPercent: number = 0;

percentButton.forEach(button => {
    button.addEventListener('click', () => {
        tipPercent = Number(button.getAttribute('data-percent'));
        customButton.classList.remove('hide');
        customInput?.classList.add('hide');
        tryCalculate();
        resetButton.disabled = false;
    })
})
billInput?.addEventListener('input', () => {
    validateInput(billInput, billError);
    tryCalculate();
    resetButton.disabled = false;
});

peopleInput?.addEventListener('input', () => {
    validateInput(peopleInput, peopleError);
    tryCalculate();
    resetButton.disabled = false;
});

customButton?.addEventListener('click', () => {
    customButton.classList.add('hide');
    customInput?.classList.remove('hide');
    resetButton.disabled = false;
});

customInput?.addEventListener('input', () => {
    tipPercent = Number(customInput.value);
    tryCalculate();
    resetButton.disabled = false;
});

resetButton?.addEventListener('click', () => {
    billInput.value = '';
    peopleInput.value = '';
    billError.classList.add('hide');
    peopleError.classList.add('hide');
    customButton.classList.remove('hide');
    customInput?.classList.add('hide');
    resetButton.disabled = true;
});

export function tryCalculate() {
    const bill = Number(billInput.value);
    const people = Number(peopleInput.value);

    const hasBill = bill > 0;
    const hasPeople = people > 0;

    if (hasBill && hasPeople) {
        calculateTip(bill, people, tipPercent);
    }
}