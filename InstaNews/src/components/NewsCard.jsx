import React, { useState } from "react";
import ActionIcons from "./likeShareIcon";
import AISummaryModal from "./AISummaryModal"; // Importing the modal here
import geminilogo from "./geminiLogo.png";

const NewsCard = ({ title, imageUrl, sourceName, link, pubDate ,NewsDiscription}) => {
  const [showModal, setShowModal] = useState(false);

  const handleAISummaryClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };
  const article = {
    title,
    image_url: imageUrl,
    source_name: sourceName,
    link,
    pubDate,
    description: NewsDiscription,
  };
  
  return (
    <div>
      {/* News Card */}
      <div
        className="card my-3 mx-3"
        style={{
          width: "20rem",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          border: "1px solid #ddd",
          backgroundColor: " #d9d9d9"
        }}
      >
        <img
          src={imageUrl || "https://via.placeholder.com/150"} // Fallback image if imageUrl is null
          className="card-img-top"
          style={{ borderRadius: "10px" }}
          alt="News Thumbnail"
        />
        <div className="card-body pb-0 pt-1">
          <div style={{ backgroundColor: " #d9d9d9" }}>
            <small className="text-body-secondary text-danger">{sourceName || "Unknown Source"}</small>
          </div>
          <h5 className="card-title">
            <b>{title || "No Title Available"}</b>
          </h5>
          <div style={{ backgroundColor: " #d9d9d9" }}>
            <small className="text-body-secondary">{pubDate || "Unknown Date"}</small>
          </div>

          <div className="d-flex justify-content-between mt-3">
            <a href={link || "#"} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
              Read Full Story
            </a>
            <button className="btn btn-outline-secondary" onClick={handleAISummaryClick}>
              AI Summary <img src={geminilogo} style={{ width: "1rem" }} alt="AI Summary" />
            </button>
          </div>
          <hr className="text-grey mt-3 w-100 my-0" />
          <ActionIcons article={article} />

        </div>
      </div>

      {/* Import and render Modal */}
      <AISummaryModal show={showModal} url ={link} newsTitle = {title} handleClose={handleClose} discription =  {NewsDiscription} />
      {/* <AISummaryModal show={showModal} url ={link} newsTitle = {title}/> */}
    </div>
  );
};

export default NewsCard;
