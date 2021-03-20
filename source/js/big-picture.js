import { openModal } from './modal.js';
import { renderComments, clearComments, hideCommentsLoader } from './comments.js';

const bigPictureNode = document.querySelector('.big-picture');
const closeButtonNode = bigPictureNode.querySelector('#picture-cancel');
const imgNode = bigPictureNode.querySelector('.big-picture__img img');
const descriptionNode = bigPictureNode.querySelector('.social__caption');
const likesCounterNode = bigPictureNode.querySelector('.likes-count');
const commentsCounterNode = bigPictureNode.querySelector('.comments-count');

const renderBigPicture = ({ url, likes, comments, description }) => {
  imgNode.src = url;
  likesCounterNode.textContent = likes;
  commentsCounterNode.textContent = comments.length;
  descriptionNode.textContent = description;
}

const setPicturesListeners = (picturesData) => {
  const pictures = document.querySelectorAll('.picture');

  pictures.forEach((pictureNode, index) => {
    pictureNode.addEventListener('click', () => {
      openModal(bigPictureNode, closeButtonNode);
      renderBigPicture(picturesData[index]);
      hideCommentsLoader();
      clearComments();
      renderComments(picturesData[index].comments);
    });
  });
}

export {
  setPicturesListeners
}
