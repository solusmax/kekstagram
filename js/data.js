import {getRandomInteger, getRandomItem} from './util.js';

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
  MAX_COMMENTS_PER_ITEM: 8,
  MAX_COMMENT_ID: 10000,
  MIN_LIKES: 15,
  MAX_LIKES: 200,
}
const commentIds = [];

// Получить рандомный неповторяющийся ID комментария

const getRandomCommentId = () => {
  let id;

  do {
    id = getRandomInteger(1, PhotosMockData.MAX_COMMENT_ID);
  } while (commentIds.includes(id));

  commentIds.push(id);

  return id;
}

// Создать объект комментария

const createComment = () => {
  return {
    id: getRandomCommentId(),
    avatar: 'img/avatar-' + getRandomInteger(1, 6) + '.svg',
    message: getRandomItem(PhotosMockData.MESSAGES),
    name: getRandomItem(PhotosMockData.NAMES),
  }
}

// Сгенерировать комментарии к фотографии

const generateCommentsForPhoto = () => {
  const allComments = [];
  const commentsNumber = getRandomInteger(1, PhotosMockData.MAX_COMMENTS_PER_ITEM);

  for (let i = 0; i < commentsNumber; i++) {
    allComments.push(createComment());
  }

  return allComments;
}

// Создать объект фотографии

const createPhoto = (photoId) => {
  return {
    id: photoId,
    url: 'photos/' + photoId + '.jpg',
    description: 'Подпись к фотографии.',
    likes: getRandomInteger(PhotosMockData.MIN_LIKES, PhotosMockData.MAX_LIKES),
    comments: generateCommentsForPhoto(),
  }
}

// Сгенерировать массив с рандомными фотографиями

const generatePhotos = () => {
  const photos = [];

  for (let i = 1; i <= PhotosMockData.QUANTITY; i++) {
    photos.push(createPhoto(i));
  }

  return photos;
}

export {generatePhotos};
