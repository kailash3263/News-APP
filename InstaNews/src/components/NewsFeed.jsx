import React, { useState, useEffect } from "react";
import NewsCard from "./NewsCard";

function NewsFeed({ keyword, category }) {

  function getNewsUrl(keyword, category) {
  if (keyword) {
    return `http://localhost:5000/api/news/search?q=${encodeURIComponent(keyword)}`;
  }
  if (category) {
    return `http://localhost:5000/api/news/category/${encodeURIComponent(category)}`;
  }
  return "http://localhost:5000/api/news";
}

  const [news, setNews] = useState([]);
useEffect(() => {
  async function fetchNews() {
    try {
      const url = getNewsUrl(keyword, category);
      const res = await fetch(url);
      const data = await res.json();

      setNews(data.results);
    } catch (err) {
      console.error(err);
    }
  }

  fetchNews();
}, [keyword, category]);

  return (
    <div className="container mt-5">
      {
        <div className="d-flex flex-wrap justify-content-center gap-5">
          {news.map((article, index) => (
            <NewsCard
              key={index}
              title={article.title}
              imageUrl={article.image_url}
              sourceName={article.source_name}
              link={article.link}
              pubDate={article.pubDate}
              NewsDiscription={article.description}
            />
          ))}
        </div>
      }
    </div>
    // <h1>hiiiiii i got the data</h1>
  );
}

export default NewsFeed;
