const popupProfile = document.querySelector('.popup__profile');
const popupCards = document.querySelector('.popup__cards');
const popupPhoto = document.querySelector('.popup__photo');
const editButton = document.querySelector('.profile__edit-button');
const closeProfileButton = document.querySelector('#popup__profile_type_close-button');
const submitProfileButton = document.querySelector('#popup__cards_type_submit-button');
const addButton = document.querySelector('.profile__add-button');
const deleteButton = document.querySelector('delete-button');
const closeCardsButton = document.querySelector('#popup__cards_type_close-button');
const submitCardsButton = document.querySelector('#popup__cards_type_submit-button');
const closePhotoButton = document.querySelector('#popup__photo_type_close-button');

// Находим форму в DOM
const formProfileElement = document.querySelector('.popup__container_type_profile');
const formCardsElement = document.querySelector('.popup__container_type_cards');

// Находим поля формы в DOM
let nameInput = document.querySelector('#popup__input_type_name');
let jobInput = document.querySelector('#popup__input_type_job');
let titleInput = document.querySelector('#popup__input_type_title');
let linkInput = document.querySelector('#popup__input_type_link');

// Получите значение полей из свойства value
// Выберите элементы, куда должны быть вставлены значения полей
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');

//template
const cardContainer = document.querySelector('.place__container');
const cardTemplate = document.querySelector('#place__template').content;
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function newCard (name, link) {
    const cardEl = cardTemplate.cloneNode(true);
    cardEl.querySelector('.place__caption').textContent = name;
    const photoEl =  cardEl.querySelector('.place__img');
    photoEl.src = link;
    photoEl.addEventListener('click', function () {
        popupPhoto.classList.add('popup_opened');
        document.querySelector('.popup__caption').textContent = name;
        document.querySelector('.popup__img').src = link;
        console.log(link);
    });
    cardEl.querySelector('.place__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('place__like-button-active');
    });
    cardEl.querySelector('.place__delete-button').addEventListener('click', function (evt) {
        evt.target.closest('.place__card').remove();
    });
    cardContainer.prepend(cardEl);
};

/*document.querySelector('.place__container').addEventListener('click', removeCard);
function removeCard () {
    if (event.target.classList.contains('place__delete-button')) {
        event.target.closest('.place__card').remove();
    }
};*/

//добавляем карточки из массива
initialCards.forEach(function(el) {
    newCard(el.name, el.link);
});

function popupProfileOpened () {
    if (popupProfile.classList.contains('popup_opened')) {
        popupProfile.classList.remove('popup_opened');
    }
    else {
        popupProfile.classList.add('popup_opened');
        nameInput.value = profileName.textContent;
        jobInput.value = profileJob.textContent;
    }
};

function popupCardsOpened () {
    popupCards.classList.toggle('popup_opened');
    titleInput.value = "";
    linkInput.value = "";
};

function popupPhotoClose () {
    popupPhoto.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    // Вставьте новые значения с помощью textContent
    popupProfileOpened ();
};

function formCardsHandler (evt) {
    evt.preventDefault();
    newCard (titleInput.value, linkInput.value);
    popupCardsOpened ();
};

formProfileElement.addEventListener('submit', formSubmitHandler);
formCardsElement.addEventListener('submit', formCardsHandler);
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»

//Слушатели
editButton.addEventListener('click', popupProfileOpened);
addButton.addEventListener('click', popupCardsOpened);
closeProfileButton.addEventListener('click', popupProfileOpened);
closeCardsButton.addEventListener('click', popupCardsOpened);
closePhotoButton.addEventListener('click', popupPhotoClose);
