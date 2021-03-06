import {pictures as picturesData} from './gallery.js';
import {openModal} from './modal.js';

const pictures = document.querySelectorAll('.picture');

const bigPictureNode = document.querySelector('.big-picture');
const closeButtonNode = bigPictureNode.querySelector('.big-picture__cancel');
const imgNode = bigPictureNode.querySelector('.big-picture__img img');
const descriptionNode = bigPictureNode.querySelector('.social__caption');
const likesCounterNode = bigPictureNode.querySelector('.likes-count');
const commentsCounterNode = bigPictureNode.querySelector('.comments-count');
const commentsNode = bigPictureNode.querySelector('.social__comments');
const commentTemplateNode = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');

// Для временного скрытия
const socialCommentCountNode = bigPictureNode.querySelector('.social__comment-count');
const commentsLoaderNode = bigPictureNode.querySelector('.comments-loader');

const renderBigPicture = ({url, likes, comments, description}) => {
  imgNode.src = url;
  likesCounterNode.textContent = likes;
  commentsCounterNode.textContent = comments.length;
  descriptionNode.textContent = description;

  // Временное скрытие
  socialCommentCountNode.classList.add('hidden');
  commentsLoaderNode.classList.add('hidden');
}

const createComment = ({avatar, message, name}) => {
  const commentNode = commentTemplateNode.cloneNode(true);
  const commentAvatarNode = commentNode.querySelector('.social__picture');
  const commentMessageNode = commentNode.querySelector('.social__text');

  commentAvatarNode.src = avatar;
  commentAvatarNode.alt = name;
  commentMessageNode.textContent = message;

  return commentNode;
}

const clearComments = () => {
  while (commentsNode.firstChild) {
    commentsNode.firstChild.remove();
  }
}

const renderComments = (comments) => {
  clearComments();

  const commentsFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    commentsFragment.appendChild(createComment(comment));
  });

  commentsNode.appendChild(commentsFragment);
}

pictures.forEach((pictureNode, index) => {
  pictureNode.addEventListener('click', () => {
    openModal(bigPictureNode, closeButtonNode);
    renderBigPicture(picturesData[index]);
    renderComments(picturesData[index].comments);
  });
});
