import { openModal, closeModal } from './modal.js';
import { resetScale } from './scale.js';
import { removeSlider, resetPictureEffect, resetEffectRadioButtons } from './effects.js';
import { hashtagsFieldNode } from './hashtags-validation.js';
import { commentFieldNode } from './comment-validation.js';
import { sendPhotoData } from './data.js';
import { isEscEvent, clearFormField } from './util.js';

const ERROR_BORDER_STYLE = '3px red solid';

const uploadForm = document.querySelector('#upload-select-image');
const uploadButtonNode = uploadForm.querySelector('#upload-file');
const uploadModalNode = uploadForm.querySelector('.img-upload__overlay');
const closeButtonNode = uploadModalNode.querySelector('#upload-cancel');
const mainNode = document.querySelector('main');

const reportError = (field, string, borderStyle) => {
  field.style.border = borderStyle;
  field.setCustomValidity(string);
  field.reportValidity();
}

const reportNoError = (field) => reportError(field, '', null);

const isUploadFieldInFocus = (evt) => {
  return (
    evt.target === hashtagsFieldNode ||
    evt.target === commentFieldNode
  );
}

const resetUploadValue = () => {
  uploadButtonNode.value = null;
}

const resetUploadSettings = () => {
  resetScale();
  resetPictureEffect();
  removeSlider();
  resetEffectRadioButtons();
  resetUploadValue();
  reportNoError(hashtagsFieldNode);
  reportNoError(commentFieldNode);
  clearFormField(hashtagsFieldNode);
  clearFormField(commentFieldNode);
}

const hideMessage = (messageNode) => {
  messageNode.remove();
}

const onMessageOkayButtonClick = (messageNode) => {
  return () => {
    hideMessage(messageNode);
  }
}

const onMessageClick = (messageNode) => {
  return () => {
    hideMessage(messageNode);
  }
}

const onMessageInnerClick = (evt) => {
  evt.stopPropagation();
}

const onMessageEscKeydown = (messageNode) => {
  return (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();

      hideMessage(messageNode);
    }
  }
}

const onSubmit = (status) => {
  return () => {
    closeModal(uploadModalNode, closeButtonNode, 'upload');

    const messageTemplateNode = document.querySelector(`#${status}`)
      .content
      .querySelector(`.${status}`);
    const messageNode = messageTemplateNode.cloneNode(true);
    const messageInnerNode = messageNode.querySelector(`.${status}__inner`);
    const messageOkayButtonNode = messageNode.querySelector(`.${status}__button`);

    messageOkayButtonNode.addEventListener('click', onMessageOkayButtonClick(messageNode));
    messageNode.addEventListener('click', onMessageClick(messageNode));
    messageInnerNode.addEventListener('click', onMessageInnerClick);
    document.addEventListener('keydown', onMessageEscKeydown(messageNode));

    mainNode.appendChild(messageNode);
  }
}

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();

  const uploadFormData = new FormData(uploadForm);

  sendPhotoData(
    onSubmit('success'),
    onSubmit('error'),
    uploadFormData,
  );
}

uploadButtonNode.addEventListener('input', () => {
  openModal(uploadModalNode, closeButtonNode, 'upload');
});

uploadForm.addEventListener('submit', onUploadFormSubmit);

export {
  resetUploadSettings,
  isUploadFieldInFocus,
  reportError,
  reportNoError,
  ERROR_BORDER_STYLE,
  uploadForm
}
