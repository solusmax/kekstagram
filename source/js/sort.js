/* global _:readonly */

import { updatePictures } from './gallery.js';

const SIZE_OF_RANDOM_GALLERY = 10;

const sortButtonsNode = document.querySelector('.img-filters');
const sortButtonActiveClassName = 'img-filters__button--active';

const showSortButtons = () => {
  sortButtonsNode.classList.remove('img-filters--inactive');
}

const sortGalleryByDefault = (pictures) => {
  updatePictures(pictures);
}

const sortGalleryRadnomly = (pictures) => {
  const sortedPictures = _.shuffle(pictures.slice())
    .slice(0, SIZE_OF_RANDOM_GALLERY);

  updatePictures(sortedPictures);
}

const getPictureCommentsCount = (picture) => picture.comments.length;

const comparePicturesByComments = (pictureA, pictureB) => {
  const commentsCountA = getPictureCommentsCount(pictureA);
  const commentsCountB = getPictureCommentsCount(pictureB);

  return commentsCountB - commentsCountA;
}

const sortGalleryByComments = (pictures) => {
  const sortedPictures = pictures
    .slice()
    .sort(comparePicturesByComments);

  updatePictures(sortedPictures);
}

const sortOrders = {
  'default': sortGalleryByDefault,
  'random': sortGalleryRadnomly,
  'discussed': sortGalleryByComments,
}

let currentSortOrder = Object.keys(sortOrders)[0];

const sortGallery = (sortOrder, pictures) => sortOrders[sortOrder](pictures);

const getSortButtonSelector = (sortOrder) => `#filter-${sortOrder}`;

const setSortButtonActiveClass = (activeSortButtonNode, sortOrder) => {
  const previousSortButtonNode = document.querySelector(getSortButtonSelector(currentSortOrder));
  previousSortButtonNode.classList.remove(sortButtonActiveClassName);

  currentSortOrder = sortOrder;

  activeSortButtonNode.classList.add(sortButtonActiveClassName);
}

const setSortButtonsListeners = (cb) => {
  for (const sortOrder of Object.keys(sortOrders)) {
    const sortButtonNode = document.querySelector(getSortButtonSelector(sortOrder));

    sortButtonNode.addEventListener('click', (evt) => {
      if (!sortButtonNode.classList.contains(sortButtonActiveClassName)) {
        evt.preventDefault();

        setSortButtonActiveClass(sortButtonNode, sortOrder);

        cb(sortOrder);
      }
    });
  }
}

export {
  showSortButtons,
  sortGallery,
  setSortButtonsListeners
}
