//Попапы
const popups = document.querySelector('.popups');
const popupProfile = document.querySelector('.popup__profile');
const popupCards = document.querySelector('.popup__cards');
const popupPhoto = document.querySelector('.popup__photo');

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
const cardTemplate = document.querySelector('.place__template').content;

function newCard(name, link) {
    const cardEl = cardTemplate.cloneNode(true);
    cardEl.querySelector('.place__caption').textContent = name;
    const photoEl =  cardEl.querySelector('.place__img');
    photoEl.src = link;
    photoEl.addEventListener('click', function() {
        openPopup(popupPhoto);
        document.querySelector('.popup__caption').textContent = name;
        document.querySelector('.popup__img').src = link;
    });
    cardEl.querySelector('.place__like-button').addEventListener('click', function(evt) {
        evt.target.classList.toggle('place__like-button-active');
    });
    cardEl.querySelector('.place__delete-button').addEventListener('click', function(evt) {
        evt.target.closest('.place__card').remove();
    });
    renderCard(cardEl);
};

function renderCard(el) {
    cardContainer.prepend(el);
}

//добавляем карточки из массива в другом скрипте
initialCards.forEach(function(el) {
    newCard(el.name, el.link);
});

function openPopup(el) {
    el.classList.add('popup_opened');
};

function closePopup(evt) {
    if (evt.target.classList.contains('popup__close-button') || evt.target.classList.contains('popup__submit-button') )  {
        const popupElement = evt.target.closest('.popup');
        popupElement.classList.remove('popup_opened');
    }
};

function popupProfileOpened() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openPopup(popupProfile);
};

function popupCardsOpened() {
    titleInput.value = "";
    linkInput.value = "";
    openPopup(popupCards);
};

function formProfileHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
};

function formCardsHandler(evt) {
    evt.preventDefault();
    newCard(titleInput.value, linkInput.value);
};

//Слушатели
formProfileElement.addEventListener('submit', formProfileHandler);
formCardsElement.addEventListener('submit', formCardsHandler);
editButton.addEventListener('click', popupProfileOpened);
addButton.addEventListener('click', popupCardsOpened);
popups.addEventListener('click', closePopup);