const picturesNode = document.querySelector('.pictures');
const pictureTemplateNode = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const renderPictures = (pictures) => {
  const picturesFragment = document.createDocumentFragment();

  pictures.forEach(({ url, likes, comments }) => {
    const pictureNode = pictureTemplateNode.cloneNode(true);

    pictureNode.querySelector('.picture__img').src = url;
    pictureNode.querySelector('.picture__likes').textContent = likes;
    pictureNode.querySelector('.picture__comments').textContent = comments.length;

    picturesFragment.appendChild(pictureNode);
  });

  picturesNode.appendChild(picturesFragment);
}

export {
  renderPictures
}
