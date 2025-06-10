import React, { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import NavBar from "./NavBar";
import CategoryBar from "./CategoryBar";
import Footer from "./footer";

const LikedNews = () => {
  const [likedArticles, setLikedArticles] = useState([]);

  useEffect(() => {
    try {
      const liked = JSON.parse(localStorage.getItem("LikedArticles")) || []; // Change the key to "LikedArticles"
      const validArticles = liked.filter(
        (article) => article && article.title && article.link
      );
      setLikedArticles(validArticles);
    } catch (error) {
      console.error("Error parsing liked articles from localStorage:", error);
      setLikedArticles([]);
    }
  }, []);
  

  return (
    <>
      <NavBar onSearch={(kw) => {}} />
      <CategoryBar />
      <div className="container mt-5">
        <h3 className="text-center display-4 mb-4"><b> Liked News</b></h3>
        <div className="d-flex flex-wrap justify-content-center gap-4">
        {likedArticles.length === 0 ? (
  <p>No liked articles yet.</p>
) : (
  likedArticles.map((article) => {
    if (!article) return null; // Skip invalid entries
    return (
      <NewsCard
        key={article.id} // Use a unique identifier if available
        title={article.title}
        imageUrl={article.image_url}
        sourceName={article.source_name}
        link={article.link}
        pubDate={article.pubDate}
        NewsDescription={article.description}
        showActionIcons={false} // Pass this prop to hide action icons
      />
    );
  })
)}

        </div>
      </div>
      <Footer />
    </>
  );
};

export default LikedNews;
