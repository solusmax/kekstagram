import { isStringFit } from './util.js';
import { reportError, reportNoError, ERROR_BORDER_STYLE } from './upload-picture.js';

const MAX_COMMENT_LENGTH = 140;

const uploadFormNode = document.querySelector('.img-upload__form');
const commentFieldNode = uploadFormNode.querySelector('.text__description');

const errorMessageTooLong = `Длина комментария не должна превышать ${MAX_COMMENT_LENGTH} символов`;

commentFieldNode.maxLength = MAX_COMMENT_LENGTH;

const onCommentFieldInput = () => {
  const comment = commentFieldNode.value;

  if (!isCommentFit(comment)) {
    reportError(commentFieldNode, errorMessageTooLong, ERROR_BORDER_STYLE);
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
