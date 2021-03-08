import { openModal } from './modal.js';
import { resetScale } from './scale.js';
import { removeSlider, resetPictureEffect } from './effects.js';
import { hashtagsFieldNode } from './hashtags-validation.js';
import { commentFieldNode } from './comment-validation.js';

const ERROR_BORDER_STYLE = '2px red solid';

const uploadButtonNode = document.querySelector('#upload-file');
const uploadModalNode = document.querySelector('.img-upload__overlay');
const closeButtonNode = uploadModalNode.querySelector('#upload-cancel');

const reportError = (field, string) => {
  field.setCustomValidity(string);
  field.style.border = ERROR_BORDER_STYLE;
}

const reportNoError = (field) => {
  field.setCustomValidity('');
  field.style = null;
}

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
  resetUploadValue();
  reportNoError(hashtagsFieldNode);
  reportNoError(commentFieldNode);
}

uploadButtonNode.addEventListener('input', () => {
  openModal(uploadModalNode, closeButtonNode, 'upload');
});

export {
  resetUploadSettings,
  isUploadFieldInFocus,
  reportError,
  reportNoError
}
