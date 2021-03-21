import { isStringFit } from './util.js';
import { reportValidationError, reportNoValidationError, ERROR_BORDER_STYLE } from './upload-picture.js';

const MAX_DESCRIPTION_LENGTH = 140;
const TOO_LONG_ERROR_MESSAGE = `Максимальная количество символов в комментарии — ${MAX_DESCRIPTION_LENGTH}`;

const uploadFormNode = document.querySelector('.img-upload__form');
const descriptionFieldNode = uploadFormNode.querySelector('.text__description');

descriptionFieldNode.maxLength = MAX_DESCRIPTION_LENGTH;

const onDescriptionFieldInput = () => {
  const description = descriptionFieldNode.value;

  if (!isDescriptionFit(description)) {
    reportValidationError(descriptionFieldNode, TOO_LONG_ERROR_MESSAGE, ERROR_BORDER_STYLE);
  } else {
    reportNoValidationError(descriptionFieldNode);
  }
}

const isDescriptionFit = (description) => isStringFit(description, MAX_DESCRIPTION_LENGTH);

descriptionFieldNode.addEventListener('input', onDescriptionFieldInput);

export {
  descriptionFieldNode
}
