import api from '../api/api';

const NewsService = {
  getAllNews: async (queryParams) => {
    try {
      return await api.News.list(queryParams);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  getNewsById: async (newsId) => {
    try {
      return await api.News.details(newsId);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  getSuggestedArticles: async () => {
    try {
      return await api.News.suggestedArticles();
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  
  getFilteredNews: async (searchQuery, sortOption, articlesPerPage, languageFilter, page) => {
    try {
      const response = await api.News.list(searchQuery, sortOption, articlesPerPage, languageFilter, page);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default NewsService;
