import {openModal} from './modal.js';
import {resetScale} from './scale.js';
import {removeSlider, resetPictureEffect} from './effects.js';

const uploadButtonNode = document.querySelector('#upload-file');
const uploadModalNode = document.querySelector('.img-upload__overlay');
const closeButtonNode = uploadModalNode.querySelector('#upload-cancel');

const resetUploadValue = () => {
  uploadButtonNode.value = null;
}

const resetPictureSettings = () => {
  resetScale();
  resetPictureEffect();
  removeSlider();
  resetUploadValue();
}

uploadButtonNode.addEventListener('input', () => {
  openModal(uploadModalNode, closeButtonNode, 'upload');
});

export {
  resetPictureSettings
}
