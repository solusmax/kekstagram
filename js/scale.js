import {convertDecimalToPercent} from './util.js';

const ScaleSettings = {
  MIN: 0.25,
  MAX: 1,
  STEP: 0.25,
  DEFAULT: 1,
}

const previewImgNode = document.querySelector('.img-upload__preview img')
const scaleMinusNode = document.querySelector('.scale__control--smaller');
const scalePlusNode = document.querySelector('.scale__control--bigger');
const scaleValueNode = document.querySelector('.scale__control--value');

let currentScaleValue = ScaleSettings.DEFAULT;

const renderScale = (scaleValue) => {
  scaleValueNode.value = convertDecimalToPercent(scaleValue);
  previewImgNode.style.transform = `scale(${scaleValue})`;
};

scaleMinusNode.addEventListener('click', () => {
  if (!(currentScaleValue <= ScaleSettings.MIN)) {
    currentScaleValue -= ScaleSettings.STEP;
    renderScale(currentScaleValue);
  }
});

scalePlusNode.addEventListener('click', () => {
  if (!(currentScaleValue >= ScaleSettings.MAX)) {
    currentScaleValue += ScaleSettings.STEP;
    renderScale(currentScaleValue);
  }
});

const resetScale = () => {
  currentScaleValue = ScaleSettings.DEFAULT;
  renderScale(currentScaleValue);
}

export {
  resetScale
}
