import './pages/index.css'; // импорт стилей
import { initialCards } from './components/cards';
import { removeCard, likeCard, createCard } from './components/card';
import { openModal, closeModal } from './components/modal';

//поиск элемента контейнера с карточкой
export const placesList = document.querySelector('.places__list');

//кнопки закрытия попапов
const closeButtons = document.querySelectorAll('.popup__close');


const openlink = document.querySelector('.popup__image');

const openImageName = document.querySelector('.popup__caption');

// закрытия попапа по крестику
closeButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    closeModal(e.target.closest('.popup'));
  });
});

function openModalImage({ link, name }, modal) {

  openlink.src = link;
  openImageName.textContent = name;
  openImageName.alt = name;

  openModal(modal);
}

// выводим карточки на страницу
initialCards.forEach((cardElement) => {
  const newCard = createCard(cardElement, removeCard, openModalImage, likeCard);
  placesList.append(newCard);
});

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddBButton = document.querySelector('.profile__add-button');

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// прикрепляем обработчик к кнопке открытия попапа редакитрования профиля
profileEditButton.addEventListener('click', () => {
  profileNameInput.value =
    document.querySelector('.profile__title').textContent;
  profileJobInput.value = document.querySelector(
    '.profile__description'
  ).textContent;
  openModal(popupEditProfile);
});

// прикрепляем обработчик к кнопке открытия попапа добавления карточки
profileAddBButton.addEventListener('click', () => {
  openModal(popupNewCard);
  newPlaceFormElement.reset();
});


const editProfileFormElement = document.forms['edit-profile'];

const profileNameInput = editProfileFormElement.elements.name;
const profileJobInput = editProfileFormElement.elements.description;

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  const profileNameInputValue = profileNameInput.value;
  const profileJobInputValue = profileJobInput.value;

  // вставляем новые значения с помощью textContent
  profileTitle.textContent = profileNameInputValue;
  profileDescription.textContent = profileJobInputValue;

  //закрываем попап по клику на кнопку сохранить
  closeModal(popupEditProfile);
}

// Прикрепляем обработчик к форме:
editProfileFormElement.addEventListener('submit', handleEditFormSubmit);

const newPlaceFormElement = document.forms['new-place'];

const placeNameInput = newPlaceFormElement.elements['place-name'];
const placeLinkInput = newPlaceFormElement.elements.link;

// Обработчик «отправки» формы.
function handleAddFormSubmit(evt) {
  evt.preventDefault();

  // Получение объект новой карточки.
  const newCard = createCard(
    {
      name: placeNameInput.value,
      link: placeLinkInput.value,
    },
    removeCard,
    openModalImage,
    likeCard
  );

  //вставляем карточку в начало
  placesList.prepend(newCard);

  //закрываем попап по клику
  closeModal(popupNewCard);
}

// Прикрепляем обработчик к форме:
newPlaceFormElement.addEventListener('submit', handleAddFormSubmit);
