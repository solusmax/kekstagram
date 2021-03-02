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
  DESCRIPTIONS: [
    'В точке Большого взрыва и в других сингулярностях нарушаются все законы, а поэтому за Богом сохраняется полная свобода в выборе того, что происходило в сингулярностях и каким было начало Вселенной.',
    'Я рассматриваю мозг как компьютер, который прекращает работать, когда его детали приходят в негодность. Нет рая или жизни после смерти для сломанного компьютера; это волшебная сказка для людей, боящихся темноты.',
    'Если вы не сдаётесь, это имеет значение.',
    'Если вы попали в чёрную дыру, не сдавайтесь. Выход есть.',
    'Все мы разные, но мы разделяем один и тот же человеческий дух. Возможно, это в человеческой природе, что мы адаптируемся и выживаем.',
    'Как выражаются у нас в научных кругах, англичане не попали бы даже банджо по заду коровы.',
  ],
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
    description: getRandomItem(PhotosMockData.DESCRIPTIONS),
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
