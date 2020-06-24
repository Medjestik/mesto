const popup = document.querySelector('.popup__photo');
const image = popup.querySelector('.popup__img');
const caption = popup.querySelector('.popup__caption');

export default class Card {
    constructor (name, link, cardSelector) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
    }

    //Получаем разметку карточки
    _getTemplate() {
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.card')
        .cloneNode(true);

        return cardElement;
    }

    //Заполняем карточку данными
    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.place__caption').textContent = this._name;
        this._element.querySelector('.place__img').src = this._link;
        this._setEventListeners();

        return this._element; 
    }

    _setEventListeners() {
        this._element.querySelector('.place__delete-button').addEventListener('click', () => {
            this._removeCard();
        });
        this._likeButton = this._element.querySelector('.place__like-button');
        this._likeButton.addEventListener('click', () => {
            this._likeCard(this._likeButton);
        });
        this._element.querySelector('.place__img').addEventListener('click', () => {
            this._openPopupPhoto();
        })
    }

    _removeCard() {
        this._element.remove();
        this._element = null;
    }

    _likeCard(likeButton) {
        likeButton.classList.toggle('place__like-button-active');
    }

    _openPopupPhoto() {
        popup.classList.add('popup_opened');
        caption.textContent = this._name;
        image.src = this._link;
        document.addEventListener('keydown', this._closePopupPhoto);
    }

    _closePopupPhoto(evt) {
        if (evt.key === "Escape") {
            popup.classList.remove('popup_opened');
            document.removeEventListener('keydown', this._closePopupPhoto);
        }
    }
};