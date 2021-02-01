'use strict';

// Получить рандомное натуральное число (включая 0) из диапазона
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values_inclusive

const getRandomInteger = (min, max) => {
  if (min < 0 || max < 0 || (Math.trunc(min) === Math.trunc(max) && !Number.isInteger(min) && !Number.isInteger(max))) {
    // Последняя часть условия — проверка,
    // не создают ли параметры диапазон вроде (1.5, 1.6)
    return;
  }

  if (min === max && Number.isInteger(min)) {
    return min;
  }

  if (min > max) {
    [min, max] = [max, min];
  }

  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Проверка, не превышает ли строка максимальное количество символов

const isStringFit = (string, maxLength) => {
  if (maxLength < 0) {
    return;
  }

  return string.length <= maxLength;
}

// Для ESLint (временно)

getRandomInteger(16, 23);
isStringFit('Строка', 42);
