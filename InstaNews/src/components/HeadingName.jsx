import React from "react";

const HeadingName = ({ category, keyword }) => {
  // Determine the heading text based on category or keyword
  let headingText = "Today's Top Headlines";
  if (category) {
    headingText = `Today's Top Headlines in ${category}`;
  } else if (keyword) {
    headingText = `Search Results for: ${keyword}`;
  }

  return (
    <h1 className="text-center display-4"> <b>{headingText}</b> </h1>
  );
};

export default HeadingName;
