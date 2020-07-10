import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector, captionSelector, imgSelector) {
        super(popupSelector);
        this._captionSelector = captionSelector;
        this._imgSelector = imgSelector;
    }

    openPopup(name, link) {
        super.openPopup();
        this._popup.querySelector(this._captionSelector).textContent = name;
        this._popup.querySelector(this._imgSelector).src = link;
        this._popup.querySelector(this._imgSelector).alt = name;
    }
}