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
      <NewsFeed keyword = "" category={category.toLowerCase()} />
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
  const navigate = useNavigate();
  return (
    <>
     <NavBar onSearch={(kw) => navigate(`/search/${kw}`)} />
        {/* <SideNavBar/> */}
      <CategoryBar />
      <HeadingName /> {/* No category or keyword here, shows default heading */}
      <NewsFeed keyword = {keyword} />
      <Footer />
    </>
  )
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
