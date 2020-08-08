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

function makeCard (userId, data) {
    const card = new Card(data, userId, '.place__template',  { 
        handleCardClick: () => {//обработчик собития клика на фото
            popupPhoto.openPopup(data.name, data.link);
            }
        }, { handleDeleteCard: () => {//обработчик собития клика на иконку удаления
            popupDeleteCard.openPopup();
            popupDeleteCard.setHandleSubmit(function() {
                api.deleteCard(data._id)
                .then(() => {
                    card.removeCard();
                    popupDeleteCard.closePopup();
                })
                .catch(() => {
                    console.log('_handleResponseError');
                })
            });
            }
        }, { handlePutLike: () => {
            api.putLike(data._id)
            .then((res) => {
                card.countLikes(res);
            })
            .catch(() => {
                console.log('_handleResponseError');
            })
            }
        }, { handleRemoveLike: () => {
            api.removeLike(data._id)
            .then((res) => {
                card.countLikes(res);
            })
            .catch(() => {
                console.log('_handleResponseError');
            })
            } 
        });

    return card;
}

//Загрузка информации о пользователе с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
.then((data) => {
    const [UserData, initialCards] = data;
    userInfo.setUserInfo(UserData);
    userInfo.setAvatar(UserData.avatar);
    
    //Отрисовка карточек с сервера
    const cardsList = new Section ({
        renderer: (item) => {
            const cardEl = makeCard(UserData._id, item).generateCard();
            cardsList.addItem(cardEl);
        }
    }, cardContainer);

    cardsList.renderItems(initialCards);

    //Создание экземпляра класса попапа добавления фото
    const popupAddCard = new PopupWithForm('.popup__cards', { handleFormSubmit() {//обработчик сабмита формы
        popupAddCard.renderLoading(true);
        api.addCard(titleInput.value, linkInput.value)
        .then((data) => {
            const cardEl = makeCard(UserData._id, data).generateCard();
            cardsList.addItem(cardEl);
            popupAddCard.closePopup();
        })
        .catch(() => {
            console.log('_handleResponseError');
        })
        .finally(() => {
            popupAddCard.renderLoading(false);
        })
        }
    })
    popupAddCard.setEventListeners();//добавление слушателей для попапа

    addButton.addEventListener('click', () => {//добавление слушателя для открытия попапа добавления карточек
        popupAddCard.openPopup();
        cardsValidation.resetState();//обнулили состояние кнопки сабмита
    });
})
.catch(() => {
    console.log('_handleResponseError');
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
        popupProfile.closePopup();
    }))
    .catch(() => {
        console.log('_handleResponseError');
    })
    .finally(() => {
        popupProfile.renderLoading(false);
    })
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
        popupAvatar.closePopup();
    }))
    .catch(() => {
        console.log('_handleResponseError');
    })
    .finally(() => {
        popupAvatar.renderLoading(false);
    })
}})
popupAvatar.setEventListeners();

avatarButton.addEventListener('click', () => {
    popupAvatar.openPopup();
    avatarValidation.resetState();
});

