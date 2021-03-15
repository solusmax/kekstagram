import { showErrorMessage } from './util.js';

const PHOTOS_DATA_URL = 'https://22.javascript.pages.academy/kekstagram/data';
const SENDING_PHOTO_URL = 'https://22.javascript.pages.academy/kekstagram';

const ERROR_LOADING_MESSAGE = 'Ошибка загрузки изображений'
const ERROR_SENDING_MESSAGE = 'Ошибка загрузки файла';

const getPhotosData = (onSuccess) => {
  fetch(PHOTOS_DATA_URL)
    .then((response) => {
      if (response.ok) {
        return response.json()
      }

      throw new Error(ERROR_LOADING_MESSAGE);
    })
    .then((photos) => {
      onSuccess(photos);
    })
    .catch((err) => {
      showErrorMessage(err.message);
    });
}

const sendPhotoData = (onSuccess, onError, body) => {
  fetch(SENDING_PHOTO_URL, {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        throw new Error(ERROR_SENDING_MESSAGE);
      }
    })
    .catch(() => {
      onError();
    });
}

export {
  getPhotosData,
  sendPhotoData
}
