import { isStringFit, isStringEmpty } from './util.js';
import { reportError, reportNoError } from './upload-picture.js';

const HashtagsSettings = {
  MAX_NUMBER: 5,
  MAX_LENGTH: 20,
}

const errorMessages = {
  notHashtag: 'Хештег должен начинаться с #',
  tooShort: 'Добавьте текст хештега после символа #',
  tooLong: `Максимальное количество символов в хештеге (включая #): ${HashtagsSettings.MAX_LENGTH}`,
  textIsNotValid: 'Хештег может содержать только буквы и цифры',
  tooManyHashtags: `Хештегов не должно быть больше ${HashtagsSettings.MAX_NUMBER}`,
  notUnique: 'Хештеги не должны повторяться',
}

const uploadFormNode = document.querySelector('.img-upload__form');
const hashtagsFieldNode = uploadFormNode.querySelector('.text__hashtags');

const onHashtagsFieldInput = () => {
  const hashtagsString = hashtagsFieldNode.value;

  if (!isStringEmpty(hashtagsString)) {
    const hashtags = getHashtags(hashtagsString);

    if (!areTheseHashtags(hashtags)) {
      reportError(hashtagsFieldNode, errorMessages.notHashtag);
    } else if (!areHashtagsLongEnough(hashtags)) {
      reportError(hashtagsFieldNode, errorMessages.tooShort);
    } else if (!areHashtagsTextsValid(hashtags)) {
      reportError(hashtagsFieldNode, errorMessages.textIsNotValid);
    } else if (!areHashtagsFit(hashtags)) {
      reportError(hashtagsFieldNode, errorMessages.tooLong);
    } else if (!isHashtagsNumberNotExceed(hashtags)) {
      reportError(hashtagsFieldNode, errorMessages.tooManyHashtags)
    } else if (!areHashtagsUnique(hashtags)){
      reportError(hashtagsFieldNode, errorMessages.notUnique)
    } else {
      reportNoError(hashtagsFieldNode);
    }
  } else if (hashtagsFieldNode.validity.customError) {
    reportNoError(hashtagsFieldNode);
  }

  hashtagsFieldNode.reportValidity();
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
  for (let i = 0; i < hashtags.length - 1; i++) {
    for (let j = i + 1; j < hashtags.length; j++) {
      if (hashtags[i].toLowerCase() === hashtags[j].toLowerCase()) {
        return false;
      }
    }
  }

  return true;
}

hashtagsFieldNode.addEventListener('input', onHashtagsFieldInput);

export {
  hashtagsFieldNode
}
