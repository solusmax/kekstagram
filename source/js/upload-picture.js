import { resetPicturePreview, showPictureLoader, hidePictureLoader, loadChosenPicture } from './render-preview.js';
import { openModal, closeModal } from './modal.js';
import { resetScale } from './scale.js';
import { removeSlider, resetPictureEffect, resetEffectRadioButtons } from './effects.js';
import { hashtagsFieldNode } from './hashtags-validation.js';
import { descriptionFieldNode } from './description-validation.js';
import { sendPhotoData } from './data.js';
import { isEscEvent, clearFormField, showErrorMessage } from './util.js';

const PICTURE_FILE_TYPES = [
  'jpg',
  'jpeg',
  'png',
];
const WRONG_TYPE_ERROR_MESSAGE = 'Выбран неподходящий файл';
const ERROR_MESSAGE_DURATION = 1500;
const ERROR_BORDER_STYLE = '3px red solid';

const uploadForm = document.querySelector('#upload-select-image');
const uploadButtonNode = uploadForm.querySelector('#upload-file');
const uploadModalNode = uploadForm.querySelector('.img-upload__overlay');
const closeButtonNode = uploadModalNode.querySelector('#upload-cancel');
const mainNode = document.querySelector('main');

const resetUploadValue = () => {
  uploadButtonNode.value = null;
}

const reportValidationError = (field, string, borderStyle) => {
  field.style.border = borderStyle;
  field.setCustomValidity(string);
  field.reportValidity();
}

const reportNoValidationError = (field) => reportValidationError(field, '', null);

const isUploadFieldInFocus = (evt) => {
  return (
    evt.target === hashtagsFieldNode ||
    evt.target === descriptionFieldNode
  );
}

const resetUploadSettings = () => {
  resetScale();
  resetPictureEffect();
  removeSlider();
  resetEffectRadioButtons();
  resetUploadValue();
  resetPicturePreview();
  reportNoValidationError(hashtagsFieldNode);
  reportNoValidationError(descriptionFieldNode);
  clearFormField(hashtagsFieldNode);
  clearFormField(descriptionFieldNode);
}

const isPictureTypeMatch = (pictureName) => PICTURE_FILE_TYPES.some((fileType) => pictureName.endsWith(`.${fileType}`));

const onMessageOkayButtonClick = (messageNode) => {
  return () => {
    hideResultMessage(messageNode);
  }
}

const onMessageClick = (messageNode) => {
  return () => {
    hideResultMessage(messageNode);
  }
}

const onMessageInnerClick = (evt) => {
  evt.stopPropagation();
}

const onMessageEscKeydown = (messageNode) => {
  return (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();

      hideResultMessage(messageNode);
    }
  }
}

let onMessageEscKeydownWrapper;

const hideResultMessage = (messageNode) => {
  messageNode.remove();

  document.removeEventListener('keydown', onMessageEscKeydownWrapper);
}

const showResultMessage = (result) => {
  return () => {
    closeModal(uploadModalNode, closeButtonNode, 'upload');

    const messageTemplateNode = document.querySelector(`#${result}`)
      .content
      .querySelector(`.${result}`);
    const messageNode = messageTemplateNode.cloneNode(true);
    const messageInnerNode = messageNode.querySelector(`.${result}__inner`);
    const messageOkayButtonNode = messageNode.querySelector(`.${result}__button`);

    onMessageEscKeydownWrapper = onMessageEscKeydown(messageNode);

    messageOkayButtonNode.addEventListener('click', onMessageOkayButtonClick(messageNode));
    messageNode.addEventListener('click', onMessageClick(messageNode));
    messageInnerNode.addEventListener('click', onMessageInnerClick);
    document.addEventListener('keydown', onMessageEscKeydownWrapper);

    mainNode.appendChild(messageNode);
  }
}

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();

  const uploadFormData = new FormData(uploadForm);

  sendPhotoData(
    showResultMessage('success'),
    showResultMessage('error'),
    uploadFormData,
  );
}

const onUploadButtonInput = () => {
  const chosenPicture = uploadButtonNode.files[0];
  const chosenPictureName = chosenPicture.name.toLowerCase();

  if (!isPictureTypeMatch(chosenPictureName)) {
    showErrorMessage(WRONG_TYPE_ERROR_MESSAGE, ERROR_MESSAGE_DURATION);
    resetUploadValue();
    return;
  }

  showPictureLoader();

  loadChosenPicture(chosenPicture)
    .then(() => {
      hidePictureLoader();
      openModal(uploadModalNode, closeButtonNode, 'upload');
    });
}

uploadButtonNode.addEventListener('input', onUploadButtonInput);

uploadForm.addEventListener('submit', onUploadFormSubmit);

export {
  resetUploadSettings,
  isUploadFieldInFocus,
  reportValidationError,
  reportNoValidationError,
  ERROR_BORDER_STYLE,
  uploadForm
}
