import React from 'react'

export const Breadcrumb = ({article}) => {
  return (
    <div className='flex justify-center'>

      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-1 text-sm text-gray-600 ">

          <li>
            <a href="/" className="block transition text-gray-400 text-lg leading-5 font-medium"> News articles </a>
          </li>

          <li className="text-lg font-medium leading-5">
            /
          </li>

          <li>
            <a href={`/details/${article.id}`} className="block transition hover:text-gray-700 text-lg leading-5 font-medium">{article.title}</a>
          </li>
        </ol>
      </nav>
    </div>
  )
}
