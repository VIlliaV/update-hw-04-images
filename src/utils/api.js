import axios from 'axios';

const END_POINT = 'https://pixabay.com/api/';
const API_KEY = '33488317-ddf10e3d9d4608ab197c27337';
const SEARCH_PARAMETER = 'image_type=photo&orientation=horizontal';

export function getResponse(query, multiplierForPage = 1) {
  return axios(
    `${END_POINT}?q=${query}&page=${1}&key=${API_KEY}&${SEARCH_PARAMETER}&per_page=${
      12 * multiplierForPage
    }`
  );
}
