const COMMENTS_IN_PIECE = 5;

const commentsNode = document.querySelector('.social__comments');
const commentTemplateNode = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');
const commentsLoaderButtonNode = document.querySelector('.comments-loader');
const shownCommentsCounterNode = document.querySelector('.shown-comments-count');

let shownComments = 0;

const createComment = ({ avatar, message, name }) => {
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

  shownComments = 0;
}

const onCommentsLoaderClick = (comments) => {
  return () => {
    renderPieceOfComments(comments);

    if (comments.length === 0) {
      hideCommentsLoader();
    }
  }
}

let onCommentsLoaderClickWrapper;

const showCommentsLoader = () => {
  commentsLoaderButtonNode.classList.remove('hidden');
  commentsLoaderButtonNode.addEventListener('click', onCommentsLoaderClickWrapper);
}

const hideCommentsLoader = () => {
  commentsLoaderButtonNode.classList.add('hidden');
  commentsLoaderButtonNode.removeEventListener('click', onCommentsLoaderClickWrapper);
}

const updateShownCommentsCounter = () => {
  shownCommentsCounterNode.textContent = shownComments;
}

const getCommentsNumberInNextPiece = (remainingComments) => Math.min(COMMENTS_IN_PIECE, remainingComments.length)

const renderPieceOfComments = (comments) => {
  const commentsNumberInPiece = getCommentsNumberInNextPiece(comments);

  const commentsFragment = document.createDocumentFragment();

  for (let i = 0; i < commentsNumberInPiece; i++) {
    commentsFragment.appendChild(createComment(comments.shift()));

    shownComments++;
  }

  commentsNode.appendChild(commentsFragment);

  updateShownCommentsCounter();
}

const renderComments = (comments) => {
  const currentComments = comments.slice();
  const commentsNumber = currentComments.length;

  if (commentsNumber === 0) {
    return;
  }

  renderPieceOfComments(currentComments);

  if (commentsNumber > COMMENTS_IN_PIECE) {
    onCommentsLoaderClickWrapper = onCommentsLoaderClick(currentComments);
    showCommentsLoader();
  }
}

export {
  renderComments,
  clearComments,
  hideCommentsLoader
}
