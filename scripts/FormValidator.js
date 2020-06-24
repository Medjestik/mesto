export default class FormValidator {
    constructor (options, formElement) {
        this._formElement = formElement;
        this._inputSelector = options.inputSelector;
        this._inactiveButtonClass = options.inactiveButtonClass;
        this._inputErrorClass = options.inputErrorClass;
        this._errorClass = options.errorClass;
        this._submitButton = this._formElement.querySelector(options.submitButtonSelector);
    }

    //валидация всех форм
    enableValidation() { 
        const inputElements = Array.from(this._formElement.querySelectorAll(this._inputSelector));   

        inputElements.forEach (input => {
            input.addEventListener('input', e => this._handleCheckInput(e, this._inputErrorClass, this._errorClass));
        });
        this._formElement.addEventListener('input', () => this._handleCheckSubmit(this._formElement, this._submitButton, this._inactiveButtonClass));
    }

    //сброс ошибок и состояния кнопки при открытие попапа
    resetState() {
        const inputElements = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        inputElements.forEach (input => {
            this._hideInputError(input, this._inputErrorClass, this._errorClass);
        });
        this._handleCheckSubmit(this._formElement, this._submitButton, this._inactiveButtonClass);
    }

    //Проверка для кнопки сабмита
    _handleCheckSubmit(formElement, submitButton, inactiveCls) {
        const hasErrors = !formElement.checkValidity();
        submitButton.disabled = hasErrors;
        submitButton.classList.toggle(inactiveCls, hasErrors);
    }

    //Проверка для полей инпутов
    _handleCheckInput(evt, inputErrorClass, errorClass) {
        const input = evt.target;
        const isInputValid = input.checkValidity();
        if (isInputValid) {
            this._hideInputError(input, inputErrorClass, errorClass);
        } else {
            this._showInputError(input, inputErrorClass, errorClass);
        }
    }

    //Показать ошибки
    _showInputError(input, inputErrorClass, errorClass) {
        const error = this._formElement.querySelector(`#${input.id}-error`);
        input.classList.add(inputErrorClass);
        error.classList.add(errorClass);
        error.textContent = input.validationMessage;
    }

    //Скрыть ошибки
    _hideInputError(input, inputErrorClass, errorClass) {
        const error = this._formElement.querySelector(`#${input.id}-error`);
        input.classList.remove(inputErrorClass);
        error.classList.remove(errorClass);
        error.textContent = '';
    }
};