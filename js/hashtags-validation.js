import { isStringFit, isStringEmpty } from './util.js';
import { reportError, reportNoError, ERROR_BORDER_STYLE } from './upload-picture.js';

const HashtagsSettings = {
  MAX_NUMBER: 5,
  MAX_LENGTH: 20,
}

const uploadFormNode = document.querySelector('.img-upload__form');
const hashtagsFieldNode = uploadFormNode.querySelector('.text__hashtags');

const onHashtagsFieldChange = () => {
  const hashtagsString = hashtagsFieldNode.value;

  if (isStringEmpty(hashtagsString)) {
    if (hashtagsFieldNode.validity.customError) {
      reportNoError(hashtagsFieldNode);
    }
    return;
  }

  const hashtags = getHashtags(hashtagsString);

  for (const [validationFunction, errorMessage] of errorCheckers.entries()) {
    if (!validationFunction(hashtags)) {
      reportError(hashtagsFieldNode, errorMessage, ERROR_BORDER_STYLE);
      return;
    } else {
      reportNoError(hashtagsFieldNode);
    }
  }
}

const getHashtags = (string) => string.trim().split(/[\s]+/);

const getHashtagText = (hashtag) => hashtag.slice(1);

const isItHashtag = (string) => string[0] === '#';

const areTheseHashtags = (hashtags) => {
  for (const hashtag of hashtags) {
    if (!isItHashtag(hashtag)) {
      return false;
    }
  }

  return true;
}

const isHashtagLongEnough = (hashtag) => hashtag.length > 1;

const areHashtagsLongEnough = (hashtags) => {
  for (const hashtag of hashtags) {
    if (!isHashtagLongEnough(hashtag)) {
      return false;
    }
  }

  return true;
}

const isHashtagFit = (hashtag) => isStringFit(hashtag, HashtagsSettings.MAX_LENGTH);

const areHashtagsFit = (hashtags) => {
  for (const hashtag of hashtags) {
    if (!isHashtagFit(hashtag)) {
      return false;
    }
  }

  return true;
}

const isHashtagTextValid = (hashtagText) => hashtagText.search(/[\p{P}\p{S}]/u) === -1;

const areHashtagsTextsValid = (hashtags) => {
  for (const hashtag of hashtags) {
    const hashtagText = getHashtagText(hashtag);

    if (!isHashtagTextValid(hashtagText)) {
      return false;
    }
  }

  return true;
}

const isHashtagsNumberNotExceed = (hashtags) => hashtags.length <= HashtagsSettings.MAX_NUMBER;

const areHashtagsUnique = (hashtags) => {
  const previousHashtags = [];

  for (const hashtag of hashtags) {
    const hashtagLowercased = hashtag.toLowerCase();

    if (previousHashtags.includes(hashtagLowercased)) {
      return false;
    }

    previousHashtags.push(hashtagLowercased);
  }

  return true;
}

const errorCheckers = new Map([
  [areTheseHashtags, 'Хештег должен начинаться с #'],
  [areHashtagsLongEnough, 'Добавьте текст хештега после символа #'],
  [areHashtagsFit, `В хештеге количество символов (включая #) не должно быть больше ${HashtagsSettings.MAX_LENGTH}`],
  [areHashtagsTextsValid, 'Хештег может содержать только буквы и цифры'],
  [areHashtagsUnique, 'Хештеги не должны повторяться'],
  [isHashtagsNumberNotExceed, `Хештегов не должно быть больше ${HashtagsSettings.MAX_NUMBER}`],
]);

hashtagsFieldNode.addEventListener('change', onHashtagsFieldChange);

export {
  hashtagsFieldNode
}
