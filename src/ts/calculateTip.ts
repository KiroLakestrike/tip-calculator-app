export function calculateTip(bill: number, people: number, tipPercent: number) {
    const tipPerPerson = (bill * (tipPercent / 100)) / people;
    const totalPerPerson = (bill + bill * (tipPercent / 100)) / people
    updateValues(tipPerPerson, totalPerPerson);
}


export function updateValues(tipPerPerson:number, totalPerPerson:number){
    const elementTipPerPerson = document.querySelector<HTMLSpanElement>('#tip-per-person')!;
    const elementTotalPerPerson = document.querySelector<HTMLSpanElement>('#total-per-person')!;

    elementTipPerPerson.innerHTML = `$${tipPerPerson.toFixed(2)}`;
    elementTotalPerPerson.innerHTML = `$${totalPerPerson.toFixed(2)}`;
}