import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, { handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues() {
        this._formInputs = this._popup.querySelectorAll('.popup__input');//нашли все инпуты в форме
        this._formValues = {};//создали пустой объект
        this._formInputs.forEach(input => {
            this._formValues[input.name] = input.value;//наполнили объект значениями из полей
        });

        return this._formValues;//вернули объект значений
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());//вызвали обработчик события сабмита для текущих значений инпутов
        });
    }

    closePopup() {
        super.closePopup();
        if (!this._popup.classList.contains('popup__profile')) {
            this._popup.querySelector('.popup__container').reset();//обнулили форму
        }
    }

    renderLoading(isLoading) {
        if (isLoading) {
            this._popup.querySelector('.popup__submit-button').textContent = 'Сохранение..';
        } else {
            this._popup.querySelector('.popup__submit-button').textContent = 'Сохранить';
        }
    }
 }