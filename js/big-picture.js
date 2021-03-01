import {pictures as picturesData} from './gallery.js';
import {isEscEvent} from './util.js';

const pictures = document.querySelectorAll('.picture');

const bigPictureNode = document.querySelector('.big-picture');
const bigPictureCloseNode = bigPictureNode.querySelector('#picture-cancel');
const bigPictureImgNode = bigPictureNode.querySelector('.big-picture__img img');
const bigPictureDescriptionNode = bigPictureNode.querySelector('.social__caption');
const bigPictureLikesCounterNode = bigPictureNode.querySelector('.likes-count');
const bigPictureCommentsCounterNode = bigPictureNode.querySelector('.comments-count');
const bigPictureCommentsNode = bigPictureNode.querySelector('.social__comments');

// Для временного скрытия
const bigPictureSocialCommentCountNode = bigPictureNode.querySelector('.social__comment-count');
const bigPictureCommentsLoaderNode = bigPictureNode.querySelector('.comments-loader');

const onBigPictureCloseClick = () => {
  closeBigPicture();
}

const onBigPictureEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();

    closeBigPicture();
  }
}

const openBigPicture = () => {
  bigPictureNode.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureCloseNode.addEventListener('click', onBigPictureCloseClick);
  document.addEventListener('keydown', onBigPictureEscKeydown);
}

const closeBigPicture = () => {
  bigPictureNode.classList.add('hidden');
  document.body.classList.remove('modal-open');

  bigPictureCloseNode.removeEventListener('click', onBigPictureCloseClick);
  document.removeEventListener('keydown', onBigPictureEscKeydown);
}

const renderBigPicture = ({url, likes, comments, description}) => {
  bigPictureImgNode.src = url;
  bigPictureLikesCounterNode.textContent = likes;
  bigPictureCommentsCounterNode.textContent = comments.length;
  bigPictureDescriptionNode.textContent = description;

  // Временное скрытие
  bigPictureSocialCommentCountNode.classList.add('hidden');
  bigPictureCommentsLoaderNode.classList.add('hidden');
}

const createCommentHtml = ({avatar, message, name}) => {
  return `
    <li class="social__comment">
      <img
        class="social__picture"
        src="${avatar}"
        alt="${name}"
        width="35"
        height="35">
      <p class="social__text">${message}</p>
    </li>
  `;
}

const renderComments = (comments) => {
  bigPictureCommentsNode.innerHTML = '';

  comments.forEach((comment) => {
    bigPictureCommentsNode.insertAdjacentHTML('beforeend', createCommentHtml(comment));
  });
}

pictures.forEach((pictureNode, index) => {
  pictureNode.addEventListener('click', () => {
    openBigPicture();
    renderBigPicture(picturesData[index]);
    renderComments(picturesData[index].comments);
  });
});
