import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY_API = '36630358-242656ee3a90f5cf2b5c56a75';
export const PER_PAGE = 12;

export const getImages = async (querySearch, page) => {
  const { data } = await axios(
    `${BASE_URL}?key=${KEY_API}&q=${querySearch}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${PER_PAGE}&page=${page}`
  );

  return data;
};
