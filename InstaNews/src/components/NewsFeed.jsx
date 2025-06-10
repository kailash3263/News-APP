import React, { useState, useEffect } from "react";
import NewsCard from './NewsCard';

const NewsFeed = ({ keyword = "", category = "" }) => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(null); // To store the next page ID
  const [loading, setLoading] = useState(false);
  const [callCount, setCallCount] = useState(0); // To track the number of API calls

  const apiKeys = [
    "pub_82328a8ff9a97822fcc3192362874344598d3",
    "pub_83929a5701321b714d40f6b6e66fa450dd495",
    "pub_8413826977a180b80aaf4c4da724d99e0b8b6",
    "pub_84141afd7f1cb761e6c92e54d12ff62b7c7f",
    "pub_8414346d6cac088c8a2460157b727a45d75b",
  ];

  const fetchNews = async (pageParam = null) => {
    if (callCount >= 2) return; // Stop making API calls after 2 calls
    setLoading(true);

    for (let key of apiKeys) {
      try {
        const url = `https://newsdata.io/api/1/latest?apikey=${key}&country=in&language=en&image=1${
          category ? `&category=${encodeURIComponent(category)}` : ""
        }${
          keyword && !category ? `&q=${encodeURIComponent(keyword)}` : ""
        }${pageParam ? `&page=${pageParam}` : ""}&removeduplicate=1`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "success" && Array.isArray(data.results)) {
          setNews((prev) => (pageParam ? [...prev, ...data.results] : data.results)); // Append new results if pageParam exists
          setPage(data.nextPage); // Update the next page ID
          setCallCount((prev) => prev + 1); // Increment the API call count
          setLoading(false);
          return;
        }
      } catch (e) {
        console.error(e);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews(); // Fetch the first batch of news
  }, [keyword, category]);

  useEffect(() => {
    if (page && callCount < 2) {
      fetchNews(page); // Fetch the next page only if the call count is less than 2
    }
  }, [page]);

  return (
    <div className="container mt-5">
      {loading && news.length === 0 ? (
        <p>Loading...</p>
      ) : (
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
      )}
      {page && !loading && callCount < 2 && (
        <div className="text-center mt-4">
          <button
            className="btn btn-primary"
            onClick={() => fetchNews(page)} // Fetch the next page on button click
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
