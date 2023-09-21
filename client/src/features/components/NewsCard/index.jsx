import React from "react";

function formatDateToDDMMYYYY(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = String(date.getFullYear());

  return `${day}.${month}.${year}`;
}


export const NewsCard = ({article}) => {
  const formattedDate = formatDateToDDMMYYYY(new Date(article.date));
  
  return (
    <div className="shadow-lg pt-1 pb-12 px-8">
      <div className="pt-5">
        <img src={`http://localhost:3000/${article.image}`} className="rounded-lg w-full" alt="test" />
      </div>
      <div className="pt-8 text-yellow-500 text-sm uppercase bebas">Discover</div>
      <div className="pt-10 text-gray-900 font-semibold text-2xl work">
        {article.title}
      </div>
      <div className="pt-5 text-gray-500 font-medium text-base leading-6 pr-4">
        <p className="text-justify work text-base leading-6" style={{ overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
          {article.content}
        </p>
      </div>
      <div className="flex justify-between pt-3 text-lg text-gray-600">
        <div className="text-base leading-6 work">{formattedDate}</div>
        <div className="flex justify-center items-center text-blue-600">
          <a href={`/details/${article._id}`} className="flex justify-center items-center text-blue-600 text-base leading-6 work">
            Read more
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};
