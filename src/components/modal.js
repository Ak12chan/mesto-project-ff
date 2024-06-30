// функция окрытия попапа
function openModal(modal) {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keyup', modalcloseByEsc);
  document.addEventListener('mouseup', closeModalOnOverlay);
}

// функция закрытия попапа
function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keyup', modalcloseByEsc);
  document.removeEventListener('mouseup', closeModalOnOverlay);
}

function closeModalOnOverlay(evt) {
  if (evt.target.classList.contains('popup_is-opened')) {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
  }
}

// функция закрытия нажатием на Esc
function modalcloseByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
  }
}

export { openModal, closeModal, closeModalOnOverlay, modalcloseByEsc };
