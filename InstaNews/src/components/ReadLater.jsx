import React, { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import NavBar from "./NavBar";
import CategoryBar from "./CategoryBar";
import Footer from "./footer";

const ReadLaterNews = () => {
  const [readLaterArticles, setReadLaterArticles] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("ReadLaterArticles")) || [];
    setReadLaterArticles(saved);
  }, []);

  return (
    <>
      <NavBar onSearch={(kw) => {}} />
      <CategoryBar />
      <div className="container mt-5">
        <h3 className="text-center display-4 mb-4"><b> Read Later </b></h3>
        <div className="d-flex flex-wrap justify-content-center gap-4">
          {readLaterArticles.length === 0 ? (
            <p>No bookmarked articles yet.</p>
          ) : (
            readLaterArticles.map((article, index) => (
              <NewsCard
                key={index}
                title={article.title}
                imageUrl={article.image_url}
                sourceName={article.source_name}
                link={article.link}
                pubDate={article.pubDate}
                NewsDiscription={article.description}
              />
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ReadLaterNews;
