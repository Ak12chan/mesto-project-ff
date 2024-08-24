import './pages/index.css'; // импорт главного файла стилей
import { createCard, handleLikeCard } from './components/card';
import { openModal, closeModal } from './components/modal';
import { enableValidation, clearValidation } from './components/validation';
import {
  getInitialCards,
  getUserInfo,
  editUserInfo,
  editAvatar,
  addNewCard,
  deleteCard,
} from './components/api.js';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

enableValidation(validationConfig);

let myID = null;

let currentCard, currentCardId;

const placesList = document.querySelector('.places__list');

const closeModalButtons = document.querySelectorAll('.popup__close');

closeModalButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    closeModal(e.target.closest('.popup'));
  });
});

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddBButton = document.querySelector('.profile__add-button');
const profileAvatar = document.querySelector('.profile__image');

const openModalImagelink = document.querySelector('.popup__image');
const openModalImageName = document.querySelector('.popup__caption');

const popupImage = document.querySelector('.popup_type_image');

const popupEditProfile = document.querySelector('.popup_type_edit');

const popupAddCard = document.querySelector('.popup_type_new-card');

const popupAvatar = document.querySelector('.popup_type_avatar');

const popupDeleteCard = document.querySelector('.popup_type_delete-card');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const popupButton = popupEditProfile.querySelector('.popup__button');
const submitButton = popupAvatar.querySelector('.popup__button');

profileEditButton.addEventListener('click', () => {
  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileDescription.textContent;
  openModal(popupEditProfile);
});

profileAvatar.addEventListener('click', () => {
  openModal(popupAvatar);
  clearValidation(editAvatarFormElement, validationConfig);
});

profileAddBButton.addEventListener('click', () => {
  openModal(popupAddCard);
  //очищаем форму после открытия
  clearValidation(newPlaceFormElement, validationConfig);
});

const editProfileFormElement = document.forms['edit-profile'];

const profileNameInput = editProfileFormElement.elements.name;
const profileJobInput = editProfileFormElement.elements.description;

function renderLoading(isLoading, button) {
  button.textContent = isLoading ? 'Сохранение...' : 'Сохранить';
}

function handleEditFormSubmit(evt) {
  evt.preventDefault(); // Отмена стандартной отправки формы
  renderLoading(true, popupButton);

  editUserInfo({
    name: profileNameInput.value,
    about: profileJobInput.value,
  })
    .then((profileData) => {
      profileTitle.textContent = profileData.name;
      profileDescription.textContent = profileData.about;
      closeModal(popupEditProfile);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => renderLoading(false, popupButton));
}

editProfileFormElement.addEventListener('submit', handleEditFormSubmit);

const newPlaceFormElement = document.forms['new-place'];

const placeNameInput = newPlaceFormElement.elements['place-name'];
const placeLinkInput = newPlaceFormElement.elements.link;

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, popupButton);
  addNewCard({
    name: placeNameInput.value,
    link: placeLinkInput.value,
  }) // вывод карточки на страницу
    .then((cardData) => {
      //Вставка карточки в начало
      placesList.prepend(
        createCard(
          cardData,
          myID,
          openModalImage,
          popupImage,
          handleLikeCard,
          handleModalWindow
        )
      );
      clearValidation(newPlaceFormElement, validationConfig);
      closeModal(popupAddCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(false, popupButton));
}

newPlaceFormElement.addEventListener('submit', handleAddFormSubmit);

const editAvatarFormElement = document.forms['new-avatar'];

const avatarLinkInput = editAvatarFormElement.elements.link;


function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, submitButton);

  editAvatar({
    avatar: avatarLinkInput.value,
  })
    .then((data) => {
      profileAvatar.style.backgroundImage = `url(\'${data.avatar}\')`;
      clearValidation(editAvatarFormElement, validationConfig);
      closeModal(popupAvatar);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => renderLoading(false, submitButton));
}

editAvatarFormElement.addEventListener('submit', handleAvatarFormSubmit);

const deleteCardFormElement = document.forms['delete-card'];

function handleModalWindow(cardElement, _id) {
  openModal(popupDeleteCard);
  currentCardId = _id;
  currentCard = cardElement;
}

function handleDeleteCardFormSubmit(evt) {
  evt.preventDefault(); //Эта строчка отменяет стандартную отправку формы.
  deleteCard(currentCardId)
    .then(() => {
      currentCard.remove();
      closeModal(popupDeleteCard);
    })
    .catch((err) => console.log(err));
}

deleteCardFormElement.addEventListener('submit', handleDeleteCardFormSubmit);


function openModalImage({ link, name }, modal) {
  openModalImagelink.src = link;
  openModalImageName.textContent = name;
  openModalImageName.alt = name;

  openModal(modal);
}

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cardsArray]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(\'${userData.avatar}\')`;
    profileAvatar.src = userData.avatar;
    myID = userData._id;
    cardsArray.forEach((cardElement) => {
      const newCard = createCard(
        cardElement,
        myID,
        openModalImage,
        popupImage,
        handleLikeCard,
        handleModalWindow
      );
      placesList.append(newCard);
    });
  })
  .catch((err) => {
    console.log(err);
  });
