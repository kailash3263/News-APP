import NavBar from './components/NavBar';
import Footer from "./components/footer";
import CategoryBar from "./components/CategoryBar";
import HeadingName from "./components/HeadingName";
import NewsFeed from "./components/NewsFeed";
import LikedNews from "./components/LikedNews";
import ReadLater from "./components/ReadLater";
import RecentSearches from "./components/RecentSearches";
import Signup from "./components/signUp";
import Login, { ForgotPassword } from "./components/login";
import { Routes, Route, useParams  } from "react-router-dom";
import { useState } from 'react';
const Home = ({ count, setCount }) => (
  <>
    <NavBar ct={count} />
    <CategoryBar />
    <HeadingName />
    <NewsFeed stCnt={setCount} />
    <Footer />
  </>
);
const LoginPage = ({ count, setCount }) => (
  <>
    <NavBar ct={count} />
    <Login/>
    <Footer />
  </>
);
const SignupPage = ({ count, setCount }) => (
  <>
    <NavBar ct={count} />
    <Signup/>
    <Footer />
  </>
);

const News = ({ count, setCount }) => {
  const { date } = useParams();
  return (
    <>
      <NavBar ct={count} date={date} />
      <CategoryBar />
      <HeadingName date={date} />
      <NewsFeed stCnt={setCount} date={date} />
      <Footer />
    </>
  );
};

const SearchResults = ({ count, setCount }) => {
  const { keyword } = useParams();
  return (
    <>
      <NavBar ct={count} />
      <CategoryBar />
      <HeadingName keyword={keyword} />
      <NewsFeed keyword={keyword} stCnt={setCount} />
      <Footer />
    </>
  );
};

const CategoryResults = ({ count, setCount }) => {
  const { category } = useParams();
  return (
    <>
      <NavBar ct={count} />
      <CategoryBar />
      <HeadingName category={category} />
      <NewsFeed category={category.toLowerCase()} stCnt={setCount} />
      <Footer />
    </>
  );
};

const App = () => {
  const [count, setCount] = useState(0);
  return (
    <Routes>
      <Route path="/" element={<Home count={count} setCount={setCount} />} />
      <Route path="/news/:date" element={<News count={count} setCount={setCount} />} />
      <Route path="/search/:keyword" element={<SearchResults count={count} setCount={setCount} />} />
      <Route path="/category/:category" element={<CategoryResults count={count} setCount={setCount} />} />
      <Route path="/liked" element={<LikedNews />} />
      <Route path="/read-later" element={<ReadLater />} />
      <Route path="/recent-searches" element={  <RecentSearches />} />
      <Route path="/signin" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
};
export default App;