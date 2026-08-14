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
  return (
    <>
      <NavBar  />
      <CategoryBar />
      <HeadingName category={category} />
      <NewsFeed category={category.toLowerCase()} keyword={""} />
      <footer/>
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
  return(
    <>
      <NavBar />
      <CategoryBar />
      <HeadingName keyword={keyword} />
      <NewsFeed category= {""} keyword={keyword} />
      <Footer />
    </>
  )
}


const Home = () => {
  return (
    <>
      <NavBar />
      <CategoryBar />
      <HeadingName />
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
