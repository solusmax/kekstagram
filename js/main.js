'use strict';

// Временные данные для фотографий

const PhotosMockData = {
  QUANTITY: 25,
  NAMES: [
    'Бен',
    'Десмонд',
    'Джеймс',
    'Джек',
    'Джин',
    'Джон',
    'Дэниел',
    'Кейт',
    'Майкл',
    'Ричард',
    'Саид',
    'Чарли',
    'Шеннон',
  ],
  MESSAGES: [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  ],
  commentIds: [],
  MAX_COMMENTS_PER_ITEM: 8,
  MAX_COMMENT_ID: 10000,
}

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

// Проверка, не превышает ли строка максимальное количество символов

const isStringFit = (string, maxLength) => {
  if (maxLength < 0) {
    throw new RangeError('Число не должно быть отрицательным.');
  }

  return string.length <= maxLength;
}

// Получить рандомный элемент из массива

const getRandomItem = (array) => array[getRandomInteger(0, array.length - 1)];

// Получить рандомный неповторяющийся ID комментария

const getRandomCommentId = (data) => {
  let id;

  do {
    id = getRandomInteger(1, data.MAX_COMMENT_ID);
  } while (data.commentIds.includes(id));

  data.commentIds.push(id);

  return id;
}

// Создать объект комментария

const createComment = (data) => {
  return {
    id: getRandomCommentId(data),
    avatar: 'img/avatar-' + getRandomInteger(1, 6) + '.svg',
    message: getRandomItem(data.MESSAGES),
    name: getRandomItem(data.NAMES),
  }
}

// Сгенерировать комментарии к фотографии

const generateCommentsForPhoto = (data) => {
  const allComments = [];
  const commentsNumber = getRandomInteger(1, data.MAX_COMMENTS_PER_ITEM);

  for (let i = 0; i < commentsNumber; i++) {
    allComments.push(createComment(data));
  }

  return allComments;
}

// Создать объект фотографии

const createPhoto = (data, photoId) => {
  return {
    id: photoId,
    url: 'photos/' + photoId + '.jpg',
    description: 'Подпись к фотографии.',
    likes: getRandomInteger(15, 200),
    comments: generateCommentsForPhoto(data),
  }
}

// Сгенерировать массив с рандомными фотографиями

const generatePhotos = (data) => {
  const photos = [];

  for (let i = 1; i <= data.QUANTITY; i++) {
    photos.push(createPhoto(data, i));
  }

  return photos;
}

// Для ESLint (временно)

getRandomInteger(16, 23);
isStringFit('Строка', 42);
generatePhotos(PhotosMockData);
