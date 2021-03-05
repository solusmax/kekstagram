import {isEscEvent} from './util.js';

const onModalCloseClick = (modalNode, closeNode) => {
  return () => {
    closeModal(modalNode, closeNode);
  }
};

const onModalEscKeydown = (modalNode, closeNode) => {
  return (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();

      closeModal(modalNode, closeNode);
    }
  }
}

let onModalCloseClickWrapper;
let onModalEscKeydownWrapper;

const openModal = (modalNode, closeNode) => {
  modalNode.classList.remove('hidden');
  document.body.classList.add('modal-open');

  onModalEscKeydownWrapper = onModalEscKeydown(modalNode, closeNode)
  onModalCloseClickWrapper = onModalCloseClick(modalNode, closeNode);

  closeNode.addEventListener('click', onModalCloseClickWrapper);
  document.addEventListener('keydown',onModalEscKeydownWrapper);
}

const closeModal = (modalNode, closeNode) => {
  modalNode.classList.add('hidden');
  document.body.classList.remove('modal-open');

  closeNode.removeEventListener('click', onModalCloseClickWrapper);
  document.removeEventListener('keydown', onModalEscKeydownWrapper);
}

export {
  openModal
}
