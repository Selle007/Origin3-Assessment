import axios from 'axios';

const baseURL = 'http://localhost:3000/api/';

axios.defaults.baseURL = baseURL;

const sleep = (delay) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.interceptors.response.use(async (response) => {
  try {
    await sleep(300);
    return response;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
});

const responseBody = (response) => response.data;

const requests = {
  get: (url) => axios.get(url).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody).catch((err) => console.log(err)),
  put: (url, body) => axios.put(url, body).then(responseBody),
  del: (url) => axios.delete(url).then(responseBody),
};

const News = {
  list: (searchQuery, sortOption, articlesPerPage, languageFilter, page) => axios.get('/news' ,{params: {
    searchQuery,
    sortOption,
    articlesPerPage,
    languageFilter,
    page
  }}), 
  details: (newsId) => requests.get(`/news/${newsId}`), 
  create: (newsData) => requests.post('/news', newsData),
  suggestedArticles: () => requests.get('/suggested-articles'), 
}
const agent = {
  News,
};

export default agent;
