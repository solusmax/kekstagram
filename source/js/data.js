import { showErrorMessage } from './util.js';

const PHOTOS_DATA_URL = 'https://22.javascript.pages.academy/kekstagram/data';
const SENDING_PHOTO_URL = 'https://22.javascript.pages.academy/kekstagram';
const Messages = {
  SENDING: 'Отправка...',
  LOADING_ERROR: 'Ошибка загрузки изображений',
  SENDING_ERROR: 'Ошибка загрузки файла',
}

const submitButtonNode = document.querySelector('#upload-submit');

let initialSubmitButtonText;

const getPhotosData = (onSuccess) => {
  fetch(PHOTOS_DATA_URL)
    .then((response) => {
      if (response.ok) {
        return response.json()
      }

      throw new Error(Messages.LOADING_ERROR);
    })
    .then((photos) => {
      onSuccess(photos);
    })
    .catch((err) => {
      showErrorMessage(err.message);
    });
}

const showSendingMessageOnSubmitButton = () => {
  initialSubmitButtonText = submitButtonNode.textContent;
  submitButtonNode.textContent = Messages.SENDING;
  submitButtonNode.disabled = true;
}

const resetSubmitButton = () => {
  submitButtonNode.textContent = initialSubmitButtonText;
  submitButtonNode.disabled = false;
}

const sendPhotoData = (onSuccess, onError, body) => {
  showSendingMessageOnSubmitButton();

  fetch(SENDING_PHOTO_URL, {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        throw new Error(Messages.SENDING_ERROR);
      }
    })
    .catch(() => {
      onError();
    })
    .finally(() => {
      resetSubmitButton();
    });
}

export {
  getPhotosData,
  sendPhotoData
}
