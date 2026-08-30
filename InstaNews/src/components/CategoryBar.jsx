import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryBar = () => {
  const navigate = useNavigate();

  const categories = [
    { name: "Business", color: "#4f46e5" },
    { name: "Entertainment", color: "#f97316" },
    { name: "Health", color: "#10b981" },
    { name: "Science", color: "#8b5cf6" },
    { name: "Sports", color: "#ef4444" },
    { name: "Technology", color: "#0ea5e9" },
    { name: "Tourism", color: "#ec4899" },
    { name: "Crime", color: "#dc2626" },
    { name: "Education", color: "#3b82f6" },
    { name: "Food", color: "#f59e0b" },
    { name: "Lifestyle", color: "#a16207" },
    { name: "Politics", color: "#14b8a6" },
  ];

  return (
    <div className="container">
      <ul className="nav nav-pills justify-content-center gap-2 my-4 flex-wrap">
        {categories.map((category) => (
          <li className="nav-item" key={category.name}>
            <button
              type="button"
              className="btn btn-category"
              style={{
                background: `linear-gradient(135deg, ${category.color}, ${category.color}cc)`,
                border: "none",
                color: "#ffffff",
                fontWeight: 800,
                letterSpacing: "0.01em",
                boxShadow: "0 8px 16px rgba(15, 23, 42, 0.08)",
              }}
              onClick={() => navigate(`/category/${category.name.toLowerCase()}`)}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryBar;
