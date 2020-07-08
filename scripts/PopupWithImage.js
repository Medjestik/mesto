import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    openPopup(name, link) {
        super.openPopup();
        this._popup.querySelector('.popup__caption').textContent = name;
        this._popup.querySelector('.popup__img').src = link;
    }
}