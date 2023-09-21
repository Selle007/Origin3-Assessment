import React from "react";
import { SuggestedArticles } from "../SuggestedArticles";


export const ArticleDetails = ({article}) => {

  return (
    <div className="flex flex-col  items-center">
      <div className="w-1/2 text-4xl leading-10 bebas text-center justify-center py-12">{article.title}</div>
      <div>
        <img src={`http://localhost:3000/${article.image}`} className="rounded-lg w-full " alt="realted to artilce" />
      </div>

      <div className="w-1/2 leading-9 text-2xl text-justify  py-12">
        {article.content}
      </div>

      <SuggestedArticles />
    </div>
  );
};
