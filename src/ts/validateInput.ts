export function validateInput(input: HTMLInputElement, error: HTMLSpanElement, ) {
    const value = Number(input.value);

    if (input.value.trim() === '' || value <= 0) {
        input.classList.add('error-input');
        error.classList.add('show');
        error.classList.remove('hide');
        error.innerHTML += 'Can\'t be zero ';
    } else {
        input.classList.remove('error-input');
        error.classList.add('hide');
        error.classList.remove('show');
    }
}