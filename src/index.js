import './pages/index.css';
import Card from './components/Card.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWIthForm.js';
import UserInfo from './components/UserInfo.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import {
    initialCards,
    popupProfileSelector,
    popupCardsSelector,
    popupPhotoSelector,
    data,
    editButton,
    addButton,
    formProfileElement,
    formCardsElement,
    nameInput,
    jobInput,
    titleInput,
    linkInput,
    cardContainer,
    formValidationOptions
} from './utils/constants.js';

//Экземпляр класса валидации
const profileValidation = new FormValidator(formValidationOptions, formProfileElement);
const cardsValidation = new FormValidator(formValidationOptions, formCardsElement);

//Включили валидацию
profileValidation.enableValidation();
cardsValidation.enableValidation();

//Экземпляр класса информации о пользователе
const userInfo = new UserInfo(data);

//Отрисовка карточек
const cardsList = new Section ({
    items: initialCards,//начальный массив карточек
    renderer: (item) => {
        const card = new Card(item.name, item.link, '.place__template', { 
            handleCardClick: () => {//обработчик собития клика на фото
                popupPhoto.openPopup(item.name, item.link);
        } 
    });
        const cardEl = card.generateCard();
        cardsList.addItem(cardEl);
    }
}, cardContainer);

//Создание экземпляра класса попапа с картинкой
const popupPhoto = new PopupWithImage(popupPhotoSelector);
popupPhoto.setEventListeners();//добавление слушателей для попапа

//Создание экземпляра класса попапа добавления фото
const popupAddCard = new PopupWithForm(popupCardsSelector, { handleFormSubmit() {//обработчик сабмита формы
    const card = new Card(titleInput.value, linkInput.value, '.place__template',  { 
        handleCardClick: () => {//обработчик собития клика на фото
            popupPhoto.openPopup(name.value, link.value);
        }
    });
    const cardEl = card.generateCard();
    cardsList.addItem(cardEl);
    popupAddCard.closePopup();
    }
})
popupAddCard.setEventListeners();//добавление слушателей для попапа

addButton.addEventListener('click', () => {//добавление слушателя для открытия попапа добавления карточек
    popupAddCard.openPopup();
    cardsValidation.resetState();//обнулили состояние кнопки сабмита
});

//Создание экземпляра класса попапа редактирования профиля
const popupProfile = new PopupWithForm(popupProfileSelector, { handleFormSubmit() {
    popupProfile.closePopup();
    userInfo.setUserInfo(nameInput.value, jobInput.value);
}})
popupProfile.setEventListeners();//добавление слушателей для попапа

editButton.addEventListener('click', () => {
    popupProfile.openPopup();
    nameInput.value = userInfo.getUserInfo().name;
    jobInput.value = userInfo.getUserInfo().job;
    
});

cardsList.renderItems();