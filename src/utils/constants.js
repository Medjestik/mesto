//Кнопки
export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');
export const avatarButton = document.querySelector('.profile__avatar-overlay');

// Формы
export const formProfileElement = document.querySelector('.popup__container_type_profile');
export const formCardsElement = document.querySelector('.popup__container_type_cards');
export const formDeleteCardElement = document.querySelector('.popup__container_type_delete-card');

// Поля
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_job');
export const titleInput = document.querySelector('.popup__input_type_title');
export const linkInput = document.querySelector('.popup__input_type_link');

export const selectorsUserInfo = {
    name: '.profile__title',
    job: '.profile__subtitle',
    avatar: '.profile__avatar-img'
};

export const config ={ 
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-13',
    headers: {
      authorization: '59580358-e9a0-4cbe-b603-f524907656bd',
      'Content-Type': 'application/json'
    }
}

//template
export const cardContainer = '.place__container';

//объект опций валидации
export const formValidationOptions = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_novalid',
    errorClass: 'popup__input-error_active'
};