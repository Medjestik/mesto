const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const submitButton = document.querySelector('.popup__submit-button');
// Находим форму в DOM
const formElement = document.querySelector('.popup__container');
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
// Получите значение полей из свойства value
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');
// Выберите элементы, куда должны быть вставлены значения полей

function popupOpened () {
    if (popup.classList.contains('popup_opened')) {
        popup.classList.remove('popup_opened');
    }
    else {
        popup.classList.add('popup_opened');
        nameInput.value = profileName.textContent;
        jobInput.value = profileJob.textContent;
    }
}
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    // Вставьте новые значения с помощью textContent
    popupOpened ();
}
formElement.addEventListener('submit', formSubmitHandler);
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
editButton.addEventListener('click', popupOpened);
closeButton.addEventListener('click', popupOpened);