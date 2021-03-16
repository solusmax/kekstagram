/* global _:readonly */

import { updatePictures } from './gallery.js';

const sortButtonsNode = document.querySelector('.img-filters');
const sortButtonActiveClassName = 'img-filters__button--active';
const SIZE_OF_RANDOM_GALLERY = 10;
const sortOrders = [
  'default',
  'random',
  'discussed',
];

let currentSortOrder = sortOrders[0];

const showSortButtons = () => {
  sortButtonsNode.classList.remove('img-filters--inactive');
}

const sortGalleryByDefault = (pictures) => {
  updatePictures(pictures);
}

const sortGalleryRadnomly = (pictures) => {
  const sortedPicures = _.shuffle(pictures.slice())
    .slice(0, SIZE_OF_RANDOM_GALLERY);

  updatePictures(sortedPicures);
}

const getPictureCommentsCount = (picture) => picture.comments.length;

const comparePicturesByComments = (pictureA, pictureB) => {
  const commentsCountA = getPictureCommentsCount(pictureA);
  const commentsCountB = getPictureCommentsCount(pictureB);

  return commentsCountB - commentsCountA;
}

const sortGalleryByComments = (pictures) => {
  const sortedPicures = pictures
    .slice()
    .sort(comparePicturesByComments);

  updatePictures(sortedPicures);
}

const sortGallery = (sortOrder, pictures) => {
  switch (sortOrder) {
    case 'default':
      sortGalleryByDefault(pictures);
      break;
    case 'random':
      sortGalleryRadnomly(pictures);
      break;
    case 'discussed':
      sortGalleryByComments(pictures);
      break;
  }
}

const getSortButtonSelector = (sortOrder) => `#filter-${sortOrder}`;

const setSortButtonActiveClass = (activeSortButtonNode, sortOrder) => {
  const previousSortButtonNode = document.querySelector(getSortButtonSelector(currentSortOrder));
  previousSortButtonNode.classList.remove(sortButtonActiveClassName);

  currentSortOrder = sortOrder;

  activeSortButtonNode.classList.add(sortButtonActiveClassName);
}

const setSortButtonsListeners = (cb) => {
  sortOrders.forEach((sortOrder) => {
    const sortButtonNode = document.querySelector(getSortButtonSelector(sortOrder));

    sortButtonNode.addEventListener('click', (evt) => {
      if (!sortButtonNode.classList.contains(sortButtonActiveClassName)) {
        evt.preventDefault();

        setSortButtonActiveClass(sortButtonNode, sortOrder);

        cb(sortOrder);
      }
    });
  });
}

export {
  showSortButtons,
  sortGallery,
  setSortButtonsListeners
}
