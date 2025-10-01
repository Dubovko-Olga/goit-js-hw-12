import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const form = document.getElementById('search-form');
const searchInput = form.querySelector('input[name="searchQuery"]');
const loadMoreBtn = document.querySelector('.load-more');

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

form.addEventListener('submit', async event => {
  event.preventDefault();

  const query = searchInput.value.trim();
  if (!query) {
    iziToast.warning({
      title: 'Oops',
      message: 'Please enter a search query!',
      position: 'topRight',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;

  clearGallery();
  hideLoadMoreButton();
  showLoader('top');


  await new Promise(requestAnimationFrame);

  try {
   
    const [data] = await Promise.all([
      getImagesByQuery(currentQuery, currentPage),
      delay(700), 
    ]);

    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.info({
        title: 'Sorry',
        message:
          'There are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    } else {
      createGallery(data.hits);
      if (totalHits > currentPage * 15) {
        showLoadMoreButton();
      }
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader('top');
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;

  showLoader('bottom');
  hideLoadMoreButton();

  await new Promise(requestAnimationFrame);

  try {
    const [data] = await Promise.all([
      getImagesByQuery(currentQuery, currentPage),
      delay(700),
    ]);

    createGallery(data.hits);

    const totalPages = Math.ceil(totalHits / 15);
    if (currentPage < totalPages) {
      showLoadMoreButton();
    } else {
      iziToast.info({
        title: 'End',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }

    
    const firstCard = document.querySelector('.gallery li');
    if (firstCard) {
      const { height: cardHeight } = firstCard.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to load more images.',
      position: 'topRight',
    });
  } finally {
    hideLoader('bottom');
  }
});
