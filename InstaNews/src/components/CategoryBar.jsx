import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryBar = () => {
  const navigate = useNavigate();

  const categories = [
    { name: "Business", color: "secondary" },
    { name: "Entertainment", color: "orange" },
    { name: "Health", color: "#00b300" },
    { name: "Science", color: "#ff00ff" },
    { name: "Sports", color: "#ff1a1a" },
    { name: "Technology", color: "#003974" },
    { name: "Tourism", color: "#e60073" },
    { name: "Crime", color: "#b30000" },
    { name: "Education", color: "#3366ff" },
    { name: "Food", color: "#008000" },
    { name: "Lifestyle", color: "#994d00" },
    { name: "Politics", color: "#669999" },
  ];

  return (
    <ul className="nav nav-pills justify-content-center gap-2 my-4 flex-wrap">
      {categories.map((category) => (
        <li className="nav-item" key={category.name}>
          <button
            type="button"
            className="btn btn-secondary mx-3"
            style={{ backgroundColor: category.color, borderColor: "white" }}
            onClick={() => navigate(`/category/${category.name.toLowerCase()}`)}
          >
            {category.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CategoryBar;
