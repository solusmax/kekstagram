const DEFAULT_IMAGE_URL = 'img/upload-default-image.jpg';

const previewImgNode = document.querySelector('.img-upload__preview img');
const pictureLoaderTemplateNode = document.querySelector('#messages')
  .content
  .querySelector('.img-upload__message');

const renderPicturePreview = (pictureUrl) => {
  previewImgNode.src = pictureUrl;
}

const resetPicturePreview = () => {
  renderPicturePreview(DEFAULT_IMAGE_URL);
}

const showPictureLoader = () => {
  const pictureLoaderNode = pictureLoaderTemplateNode.cloneNode(true);
  document.body.appendChild(pictureLoaderNode);
}

const hidePictureLoader = () => {
  const pictureLoaderNode = document.querySelector('.img-upload__message');
  pictureLoaderNode.remove();
}

const loadChosenPicture = (picture) => {
  return new Promise ((resolve) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      renderPicturePreview(reader.result);
      resolve();
    });

    reader.readAsDataURL(picture);
  })
}

export {
  resetPicturePreview,
  showPictureLoader,
  hidePictureLoader,
  loadChosenPicture
}
