import {addLike, removeLike} from './api';

function getCardTemplate() {
    return document.querySelector('#card-template').content;
}

function getCardElement() {
    return cardTemplate.querySelector('.card').cloneNode(true);
}

const cardTemplate = getCardTemplate();

function handleLikeCard(evt, _id, likesNumberElement) {
    if (evt.target.classList.contains('card__like-button_is-active')) {
        removeLike(_id)
            .then((data) => {
                likesNumberElement.textContent = data.likes.length;
                evt.target.classList.toggle('card__like-button_is-active');
            })
            .catch((err) => {
                console.log(err); // выводим ошибку в консоль
            });
    } else {
        addLike(_id)
            .then((data) => {
                likesNumberElement.textContent = data.likes.length;
                evt.target.classList.toggle('card__like-button_is-active');
            })
            .catch((err) => {
                console.log(err); // выводим ошибку в консоль
            });
    }
}

function createCard(
    {name, link, likes, owner, _id},
    myID,
    openModalImage,
    popupImage,
    handleLikeCard,
    handleDeleteCard
) {
    const cardElement = getCardElement();

    cardElement.querySelector('.card__title').textContent = name;

    const likesNumberElement = cardElement.querySelector('.card__likes-counter');
    likesNumberElement.textContent = likes.length;

    const cardImage = cardElement.querySelector('.card__image');

    cardImage.src = link;
    cardImage.alt = name;

    const likeButton = cardElement.querySelector('.card__like-button');
    const deleteCardButton = cardElement.querySelector('.card__delete-button');

    deleteCardButton.addEventListener('click', (evt) =>
        handleDeleteCard(cardElement, _id)
    );

    cardImage.addEventListener('click', () => {
        openModalImage({name, link}, popupImage);
    });

    //  иконка удаление карточни только на тех карточках которые создали мы
    if (owner._id !== myID) {
        deleteCardButton.classList.add('card__delete-button_is-inactive');
    }

    if (likes.some((elem) => (elem._id === myID))) {
        likeButton.classList.add('card__like-button_is-active');
    }


    likeButton.addEventListener('click', (evt) => {
        handleLikeCard(evt, _id, likesNumberElement);
    });

    //возвращаем подготовленный к выводу элемент карточки
    return cardElement;
}

export {createCard, handleLikeCard};
