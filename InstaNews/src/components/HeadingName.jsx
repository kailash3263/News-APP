import React from "react";

const HeadingName = ({ category, keyword, date }) => {
  // Determine the heading text based on category or keyword
  let headingText = "Today's Top Headlines";
  if (category) {
    headingText = `Today's Top Headlines in ${category}`;
  } else if (date) {
    headingText = `News on: ${date}`;
  }
  else if (keyword) {
    headingText = `Search Results for: ${keyword}`;
  }

  return (
    <h1 className="news-page-heading">
      <span className="heading-highlight">{headingText}</span>
    </h1>
  );
};

export default HeadingName;
