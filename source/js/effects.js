/* global noUiSlider:readonly */

const Effects = {
  ORIGINAL: {
    FILTER: 'none',
  },
  CHROME: {
    FILTER: 'grayscale',
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
    DEFAULT_VALUE: 1,
  },
  SEPIA: {
    FILTER: 'sepia',
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
    DEFAULT_VALUE: 1,
  },
  MARVIN: {
    FILTER: 'invert',
    UNIT: '%',
    MIN: 0,
    MAX: 100,
    STEP: 1,
    DEFAULT_VALUE: 100,
  },
  PHOBOS: {
    FILTER: 'blur',
    UNIT: 'px',
    MIN: 0,
    MAX: 3,
    STEP: 0.1,
    DEFAULT_VALUE: 3,
  },
  HEAT: {
    FILTER: 'brightness',
    MIN: 1,
    MAX: 3,
    STEP: 0.1,
    DEFAULT_VALUE: 3,
  },
}

const uploadModalNode = document.querySelector('.img-upload__overlay');
const previewImgNode = uploadModalNode.querySelector('.img-upload__preview img');
const sliderWrapperNode = uploadModalNode.querySelector('.effect-level');
const sliderNode = sliderWrapperNode.querySelector('.effect-level__slider');
const effectRadioButtons = uploadModalNode.querySelectorAll('.effects__radio');
const effectLevelValueNode = uploadModalNode.querySelector('.effect-level__value');

let currentEffectClass;

const onEffectRadioChange = (effectName) => {
  return () => {
    resetPictureEffect();

    if (effectName === Effects.ORIGINAL.FILTER) {
      removeSlider();
    } else {
      renderEffect(effectName);
    }
  }
}

const onSliderUpdate = ({ filterName, unit }) => {
  return (values, handle) => {
    effectLevelValueNode.value = values[handle];
    previewImgNode.style.filter = `${filterName}(${effectLevelValueNode.value}${unit})`;
  }
}

const createSlider = ({ min, max, step, defaultValue }) => {
  noUiSlider.create(sliderNode, {
    range: {
      'min': [min],
      'max': [max],
    },
    step: step,
    start: [defaultValue],
    connect: 'lower',
  });

  sliderWrapperNode.classList.remove('hidden');
}

const updateSliderOptions = ({ min, max, step, defaultValue }) => {
  sliderNode.noUiSlider.updateOptions({
    range: {
      'min': [min],
      'max': [max],
    },
    step: step,
  });

  sliderNode.noUiSlider.set(defaultValue);
}

const removeSlider = () => {
  if (sliderNode.noUiSlider) {
    sliderNode.noUiSlider.destroy();
  }

  sliderWrapperNode.classList.add('hidden');
}

const resetPictureEffect = () => {
  if (previewImgNode.classList.contains(currentEffectClass)) {
    previewImgNode.classList.remove(currentEffectClass);
  }

  previewImgNode.style.filter = Effects.ORIGINAL.FILTER;
  effectLevelValueNode.value = null;
}

const resetEffectRadioButtons = () => {
  effectRadioButtons[0].checked = true;
}

const getEffectValues = (effectName) => {
  const effectValues = Effects[effectName.toUpperCase()];

  return {
    filterName: effectValues.FILTER,
    unit: effectValues.UNIT ? effectValues.UNIT : '',
    min: effectValues.MIN,
    max: effectValues.MAX,
    step: effectValues.STEP,
    defaultValue: effectValues.DEFAULT_VALUE,
  }
}

const getEffectClass = (effectName) => `effects__preview--${effectName}`;

const setEffectClass = (effectName) => {
  currentEffectClass = getEffectClass(effectName);

  previewImgNode.classList.add(currentEffectClass);
}

const setEffectLevelNodeAttributes = ({ min, max, step, defaultValue }) => {
  effectLevelValueNode.min = min;
  effectLevelValueNode.max = max;
  effectLevelValueNode.step = step;
  effectLevelValueNode.value = defaultValue;
}

const renderSlider = (effectValues) => {
  if (!sliderNode.noUiSlider) {
    createSlider(effectValues);
  } else {
    updateSliderOptions(effectValues);
    sliderNode.noUiSlider.off('update');
  }

  sliderNode.noUiSlider.on('update', onSliderUpdate(effectValues));
}

const renderEffect = (effectName) => {
  const effectValues = getEffectValues(effectName);

  setEffectClass(effectName);
  setEffectLevelNodeAttributes(effectValues);
  renderSlider(effectValues);
}

effectRadioButtons.forEach((effectRadioNode) => {
  effectRadioNode.addEventListener('change', onEffectRadioChange(effectRadioNode.value));
});

export {
  removeSlider,
  resetPictureEffect,
  resetEffectRadioButtons
}
