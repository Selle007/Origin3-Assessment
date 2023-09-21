import React from "react";
import { SuggestedArticles } from "../SuggestedArticles";

export const ArticleDetails = ({ article }) => {
  if (article.content && typeof article.content === 'string') {
    const formatedContent = article.content.replace(/\n\n/g, '<br /><br />');
    article.content = formatedContent;
  } else {
    console.error("API response content is not valid.");
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-1/2 text-4xl leading-10 bebas text-center justify-center py-12">{article.title}</div>
      <div>
        <img src={`http://localhost:3000/${article.image}`} className="rounded-lg w-screen" alt="related to article" />
      </div>

      <div className="w-1/2 leading-9 text-2xl text-justify py-12 rota" dangerouslySetInnerHTML={{ __html: article.content }}>
      </div>

      <SuggestedArticles />
    </div>
  );
};
