import React, { useState, useEffect } from "react";
import { NewsCard } from "../NewsCard";
import NewsService from "../../../app/services/news.service"; 

export const HomeNews = () => {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  const [articlesPerPage, setArticlesPerPage] = useState(12);
  const [languageFilter, setLanguageFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1|| "");
  const [totalPages, setTotalPages] = useState('');

  useEffect(() => {
    NewsService.getFilteredNews(searchQuery, sortOption, articlesPerPage, languageFilter, currentPage)
      .then((response) => {
        setArticles(response.articles);
        const totalPages = response.totalPages;
        setTotalPages(totalPages);
      })
      .catch((error) => {
        console.error("Error fetching news articles:", error);
      });
  }, [searchQuery, sortOption, articlesPerPage, languageFilter, currentPage]); 
  
  const handlePreviousPageClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const handleNextPageClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  return (
    <>
      <div className="flex justify-between mt-28 mx-40">
        <div>
          <div className="relative border rounded-sm">
            <label htmlFor="Search" className="sr-only">
              Search
            </label>
            <span className="absolute inset-y-0 grid w-10 -ml-2 place-content-center">
              <button type="button" className="text-black">
                <span className="sr-only">Search</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-3.5 h-3.5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
                </svg>
              </button>
            </span>
            <input
              type="text"
              id="Search"
              placeholder="Search news"
              className="w-full border-gray-200 sm:text-sm pl-6 py-1 w-72 rounded leading-6 text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex font-normal">
            <div className="leading-6 text-base">Lang:</div>
            <select
              className="border border-gray-300 mr-3 ml-1 rounded leading-6 text-base"
              name="Lang"
              id="lang"
              value={languageFilter}
              onChange={(e) => setLanguageFilter(e.target.value)}>
              <option value="All">All</option>
              <option value="EN">EN</option>
              <option value="DE">DE</option>
              <option value="ES">ES</option>
            </select>
          </div>
          <div className="flex font-normal">
            <div className="leading-6 text-base">Show:</div>
            <select
              className="border border-gray-300 mr-3 ml-1 rounded leading-6 text-base"
              name="Show"
              id="show"
              value={articlesPerPage}
              onChange={(e) => setArticlesPerPage(parseInt(e.target.value))}>
              <option value={12}>12</option>
              <option value={15}>15</option>
              <option value={18}>18</option>
              <option value={21}>21</option>
            </select>
          </div>
          <div className="flex font-normal">
            <div className="leading-6 text-base">Sort:</div>
            <select
              className="border border-gray-300 ml-1 rounded leading-6 text-base"
              name="Sort"
              id="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}>
              <option value="newest">newest</option>
              <option value="oldest">oldest</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex mx-40 gap-6 pt-8">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {articles.map((article) => (
            <NewsCard key={article._id} article={article} />
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <div className="inline-flex items-center justify-center gap-3">
          <button
            className={`inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={handlePreviousPageClick}
            disabled={currentPage === 1}>
            <span className="sr-only">Previous Page</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              viewBox="0 0 20 20"
              fill="currentColor">
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"/>
            </svg>
          </button>
          <p className="text-xs text-gray-900">
            {currentPage}
            <span className="mx-0.25">/</span>
            {totalPages}
          </p>
          <button
            className={`inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900  ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={handleNextPageClick}
            disabled={currentPage === totalPages}>
            <span className="sr-only">Next Page</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              viewBox="0 0 20 20"
              fill="currentColor">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"/>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};
