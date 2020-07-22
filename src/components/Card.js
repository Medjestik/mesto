export default class Card {
    constructor (card, userId, cardSelector, { handleCardClick }, { handleDeleteCard }, { handlePutLike }, { handleRemoveLike }) {
        this._name = card.name;
        this._link = card.link;
        this._likes = card.likes;
        this._cardId = card._id;
        this._userId = userId;
        this._owner = card.owner;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCard = handleDeleteCard;
        this._handlePutLike = handlePutLike;
        this._handleRemoveLike = handleRemoveLike;
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
        const cardImage = this._element.querySelector('.place__img');
        this._element.querySelector('.place__like-count').textContent = this._likes.length;
        cardImage.src = this._link; 
        cardImage.alt = this._name; 
        this._setEventListeners();
        this._likes.forEach (item => {
            if (item._id === this._userId) {
                this._likeButton.classList.add('place__like-button-active');
            }
        })

        if (this._owner._id !== this._userId) {
            this._element.querySelector('.place__delete-button').classList.add('place__delete-button_disabled');
        }
 
        return this._element;  
    }

    _setEventListeners() {
        this._element.querySelector('.place__delete-button').addEventListener('click', () => {
            this._handleDeleteCard();
        });
        this._likeButton = this._element.querySelector('.place__like-button');
        this._likeButton.addEventListener('click', () => {
            this._likeCard();
        });
        this._element.querySelector('.place__img').addEventListener('click', () => {
            this._handleCardClick();
        })
    }

    removeCard() {
        this._element.remove();
        this._element = null;
    }

    _likeCard() {
        const likeButton = this._element.querySelector('.place__like-button');
        const numberOfLikes = this._element.querySelector('.place__like-count');
        if (likeButton.classList.contains('place__like-button-active')) {
            this._handleRemoveLike(likeButton, numberOfLikes);
        } else {
            this._handlePutLike(likeButton, numberOfLikes);
        }
    }
};