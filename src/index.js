import './pages/index.css';
import {initialCards} from './components/cards';
import {removeCard, likeCard, createCard} from './components/card';
import {openModal, closeModal} from './components/modal';

export const placesList = document.querySelector('.places__list');

const closeButtons = document.querySelectorAll('.popup__close');


const openlink = document.querySelector('.popup__image');

const openImageName = document.querySelector('.popup__caption');

closeButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        closeModal(e.target.closest('.popup'));
    });
});

function openModalImage({link, name}, modal) {

    openlink.src = link;
    openImageName.textContent = name;
    openImageName.alt = name;

    openModal(modal);
}

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

profileEditButton.addEventListener('click', () => {
    profileNameInput.value =
        document.querySelector('.profile__title').textContent;
    profileJobInput.value = document.querySelector(
        '.profile__description'
    ).textContent;
    openModal(popupEditProfile);
});

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

    profileTitle.textContent = profileNameInputValue;
    profileDescription.textContent = profileJobInputValue;

    closeModal(popupEditProfile);
}

editProfileFormElement.addEventListener('submit', handleEditFormSubmit);

const newPlaceFormElement = document.forms['new-place'];

const placeNameInput = newPlaceFormElement.elements['place-name'];
const placeLinkInput = newPlaceFormElement.elements.link;

function handleAddFormSubmit(evt) {
    evt.preventDefault();

    const newCard = createCard(
        {
            name: placeNameInput.value,
            link: placeLinkInput.value,
        },
        removeCard,
        openModalImage,
        likeCard
    );

    placesList.prepend(newCard);

    closeModal(popupNewCard);
}

newPlaceFormElement.addEventListener('submit', handleAddFormSubmit);
