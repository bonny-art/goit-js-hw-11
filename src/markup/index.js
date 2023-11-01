function createMarkup({ hits } = []) {
  return hits
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
        
        <div class="photo-card">
          <a class="gallery-card" href="${largeImageURL}">
            <div class="img-container">
              <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            </div>
            <div class="info">
              <p class="info-item">
                <b>Likes</b>\n${likes}
              </p>
              <p class="info-item">
                <b>Views</b>\n${views}
              </p>
              <p class="info-item">
                <b>Comments</b>\n${comments}
              </p>
              <p class="info-item">
                <b>Downloads</b>\n${downloads}
              </p>
            </div>
          </a>
        </div>
        
        `;
      }
    )
    .join('');
}

export { createMarkup };
