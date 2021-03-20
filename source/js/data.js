import { showErrorMessage } from './util.js';

const PHOTOS_DATA_URL = 'https://22.javascript.pages.academy/kekstagram/data';
const SENDING_PHOTO_URL = 'https://22.javascript.pages.academy/kekstagram';

const messages = {
  sending: 'Отправка...',
  loadingError: 'Ошибка загрузки изображений',
  sendingError: 'Ошибка загрузки файла',
}

const submitButtonNode = document.querySelector('#upload-submit');

let initialSubmitButtonText;

const getPhotosData = (onSuccess) => {
  fetch(PHOTOS_DATA_URL)
    .then((response) => {
      if (response.ok) {
        return response.json()
      }

      throw new Error(messages.loadingError);
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
  submitButtonNode.textContent = messages.sending;
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
        throw new Error(messages.sendingError);
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
