const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const submitButton = document.querySelector('.popup__submit-button');
// Находим форму в DOM
const formElement = document.querySelector('.popup__container');

function editClick () {
    popup.classList.add('popup_opened');
}
function closeClick () {
    popup.classList.remove('popup_opened');
}
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Находим поля формы в DOM
    const nameInput = document.querySelector('.popup__name');
    const jobInput = document.querySelector('.popup__job');
    // Получите значение полей из свойства value

    const profileName = document.querySelector('.profile__title');
    const profileJob = document.querySelector('.profile__subtitle');
    // Выберите элементы, куда должны быть вставлены значения полей

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    // Вставьте новые значения с помощью textContent
}
formElement.addEventListener('submit', formSubmitHandler);
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»

editButton.addEventListener('click', editClick);
closeButton.addEventListener('click', closeClick);
submitButton.addEventListener('click', closeClick);