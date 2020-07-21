import './index.css';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWIthForm.js';
import PopupDeleteCard from '../components/PopupDeleteCard.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Api from '../components/Api.js';
import {
    selectorsUserInfo ,
    config,
    editButton,
    addButton,
    avatarButton,
    formProfileElement,
    formCardsElement,
    formDeleteCardElement,
    nameInput,
    jobInput,
    titleInput,
    linkInput,
    cardContainer,
    formValidationOptions
} from '../utils/constants.js';


//Экземпляр класса валидации
const profileValidation = new FormValidator(formValidationOptions, formProfileElement);
const cardsValidation = new FormValidator(formValidationOptions, formCardsElement);
const avatarValidation = new FormValidator(formValidationOptions, formDeleteCardElement);

//Включили валидацию
profileValidation.enableValidation();
cardsValidation.enableValidation();
avatarValidation.enableValidation();

//Экземпляр класса Api
const api = new Api(config);

//Экземпляр класса информации о пользователе
const userInfo = new UserInfo(selectorsUserInfo);

//Загрузка информации о пользователе с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
.then((data) => {
    userInfo.setUserInfo(data[0]);
    userInfo.setAvatar(data[0].avatar)

    const userId = data[0]._id;

    //Отрисовка карточек с сервера
    const cardsList = new Section ({
        items: data[1],
        renderer: (item) => {
            const card = new Card(item, userId, '.place__template', { 
                handleCardClick: () => {//обработчик события клика на фото
                    popupPhoto.openPopup(item.name, item.link);
            }
        }, { handleDeleteCard: () => {//обработчик события клика на иконку удаления
                popupDeleteCard.openPopup();
                popupDeleteCard.setHandleSubmit(function(){
                    api.deleteCard(item._id);
                    card.removeCard();
                    popupDeleteCard.closePopup();
                });
            }
        }, { handlePutLike: () => {//обработчик события клика на иконку лайка
            api.putLike(item._id);
            }
        }, { handleRemoveLike: () => {//обработчик события клика на иконку лайка
            api.removeLike(item._id);
        } 
    });
        const cardEl = card.generateCard();
        cardsList.addItem(cardEl);
        }
    }, cardContainer);

    cardsList.renderItems();

    //Создание экземпляра класса попапа добавления фото
    const popupAddCard = new PopupWithForm('.popup__cards', { handleFormSubmit() {//обработчик сабмита формы
        popupAddCard.renderLoading(true);
        api.addCard(titleInput.value, linkInput.value)
        .then((data) => {
            const card = new Card(data, userId, '.place__template',  
            { 
                handleCardClick: (name, link) => {//обработчик собития клика на фото
                    popupPhoto.openPopup(name, link);
                }
            }, { handleDeleteCard: () => {//обработчик собития клика на иконку удаления
                popupDeleteCard.openPopup();
                popupDeleteCard.setHandleSubmit(function() {
                    api.deleteCard(data._id);
                    card.removeCard();
                    popupDeleteCard.closePopup();
                });
            }
            }, { handlePutLike: () => {
                api.putLike(data._id);
                }
            }, { handleRemoveLike: () => {
                api.removeLike(data._id);
                } 
            });
            const cardEl = card.generateCard();
            cardsList.addItem(cardEl);
            popupAddCard.closePopup();
            })
        .catch((err) => {
            console.log('_handleResponseError');
            return Promise.reject(err.message);
        })
        .finally(() => {
            popupAddCard.renderLoading(false);
            popupAddCard.closePopup();
        })
        }
    })
    popupAddCard.setEventListeners();//добавление слушателей для попапа

    addButton.addEventListener('click', () => {//добавление слушателя для открытия попапа добавления карточек
        popupAddCard.openPopup();
        cardsValidation.resetState();//обнулили состояние кнопки сабмита
    });
})
.catch((err) => {
    console.log('_handleResponseError');
    return Promise.reject(err.message);
})


//Создание экземпляра класса попапа удаления карточки
const popupDeleteCard = new PopupDeleteCard('.popup__delete-card');
popupDeleteCard.setEventListeners();

//Создание экземпляра класса попапа с картинкой
const popupPhoto = new PopupWithImage('.popup__photo', '.popup__caption', '.popup__img');
popupPhoto.setEventListeners();//добавление слушателей для попапа

//Создание экземпляра класса попапа редактирования профиля
const popupProfile = new PopupWithForm('.popup__profile', { handleFormSubmit() {
    popupProfile.renderLoading(true);
    api.editUserInfo(nameInput.value, jobInput.value)
    .then((data => {
        userInfo.setUserInfo({name: data.name, about: data.about});
    }))
    .catch((err) => {
        console.log('_handleResponseError');
        return Promise.reject(err.message);
    })
    .finally(() => {
        popupProfile.renderLoading(false);
        popupProfile.closePopup();
    })
    
    popupProfile.closePopup();
}})
popupProfile.setEventListeners();//добавление слушателей для попапа

editButton.addEventListener('click', () => {
    popupProfile.openPopup();
    nameInput.value = userInfo.getUserInfo().name;
    jobInput.value = userInfo.getUserInfo().job;
    profileValidation.resetState();
});

const popupAvatar = new PopupWithForm('.popup__change-avatar', { handleFormSubmit(data) {
    popupAvatar.renderLoading(true);
    api.changeAvatar(data.link)
    .then((data => {
        userInfo.setAvatar(data.avatar);
    }))
    .catch((err) => {
        console.log('_handleResponseError');
        return Promise.reject(err.message);
    })
    .finally(() => {
        popupAvatar.renderLoading(false);
        popupAvatar.closePopup();
    })
    
}})
popupAvatar.setEventListeners();

avatarButton.addEventListener('click', () => {
    popupAvatar.openPopup();
    avatarValidation.resetState();
});

