/* global _:readonly */

import './upload-picture.js';
import './scale.js';
import './effects.js';
import './hashtags-validation.js';
import './comment-validation.js';
import { getPhotosData } from './data.js';
import { renderPictures } from './gallery.js';
import { setPicturesListeners } from './big-picture.js';
import { showSortButtons, setSortButtonsListeners, sortGallery } from './sort.js';

const UPDATE_DELAY = 500;

getPhotosData((pictures) => {
  renderPictures(pictures);
  setPicturesListeners(pictures);

  showSortButtons();
  setSortButtonsListeners(
    _.debounce(
      (order) => sortGallery(order, pictures),
      UPDATE_DELAY),
  );
});
