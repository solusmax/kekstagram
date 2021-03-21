import { isStringFit, isStringEmpty } from './util.js';
import { reportValidationError, reportNoValidationError, ERROR_BORDER_STYLE } from './upload-picture.js';

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
      reportNoValidationError(hashtagsFieldNode);
    }

    return;
  }

  const hashtags = getHashtags(hashtagsString);

  for (const [validationFunction, errorMessage] of errorCheckers.entries()) {
    if (!validationFunction(hashtags)) {
      reportValidationError(hashtagsFieldNode, errorMessage, ERROR_BORDER_STYLE);
      return;
    }

    reportNoValidationError(hashtagsFieldNode);
  }
}

const getHashtags = (string) => string.trim().split(/[\s]+/);

const getHashtagText = (hashtag) => hashtag.slice(1);

const checkAllHashtags = (validationFunction, hashtags) => {
  for (const item of hashtags) {
    if (!validationFunction(item)) {
      return false;
    }
  }

  return true;
}

const isItHashtag = (string) => string[0] === '#';
const areTheseHashtags = (hashtags) => checkAllHashtags(isItHashtag, hashtags);

const isHashtagLongEnough = (hashtag) => hashtag.length > 1;
const areHashtagsLongEnough = (hashtags) => checkAllHashtags(isHashtagLongEnough, hashtags);

const isHashtagFit = (hashtag) => isStringFit(hashtag, HashtagsSettings.MAX_LENGTH);
const areHashtagsFit = (hashtags) => checkAllHashtags(isHashtagFit, hashtags);

const isHashtagTextValid = (hashtag) => getHashtagText(hashtag).search(/[\p{P}\p{S}]/u) === -1;
const areHashtagsTextsValid = (hashtags) => checkAllHashtags(isHashtagTextValid, hashtags);

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
  [areHashtagsTextsValid, 'Хештег может содержать только буквы и цифры'],
  [areHashtagsFit, `В хештеге количество символов (включая #) не должно быть больше ${HashtagsSettings.MAX_LENGTH}`],
  [areHashtagsUnique, 'Хештеги не должны повторяться'],
  [isHashtagsNumberNotExceed, `Хештегов не должно быть больше ${HashtagsSettings.MAX_NUMBER}`],
]);

hashtagsFieldNode.addEventListener('change', onHashtagsFieldChange);

export {
  hashtagsFieldNode
}
