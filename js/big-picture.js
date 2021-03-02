import {pictures as picturesData} from './gallery.js';
import {isEscEvent} from './util.js';

const pictures = document.querySelectorAll('.picture');

const bigPictureNode = document.querySelector('.big-picture');
const closeButtonNode = bigPictureNode.querySelector('#picture-cancel');
const imgNode = bigPictureNode.querySelector('.big-picture__img img');
const descriptionNode = bigPictureNode.querySelector('.social__caption');
const likesCounterNode = bigPictureNode.querySelector('.likes-count');
const commentsCounterNode = bigPictureNode.querySelector('.comments-count');
const commentsNode = bigPictureNode.querySelector('.social__comments');

// Для временного скрытия
const socialCommentCountNode = bigPictureNode.querySelector('.social__comment-count');
const commentsLoaderNode = bigPictureNode.querySelector('.comments-loader');

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

  closeButtonNode.addEventListener('click', onBigPictureCloseClick);
  document.addEventListener('keydown', onBigPictureEscKeydown);
}

const closeBigPicture = () => {
  bigPictureNode.classList.add('hidden');
  document.body.classList.remove('modal-open');

  closeButtonNode.removeEventListener('click', onBigPictureCloseClick);
  document.removeEventListener('keydown', onBigPictureEscKeydown);
}

const renderBigPicture = ({url, likes, comments, description}) => {
  imgNode.src = url;
  likesCounterNode.textContent = likes;
  commentsCounterNode.textContent = comments.length;
  descriptionNode.textContent = description;

  // Временное скрытие
  socialCommentCountNode.classList.add('hidden');
  commentsLoaderNode.classList.add('hidden');
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
  commentsNode.innerHTML = '';

  comments.forEach((comment) => {
    commentsNode.insertAdjacentHTML('beforeend', createCommentHtml(comment));
  });
}

pictures.forEach((pictureNode, index) => {
  pictureNode.addEventListener('click', () => {
    openBigPicture();
    renderBigPicture(picturesData[index]);
    renderComments(picturesData[index].comments);
  });
});
