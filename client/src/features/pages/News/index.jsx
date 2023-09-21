import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NewsService from "../../../app/services/news.service";
import { Breadcrumb } from '../../components/Breadcrumb'
import { ArticleDetails } from '../../components/ArticleDetails'
import { Social } from "../../components/Social";

export const NewsDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState({});

  useEffect(() => {
    NewsService.getNewsById(id)
      .then((response) => {
        setArticle(response);
        console.log(response)
      })
      .catch((error) => {
        console.error("Error fetching news articles:", error);
      });
  }, [id]);
  return (
    <div className="py-16 px-20">
      <Breadcrumb article={article}/>
      <ArticleDetails article={article}/>
      <Social />
  </div>
  )
}
