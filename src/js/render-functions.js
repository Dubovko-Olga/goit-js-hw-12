import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');
const topLoader = document.getElementById('top-loader');
const bottomLoader = document.getElementById('bottom-loader');
const loadMoreBtn = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      image => `
      <li class="gallery-item">
        <a href="${image.largeImageURL}">
          <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
        </a>
        <div class="photo-card">
          <div class="info">
            <p><b>Likes:</b> ${image.likes}</p>
            <p><b>Views:</b> ${image.views}</p>
            <p><b>Comments:</b> ${image.comments}</p>
            <p><b>Downloads:</b> ${image.downloads}</p>
          </div>
        </div>
      </li>
    `
    )
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryEl.innerHTML = '';
}

export function showLoader(position = 'top') {
  if (position === 'top') {
    if (topLoader) {
     
      topLoader.classList.remove('is-hidden');
      topLoader.classList.add('is-visible');
    }
  } else {
    if (bottomLoader) {
      
      bottomLoader.classList.remove('is-hidden');
      bottomLoader.classList.add('is-visible');
      loadMoreBtn.classList.add('is-hidden'); 
    }
  }
}

export function hideLoader(position = 'top') {
  if (position === 'top') {
    if (topLoader) {
      
      topLoader.classList.add('is-hidden');
      topLoader.classList.remove('is-visible');
    }
  } else {
    if (bottomLoader) {
     
      bottomLoader.classList.add('is-hidden');
      bottomLoader.classList.remove('is-visible');
      loadMoreBtn.classList.remove('is-hidden'); 
    }
  }
}

export function showLoadMoreButton() {
  if (loadMoreBtn) {
    
    loadMoreBtn.classList.remove('is-hidden');
  }
}

export function hideLoadMoreButton() {
  if (loadMoreBtn) {
    
    loadMoreBtn.classList.add('is-hidden');
  }
}
