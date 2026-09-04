import React, { useState, useEffect } from "react";
import NewsCard from "./NewsCard";
import LoginModal from "./loginModal";

function NewsFeed({ keyword, category, date, stCnt }) {
  function getNewsUrl(keyword, category, date) {
    if (keyword) {
      return `https://instanews-backend.onrender.com/api/news/search?q=${encodeURIComponent(keyword)}`;
    }
    if (category) {
      return `https://instanews-backend.onrender.com/api/news/category/${encodeURIComponent(category)}`;
    }
    if (date) {
      return `https://instanews-backend.onrender.com/api/news/date/${encodeURIComponent(date)}`;
    }
    const formatted = new Date().toLocaleDateString("en-CA");
    return `https://instanews-backend.onrender.com/api/news/date/${encodeURIComponent(formatted)}`;
  }

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoginModel, setshowLoginModel] = useState(false);
  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        setNews([]);
        const url = getNewsUrl(keyword, category, date);
        const res = await fetch(url, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.message) {
          setshowLoginModel(true);
          return;
        }
        stCnt(data.count);
        setNews(data.articles || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, [keyword, category, date]);

  return (
    <>
      <div className="container mt-4">
        <div className="news-feed-panel">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary mb-3" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="fs-5 text-muted mb-0">
                Please wait, loading news...
              </p>
            </div>
          ) : (
            <div className="d-flex flex-wrap justify-content-center gap-5">
              {news && news.length > 0 ? (
                news.map((article, index) => (
                  <NewsCard
                    key={index}
                    _id={article._id}
                    title={article.title}
                    imageUrl={article.image_url}
                    sourceName={article.source || article.source_name}
                    link={article.link}
                    pubDate={article.publishedAt || article.pubDate}
                    NewsDiscription={article.description}
                    showActionIcons={true}
                  />
                ))
              ) : (
                <p className="news-feed__empty text-center fs-5 mb-0">
                  No news found.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
        {<LoginModal show = {showLoginModel} close = {setshowLoginModel}/>} 
    </>
  );
}

export default NewsFeed;
