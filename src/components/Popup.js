export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    openPopup() {
        this._popup.classList.add('popup_opened');
    }

    closePopup() {
        this._popup.classList.remove('popup_opened');
    }

    _handleEscClose = (evt) => {
        if (evt.key === "Escape") {
            this.closePopup();
        }
    }

    _handleButtonClose = (evt) => {
        if (evt.target.classList.contains('popup__close-button')) {
            this.closePopup();
        }
    }

    _handleOverlayClose = (evt) => {
        if (!evt.target.closest('.container')) {
            this.closePopup();
        }
    }

    setEventListeners() {
        document.addEventListener('keydown', this._handleEscClose);
        this._popup.addEventListener('click', this._handleButtonClose);
        this._popup.addEventListener('mousedown', this._handleOverlayClose);
    }
}