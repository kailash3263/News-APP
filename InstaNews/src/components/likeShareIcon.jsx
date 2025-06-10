import React, { useState } from "react";
import PropTypes from "prop-types";
import ShareOptions from "./ShareOptions";
import Toast from 'bootstrap/js/dist/toast';
import "./App.css"


const LIKED_ARTICLES_KEY = "LikedArticles";
const READ_LATER_ARTICLES_KEY = "ReadLaterArticles";

const ActionIcons = ({ article }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const saveToLocalStorage = (key, article) => {
    if (!article || !article.link) {
      console.error("Invalid article object:", article);
      return false;
    }

    try {
      const existing = JSON.parse(localStorage.getItem(key)) || [];
      const alreadyExists = existing.some((item) => item.link === article.link);

      if (!alreadyExists) {
        const updated = [...existing, article];
        localStorage.setItem(key, JSON.stringify(updated));
        console.log(`Article saved to ${key}:`, article);
        return true;
      } else {
        console.log(`Article already exists in ${key}:`, article);
      }
    } catch (error) {
      console.error(`Error saving to localStorage for key "${key}":`, error);
    }
    return false;
  };

  const checkArticleStatus = () => {
    try {
      const likedArticles = JSON.parse(localStorage.getItem(LIKED_ARTICLES_KEY)) || [];
      const bookmarkedArticles = JSON.parse(localStorage.getItem(READ_LATER_ARTICLES_KEY)) || [];

      setIsLiked(likedArticles.some((item) => item.link === article.link));
      setIsBookmarked(bookmarkedArticles.some((item) => item.link === article.link));
    } catch (error) {
      console.error("Error checking article status:", error);
    }
  };

  const handleLike = () => {
    console.log("Article to like:", article);
    const wasAdded = saveToLocalStorage(LIKED_ARTICLES_KEY, article);
    if (wasAdded) {
      console.log("Article liked successfully");
      setIsLiked(true);
      showToast("Article Liked!");
    } else {
      console.error("Failed to like the article");
    }
  };

  const handleBookmark = () => {
    console.log("Article to bookmark:", article);
    const wasAdded = saveToLocalStorage(READ_LATER_ARTICLES_KEY, article);
    if (wasAdded) {
      console.log("Article bookmarked successfully");
      setIsBookmarked(true);
      showToast("Article Bookmarked!");
    } else {
      console.error("Failed to bookmark the article");
    }
  };

  const showToast = (message) => {
    // This will trigger the toast to appear (Bootstrap toast)
    const toastElement = document.getElementById("liveToast");
    const toastBody = toastElement.querySelector(".toast-body"); // Find the toast body
  
    // Set the dynamic message
    toastBody.textContent = message;
    const toast = new Toast(toastElement);

    toast.show();
  };

  // Run this to initialize the state when the component mounts
  React.useEffect(() => {
    checkArticleStatus();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-center gap-5 my-2">
        <button className="text-dark fs-4 btn" onClick={handleLike}>
          
          <i className={`fa${isLiked ? "s" : "r"} fa-thumbs-up`}></i>
        </button>
        <button
          className="text-dark fs-4 btn"
          data-bs-toggle="modal"
          data-bs-target="#shareModal"
        >
          <i className="fas fa-share"></i>
        </button>
        <button className="text-dark fs-4 btn" onClick={handleBookmark}>
          <i className={`fa${isBookmarked ? "s" : "r"} fa-bookmark`}></i>
        </button>
      </div>
      <ShareOptions article = {article} />

      {/* Bootstrap Toast */}
      <div
        id="liveToast"
        className="toast position-fixed bottom-0 end-0 mb-3 me-3"
        style={{zIndex:"999999"}}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-body">
          {/* Toast message will be set dynamically in the showToast function */}
        </div>
      </div>
    </div>
  );
};

ActionIcons.propTypes = {
  article: PropTypes.shape({
    link: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    image_url: PropTypes.string,
  }).isRequired,
};

export default ActionIcons;
