import {initialCards} from './initialCards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

//Попапы
const popups = document.querySelector('.popups');
const popupProfile = document.querySelector('.popup__profile');
const popupCards = document.querySelector('.popup__cards');
const popupsArray =  Array.from(document.querySelectorAll('.popup'));

//Кнопки
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// Формы
const formProfileElement = document.querySelector('.popup__container_type_profile');
const formCardsElement = document.querySelector('.popup__container_type_cards');

// Поля
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

//template
const cardContainer = document.querySelector('.place__container');

//объект опций валидации
const formValidationOptions = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_novalid',
    errorClass: 'popup__input-error_active'
};

initialCards.forEach((item) => {
    const card = new Card(item.name, item.link, '.place__template');
    const cardEl = card.generateCard();
    cardContainer.prepend(cardEl);
});

function openPopup(el) {
    el.classList.add('popup_opened');
}

function popupProfileOpened() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    const validation = new FormValidator(formValidationOptions, formProfileElement);
    validation.enableValidation();
    validation.resetState();
    openPopup(popupProfile);
}

function popupAddCardsOpened() {
    titleInput.value = "";
    linkInput.value = "";
    const validation = new FormValidator(formValidationOptions, formCardsElement);
    validation.enableValidation();
    validation.resetState();
    openPopup(popupCards);
}

function formProfileHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
}

function formCardsHandler(evt) {
    evt.preventDefault();
    const card = new Card(titleInput.value, linkInput.value, '.place__template');
    const cardEl = card.generateCard();
    cardContainer.prepend(cardEl);
}

function closePopupByButton(evt) {
    if (evt.target.classList.contains('popup__close-button') || evt.target.classList.contains('popup__submit-button') )  {
        const popupElement = evt.target.closest('.popup');
        popupElement.classList.remove('popup_opened');
    }
}

function closePopupByEsc(evt) {
    const popupEl = popups.querySelector('.popup_opened');
    if (evt.key === "Escape" && popupEl !== null) {
        popupEl.classList.remove('popup_opened');
    }
}

function closePopupByOverlay(evt) {
    if (!evt.target.closest('.container')) {
        const popupEl = popups.querySelector('.popup_opened');
        popupEl.classList.remove('popup_opened');
    }
}

popupsArray .forEach(popup => {
    popup.addEventListener('click', closePopupByButton);
    popup.addEventListener('mousedown', closePopupByOverlay);
    document.addEventListener('keydown', closePopupByEsc);
});

//Слушатели
formProfileElement.addEventListener('submit', formProfileHandler);
formCardsElement.addEventListener('submit', formCardsHandler);
editButton.addEventListener('click', popupProfileOpened);
addButton.addEventListener('click', popupAddCardsOpened);