import axios from 'axios';

const MAIN_URL = 'https://pixabay.com/api/';
const API_KEY = '40358053-aa77a52d7b78d629a29aff12d';
const PER_PAGE = 40;

async function getPhotos(query, page = 1) {
  const prepQuery = query.replace(/ /g, '+');
  const params = {
    key: API_KEY,
    q: prepQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: PER_PAGE,
    page,
  };
  const resp = await axios(MAIN_URL, { params });
  return resp;
}

export { getPhotos, PER_PAGE };
