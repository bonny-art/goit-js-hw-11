import { el } from './refs';
import { getPhotos, PER_PAGE } from './api';
import { createMarkup } from './markup';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

el.form.addEventListener('submit', onSearch);
el.moreButton.addEventListener('click', onLoadMore);

let page = 1;
let query = '';
let instanceSimpleLightbox;

function onSearch(e) {
  e.preventDefault();
  el.moreButton.classList.add('load-more-hidden');

  const searchQuery = e.target.elements.searchQuery.value.trim();
  if (searchQuery === '') return;
  query = searchQuery;

  getPhotos(searchQuery)
    .then(({ data }) => {
      if (data.hits.length === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      Notify.success(`Hooray! We found ${data.totalHits} images.`);

      const markup = createMarkup(data);
      el.gallery.innerHTML = markup;
      instanceSimpleLightbox = new SimpleLightbox('.gallery-card', {});

      if (data.totalHits > PER_PAGE) {
        el.moreButton.classList.remove('load-more-hidden');
      }
    })
    .catch(err => {
      console.log(err);
      Notify.failure(
        `Sorry, something went wrong. Error ${err}. Please try again.`
      );
    });
}

function onLoadMore() {
  page += 1;

  const searchQuery = query;

  getPhotos(searchQuery, page)
    .then(({ data }) => {
      const markup = createMarkup(data);
      el.gallery.insertAdjacentHTML('beforeend', markup);
      instanceSimpleLightbox.refresh();

      const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });

      if (page * PER_PAGE >= data.totalHits) {
        el.moreButton.classList.add('load-more-hidden');
        Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
      }
    })
    .catch(err => {
      console.log(err);
      Notify.failure(
        `Sorry, something went wrong. Error ${err}. Please try again.`
      );
    });
}
