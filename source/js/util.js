const errorMessageTemplateNode = document.querySelector('#error-alert')
  .content
  .querySelector('.error-alert');

// Проверка, не превышает ли строка максимальное количество символов

const isStringFit = (string, maxLength) => {
  if (maxLength < 0) {
    throw new RangeError('Число не должно быть отрицательным.');
  }

  return string.length <= maxLength;
}

// Проверка нажатия клавиши Esc

const isEscEvent = (evt) => evt.key === 'Escape';

// Перевести десятичную дробь в строку с процентами

const convertDecimalToPercent = (numberValue) => (numberValue * 100) + '%';

// Проверка, содержит ли строка исключительно whitespace

const isStringEmpty = (string) => string.trim() === '';

// Показать сообщение об ошибке

const showErrorMessage = (message, timer) => {
  const errorMessageNode = errorMessageTemplateNode.cloneNode(true);

  errorMessageNode.querySelector('.error-alert__title').textContent = message;

  document.body.appendChild(errorMessageNode);

  if (timer) {
    setTimeout(() => {
      errorMessageNode.remove();
    }, timer)
  }
}

// Очистить поле формы

const clearFormField = (field) => {
  field.value = '';
}

export {
  isStringFit,
  isEscEvent,
  convertDecimalToPercent,
  isStringEmpty,
  showErrorMessage,
  clearFormField
};
