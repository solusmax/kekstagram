const Effects = {
  DEFAULT: {
    FILTER: 'none',
  },
  CHROME: {
    FILTER: 'grayscale',
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
    DEFAULT: 1,
  },
  SEPIA: {
    FILTER: 'sepia',
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
    DEFAULT: 1,
  },
  MARVIN: {
    FILTER: 'invert',
    UNIT: '%',
    MIN: 0,
    MAX: 100,
    STEP: 1,
    DEFAULT: 100,
  },
  PHOBOS: {
    FILTER: 'blur',
    UNIT: 'px',
    MIN: 0,
    MAX: 3,
    STEP: 0.1,
    DEFAULT: 3,
  },
  HEAT: {
    FILTER: 'brightness',
    MIN: 1,
    MAX: 3,
    STEP: 0.1,
    DEFAULT: 3,
  },
}

const uploadModalNode = document.querySelector('.img-upload__overlay');
const previewImgNode = uploadModalNode.querySelector('.img-upload__preview img')
const sliderWrapperNode = uploadModalNode.querySelector('.effect-level');
const sliderNode = sliderWrapperNode.querySelector('.effect-level__slider');
const effectRadioButtons = uploadModalNode.querySelectorAll('.effects__radio');
const effectLevelValueNode = uploadModalNode.querySelector('.effect-level__value');

let currentEffectClass;

const onSliderUpdate = (filterName, unit) => {
  return (values, handle) => {
    effectLevelValueNode.value = values[handle];
    previewImgNode.style.filter = `${filterName}(${effectLevelValueNode.value}${unit})`;
  }
}

const createSlider = (min, max, step, defaultValue) => {
  // eslint-disable-next-line
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

const updateSliderOptions = (min, max, step, defaultValue) => {
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

  previewImgNode.style.filter = Effects.DEFAULT.FILTER;
  effectLevelValueNode.value = null;
}

const renderEffect = (effectRadioNode) => {
  const effectName = effectRadioNode.value.toUpperCase();

  const filterName = Effects[effectName].FILTER;
  const unit = Effects[effectName].UNIT ? Effects[effectName].UNIT : '';
  const minValue = Effects[effectName].MIN;
  const maxValue = Effects[effectName].MAX;
  const stepValue = Effects[effectName].STEP;
  const defaultVaule = Effects[effectName].DEFAULT;

  currentEffectClass = `effects__preview--${effectRadioNode.value}`;

  previewImgNode.classList.add(currentEffectClass);

  effectLevelValueNode.value = defaultVaule;
  effectLevelValueNode.min = minValue;
  effectLevelValueNode.max = maxValue;
  effectLevelValueNode.step = stepValue;

  if (!sliderNode.noUiSlider) {
    createSlider(minValue, maxValue, stepValue, defaultVaule);
  } else {
    updateSliderOptions(minValue, maxValue, stepValue, defaultVaule);
    sliderNode.noUiSlider.off('update');
  }

  sliderNode.noUiSlider.on('update', onSliderUpdate(filterName, unit));
}

effectRadioButtons.forEach((effectRadioNode) => {
  effectRadioNode.addEventListener('change', () => {
    resetPictureEffect();

    if (effectRadioNode.value === Effects.DEFAULT.FILTER) {
      removeSlider();
    } else {
      renderEffect(effectRadioNode);
    }
  });
});

export {
  removeSlider,
  resetPictureEffect
}
