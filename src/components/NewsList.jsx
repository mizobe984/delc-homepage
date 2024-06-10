// src/components/NewsList.jsx
import React from 'react';

const NewsList = ({ articles }) => {
// 表示する記事数を3に制限
const displayedArticles = articles.slice(0, 3);

  return (
    <div className="max-w-full mx-auto">
      <ul className="space-y-0">
        {displayedArticles.map((article, index) => (
          <React.Fragment key={index}>
            <li>
              <a
                href={article.url}
                className="block bg-white p-4 rounded hover:bg-gray-100 cursor-pointer no-underline"
              >
                <h2 className="text-xl font-semibold">{article.title}</h2>
                <p className="text-gray-700">{article.description}</p>
              </a>
            </li>
            {index < articles.length - 1 && <hr className="border-gray-300" />}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default NewsList;
