import React, { useState } from "react";
import ActionIcons from "./likeShareIcon";
import AISummaryModal from "./AISummaryModal"; // Importing the modal here
import geminilogo from "./geminiLogo.png";


const NewsCard = ({ title, _id, imageUrl, sourceName, link, pubDate, showActionIcons, showDeleteButton = false,onDelete}) => {
  const [showModal, setShowModal] = useState(false);

  const handleAISummaryClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleDeleteClick = () => {
     onDelete(_id);
  };
  const article = {
    _id,
    title,
    image_url: imageUrl,
    source_name: sourceName,
    link,
    pubDate,
  };
  // console.log("the image url is ",article);
  return (
    <div className="news-card-wrapper">
      {/* News Card */}
      <div className="card news-card my-3 mx-3 position-relative">
        {showDeleteButton && (
          <button
            type="button"
            className="news-card__delete-btn"
            onClick={handleDeleteClick}
            aria-label="Delete news"
            title="Delete"
          >
            ×
          </button>
        )}

        <img
          src={imageUrl || "https://via.placeholder.com/150"}
          className="card-img-top"
          alt="News Thumbnail"
        />
        <div className="card-body pb-0 pt-1">
          <div>
            <span className="source-pill">{sourceName || "Unknown Source"}</span>
          </div>
          <h5 className="card-title">
            <b>{title || "No Title Available"}</b>
          </h5>
          <div>
            <small className="news-meta">{pubDate || "Unknown Date"}</small>
          </div>

          <div className="d-flex justify-content-between mt-3 gap-2">
            <a href={link || "#"} className="btn btn-primary flex-grow-1" target="_blank" rel="noopener noreferrer">
              Read Full Story
            </a>
            <button className="btn btn-outline-secondary" onClick={handleAISummaryClick}>
              AI <img src={geminilogo} style={{ width: "1rem" }} alt="AI Summary" />
            </button>
          </div>
          <hr className="text-grey mt-3 w-100 my-0" />
         { 
         showActionIcons ? <ActionIcons article={article} /> : 
         <></>
         }

        </div>
      </div>

      {/* Import and render Modal */}
      <AISummaryModal show={showModal} URL ={link} newsTitl = {title} handleClose={handleClose} />
      {/* <AISummaryModal show={showModal} url ={link} newsTitle = {title}/> */}
    </div>
  );
};

export default NewsCard;
