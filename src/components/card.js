function getTemplateCard() {
    return document.querySelector('#card-template').content;
}

const templateCard = getTemplateCard();

function getCardElement() {
    return templateCard.querySelector('.card').cloneNode(true);
}


function removeCard(card) {
    card.remove();
}

function likeCard(evt) {
    if (evt.target.classList.contains('card__like-button')) {
        evt.target.classList.toggle('card__like-button_is-active');
    }
}

function createCard({name, link}, removeCard, openModalImage, likeCard) {
    const cardElement = getCardElement();
    cardElement.querySelector('.card__title').textContent = name;

    const cardImage = cardElement.querySelector('.card__image');

    cardImage.src = link;
    cardImage.alt = name;

    cardElement
        .querySelector('.card__delete-button')
        .addEventListener('click', () => {
            removeCard(cardElement);
        });

    cardImage.addEventListener('click', () => {
        openModalImage({name, link});
    });

    const likesContainer = cardElement.querySelector('.card__description');

    likesContainer.addEventListener('click', (evt) => {
        likeCard(evt);
    });

    return cardElement;
}

export {removeCard, likeCard, createCard};
