import React, { useState, useEffect } from "react";
import NewsCard from "./NewsCard";
import Toast from "bootstrap/js/dist/toast";

function NewsFeed({ keyword, category, date, stCnt }) {
  const showToast = (message) => {
    const toastElements = document.querySelectorAll("#liveToast");
    if (toastElements.length > 1) {
      toastElements.forEach((element, index) => {
        if (index < toastElements.length - 1) element.remove();
      });
    }

    const toastElement = document.getElementById("liveToast");
    if (!toastElement) return;
    const toastBody = toastElement.querySelector(".toast-body");
    if (!toastBody) return;
    const toast = new Toast(toastElement);
    toast.show();
  };

  function getNewsUrl(keyword, category, date) {
    if (keyword) {
      return `http://localhost:5000/api/news/search?q=${encodeURIComponent(keyword)}`;
    }
    if (category) {
      return `http://localhost:5000/api/news/category/${encodeURIComponent(category)}`;
    }
    if (date) {
      return `http://localhost:5000/api/news/date/${encodeURIComponent(date)}`;
    }
    const formatted = new Date().toLocaleDateString("en-CA");
    return `http://localhost:5000/api/news/date/${encodeURIComponent(formatted)}`;
  }

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

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
          showToast("login to get personalized news");
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
                <p className="text-center text-muted fs-5 mb-0">
                  No news found.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      <div
        id="liveToast"
        className="toast position-fixed bottom-0 end-0 mb-3 me-3 bg-danger"
        style={{ zIndex: "999999" }}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-body"></div>
      </div>
    </>
  );
}

export default NewsFeed;
