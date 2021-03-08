// Проверка диапазона на невхождение целого числа

const checkRangeForMissingInteger = (from, to) => Math.trunc(from) === Math.trunc(to) && !Number.isInteger(from) && !Number.isInteger(to);

// Получить рандомное натуральное число (включая 0) из диапазона
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values_inclusive

const getRandomInteger = (min, max) => {
  if (min < 0 || max < 0) {
    throw new RangeError('В диапазон не должны входить отрицательные числа.');
  }

  if (checkRangeForMissingInteger(min, max)) {
    throw new RangeError('В диапазон должно входить хотя бы одно целое число.');
  }

  if (min > max) {
    [min, max] = [max, min];
  }

  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Получить рандомный элемент из массива

const getRandomItem = (array) => array[getRandomInteger(0, array.length - 1)];

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

const isStringEmpty = (string) => string.search(/[\S]+/) === -1;

export {
  getRandomInteger,
  getRandomItem,
  isStringFit,
  isEscEvent,
  convertDecimalToPercent,
  isStringEmpty
};
