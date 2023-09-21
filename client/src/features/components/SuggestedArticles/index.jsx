import React, { useState, useEffect } from "react";
import { NewsCard } from "../NewsCard";
import NewsService from "../../../app/services/news.service"; 

export const SuggestedArticles = () => {
  const [newsArticles, setNewsArticles] = useState([]);

  useEffect(() => {
    NewsService.getSuggestedArticles()
      .then((response) => {
        setNewsArticles(response);
      })
      .catch((error) => {
        console.error("Error fetching news articles:", error);
      });
  }, []); 
  return (
    <div className=" mx-40 mt-24">
      <div className="text-3xl leading-10 text-black bebas">READ ME</div>
      <div className="flex  gap-6 pt-8">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {newsArticles.map((article) => (
          <NewsCard key={article._id} article={article} />
        ))}
        </div>
      </div>
    </div>
  );
};
