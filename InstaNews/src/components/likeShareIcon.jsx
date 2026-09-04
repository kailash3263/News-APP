import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ShareOptions from "./ShareOptions";
import Toast from "bootstrap/js/dist/toast";
import "./App.css";

const ActionIcons = ({ article }) => {
  const [showShareModel, setShowShareModel] = useState(false)
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const handleShareModel = ()=>{
    setShowShareModel(true);
  }
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
    if (toastBody) toastBody.textContent = message;
    const toast = new Toast(toastElement);
    toast.show();
  };

  const handleLike = async () => {
    try {
      const response = await fetch(
        `https://instanews-backend.onrender.com/api/articles/like`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            article
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        showToast(data.message || "Please login first");
        return;
      }

      isLiked?setIsLiked(false):setIsLiked(true);
      showToast(data.message);
    } catch (error) {
      console.error(error);
      showToast("Something went wrong");
    }
  };

  const handleBookmark = async () => {
      try {
      const response = await fetch(
        `https://instanews-backend.onrender.com/api/articles/bookmark`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            article
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        showToast(data.message || "Please login");
        return;
      }

      isBookmarked?setIsBookmarked(false):setIsBookmarked(true);
      showToast(data.message);
    } catch (error) {
      console.error(error);
      showToast("Something went wrong");
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center gap-5 my-2">

        {/* Like */}
        <button
          className={`action-icon fs-4 btn${isLiked ? " action-icon--active" : ""}`}
          onClick={handleLike}
        >
          <i className={`fa${isLiked ? "s" : "r"} fa-thumbs-up`}></i>
        </button>

        {/* Share */}
        <button
          className="action-icon fs-4 btn"
          onClick={handleShareModel}
          aria-label="Share article"
        >
          <i className="fas fa-share"></i>
        </button>

        {/* Bookmark */}
        <button
          className={`action-icon fs-4 btn${isBookmarked ? " action-icon--active" : ""}`}
          onClick={handleBookmark}
        >
          <i className={`fa${isBookmarked ? "s" : "r"} fa-bookmark`}></i>
        </button>

      </div>

      <ShareOptions show = {showShareModel} setShow={setShowShareModel} article={article} />

      {/* Toast */}
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
    </div>
  );
};

// ActionIcons.propTypes = {
//   article: PropTypes.shape({
//     _id: PropTypes.string.isRequired,
//     link: PropTypes.string.isRequired,
//     title: PropTypes.string,
//     description: PropTypes.string,
//     image_url: PropTypes.string,
//   }).isRequired,
// };

export default ActionIcons;