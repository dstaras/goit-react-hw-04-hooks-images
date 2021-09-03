const API_KEY = "22389576-6dc946f066e9adfceedfbeb2d";
const BASE_URL = "https://pixabay.com/api/?";

const fetchImages = (searchQuery, page) => {
  const fetchUrl = `${BASE_URL}q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  return fetch(fetchUrl).then((res) => res.json());
};

export default fetchImages;
