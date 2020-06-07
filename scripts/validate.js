//валидация всех форм
function enableValidation(options) {
    const formElements = Array.from(document.querySelectorAll(options.formSelector));
    formElements.forEach (formElement => {
        const inputElements = Array.from(formElement.querySelectorAll(options.inputSelector));
        const submitButton = formElement.querySelector(options.submitButtonSelector);

        inputElements.forEach (input => {
            input.addEventListener('input', e => handleCheckInput(e, options.inputErrorClass, options.errorClass))
        })
        formElement.addEventListener('input', () => handleCheckSubmit(formElement, submitButton, options.inactiveButtonClass))
    })
}

//Проверка для кнопки сабмита
function handleCheckSubmit(formElement, submitButton, inactiveCls) {
    const hasErrors = !formElement.checkValidity();
    submitButton.disabled = hasErrors;
    submitButton.classList.toggle(inactiveCls, hasErrors);
}

//Проверка для полей инпутов
function handleCheckInput(evt, inputErrorClass, errorClass) {
    const input = evt.target;
    const isInputValid = input.checkValidity();
    if (isInputValid) {
        hideInputError(input, inputErrorClass, errorClass);
    } else {
        showInputError(input, inputErrorClass, errorClass);
    }
}

//Показать ошибки
function showInputError(input, inputErrorClass, errorClass) {
    const error = document.querySelector(`#${input.id}-error`);
    input.classList.add(inputErrorClass);
    error.classList.add(errorClass);
    error.textContent = input.validationMessage;
}

//Скрыть ошибки
function hideInputError(input, inputErrorClass, errorClass) {
    const error = document.querySelector(`#${input.id}-error`);
    input.classList.remove(inputErrorClass);
    error.classList.remove(errorClass);
    error.textContent = '';
}


