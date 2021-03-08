import { isStringFit } from './util.js';
import { reportError, reportNoError } from './upload-picture.js';

const MAX_COMMENT_LENGTH = 140;

const uploadFormNode = document.querySelector('.img-upload__form');
const commentFieldNode = uploadFormNode.querySelector('.text__description');

const errorMessageTooLong = `Длина комментария не должна превышать ${MAX_COMMENT_LENGTH} символов`;

commentFieldNode.maxLength = MAX_COMMENT_LENGTH;

const onCommentFieldInput = () => {
  const comment = commentFieldNode.value;

  if (!isCommentFit(comment)) {
    reportError(commentFieldNode, errorMessageTooLong);
  } else {
    reportNoError(commentFieldNode);
  }

  commentFieldNode.reportValidity();
}

const isCommentFit = (comment) => isStringFit(comment, MAX_COMMENT_LENGTH);

commentFieldNode.addEventListener('input', onCommentFieldInput);

export {
  commentFieldNode
}
