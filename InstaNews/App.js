import React, { useState, useEffect } from "react";
import NavBar from './components/NavBar';
import CategoryBar from "./components/CategoryBar";
import NewsCard from "./components/NewsCard";
import Footer from "./components/footer";
import HeadingName from "./components/HeadingName";
import NewsFeed from "./components/NewsFeed";
import LikedNews from "./components/LikedNews";
import ReadLater from "./components/ReadLater";
import RecentSearches from "./components/RecentSearches";

import { Routes, Route, useParams, useNavigate, useLocation } from "react-router-dom";
const CategoryResults = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <NavBar onSearch={(kw) => navigate(`/search/${kw}`)} />
      <CategoryBar />
      <HeadingName category={category} /> {/* Pass category */}
      <NewsFeed category={category.toLowerCase()} />
    </>
  );
};

const RecentSearchesResult = () => {
  return (
    <>
    <RecentSearches />
    </>
  );
};

const SearchResults = () => {
  const { keyword } = useParams();
  const [news, setNews] = useState([]);
  // const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const apiKeys = [
    "pub_82328a8ff9a97822fcc3192362874344598d3",
    "pub_83929a5701321b714d40f6b6e66fa450dd495",
    // "pub_8413826977a180b80aaf4c4da724d99e0b8b6",
    // "pub_84141afd7f1cb761e6c92e54d12ff62b7c7f",
    // "pub_8414346d6cac088c8a2460157b727a45d75b"
  ];


  const fetchNews = async (keyword = "", pageParam = null) => {
    const cacheKey = keyword ? `news_${keyword}` : "news_home"; // Cache based on keyword or home page
    const cacheTimeKey = `${cacheKey}_time`;
  
    // Check if cached data is available and less than 1 hour old
    const cachedNews = localStorage.getItem(cacheKey);
    const cachedTime = localStorage.getItem(cacheTimeKey);
    const currentTime = new Date().getTime();
  
    // If the cache exists and is less than 1 hour old, use the cached news
    if (cachedNews && cachedTime && currentTime - cachedTime < 3600000) {
      setNews(JSON.parse(cachedNews));
      setLoading(false);
      return;
    }
  
    // Fetch fresh data if no valid cache is available
    setLoading(true);
    for (let key of apiKeys) {
      try {
        const url = `https://newsdata.io/api/1/latest?apikey=${key}&country=in&language=en&image=1&removeduplicate=1${keyword ? `&q=${encodeURIComponent(keyword)}` : ""}${pageParam ? `&page=${pageParam}` : ""}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.status === "success" && Array.isArray(data.results)) {
          // Update state and cache the data
          setNews((prev) => pageParam ? [...prev, ...data.results] : data.results);
          localStorage.setItem(cacheKey, JSON.stringify(data.results));
          localStorage.setItem(cacheTimeKey, currentTime.toString());
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
    fetchNews(keyword);
  }, [keyword]);

  return (
    <>
      <NavBar onSearch={(kw) => navigate(`/search/${kw}`)} />
        {/* <SideNavBar/> */}
                <CategoryBar />
        <HeadingName keyword={keyword}/>
      {/* Rest of the components */}
      <div className="container mt-5">
        {loading ? <p>Loading...</p> : (
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
      </div>
<Footer/>

    </>
  );
};

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <NavBar onSearch={(kw) => navigate(`/search/${kw}`)} />
        {/* <SideNavBar/> */}
      <CategoryBar />
      <HeadingName /> {/* No category or keyword here, shows default heading */}
      <NewsFeed />
      <Footer />
    </>
  );
};


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search/:keyword" element={<SearchResults />} />
      <Route path="/category/:category" element={<CategoryResults />} />
      <Route path="/liked" element={<LikedNews />} />
      <Route path="/read-later" element={<ReadLater />} />
      <Route path="/recent-searches" element={<RecentSearchesResult />} />
    </Routes>
  );
};

export default App;
