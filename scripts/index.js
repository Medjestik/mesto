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

//Валидация попапов
const profileValidation = new FormValidator(formValidationOptions, formProfileElement);
const cardsValidation = new FormValidator(formValidationOptions, formCardsElement);

profileValidation.enableValidation();
cardsValidation.enableValidation();

function popupProfileOpened() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    profileValidation.resetState();
    openPopup(popupProfile);
}

function popupAddCardsOpened() {
    titleInput.value = "";
    linkInput.value = "";
    cardsValidation.resetState();
    openPopup(popupCards);
}

function addInitialCards() {
    initialCards.forEach((item) => {
        const card = new Card(item.name, item.link, '.place__template');
        const cardEl = card.generateCard();
        cardContainer.prepend(cardEl);
    });
}

function openPopup(el) {
    el.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEsc);
}

function closePopup(el) {
    el.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEsc);
}

function formProfileHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupProfile);
}

function formCardsHandler(evt) {
    evt.preventDefault();
    const card = new Card(titleInput.value, linkInput.value, '.place__template');
    const cardEl = card.generateCard();
    cardContainer.prepend(cardEl);
    closePopup(popupCards);
}

function closePopupByButton(evt) {
    if (evt.target.classList.contains('popup__close-button'))  {
        const popupEl = evt.target.closest('.popup');
        closePopup(popupEl);
    }
}

function closePopupByEsc(evt) {
    const popupEl = popups.querySelector('.popup_opened');
    if (evt.key === "Escape" && popupEl !== null) {
        closePopup(popupEl);
    }
}

function closePopupByOverlay(evt) {
    if (!evt.target.closest('.container')) {
        const popupEl = popups.querySelector('.popup_opened');
        closePopup(popupEl);
    }
}

function setPopupsListeners() {
    popupsArray .forEach(popup => {
        popup.addEventListener('click', closePopupByButton);
        popup.addEventListener('mousedown', closePopupByOverlay);
    });
}


//Слушатели
formProfileElement.addEventListener('submit', formProfileHandler);
formCardsElement.addEventListener('submit', formCardsHandler);
editButton.addEventListener('click', popupProfileOpened);
addButton.addEventListener('click', popupAddCardsOpened);

addInitialCards();
setPopupsListeners();