import { isEscEvent } from './util.js';
import { resetPictureSettings } from './upload-picture.js';

const onModalCloseClick = (modalNode, closeNode, specialModal) => {
  return () => {
    closeModal(modalNode, closeNode, specialModal);
  }
};

const onModalEscKeydown = (modalNode, closeNode, specialModal) => {
  return (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();

      closeModal(modalNode, closeNode, specialModal);
    }
  }
}

let onModalCloseClickWrapper;
let onModalEscKeydownWrapper;

const openModal = (modalNode, closeNode, specialModal) => {
  modalNode.classList.remove('hidden');
  document.body.classList.add('modal-open');

  onModalEscKeydownWrapper = onModalEscKeydown(modalNode, closeNode, specialModal)
  onModalCloseClickWrapper = onModalCloseClick(modalNode, closeNode, specialModal);

  closeNode.addEventListener('click', onModalCloseClickWrapper);
  document.addEventListener('keydown',onModalEscKeydownWrapper);
}

const closeModal = (modalNode, closeNode, specialModal) => {
  modalNode.classList.add('hidden');
  document.body.classList.remove('modal-open');

  closeNode.removeEventListener('click', onModalCloseClickWrapper);
  document.removeEventListener('keydown', onModalEscKeydownWrapper);

  if (specialModal === 'upload') {
    resetPictureSettings();
  }
}

export {
  openModal
}
