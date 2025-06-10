import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

const RecentSearches = () => {
  const [searches, setSearches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("recentSearches")) || [];
    setSearches(saved);
  }, []);

  const handleDelete = (timestamp) => {
    const filtered = searches.filter((item) => item.timestamp !== timestamp);
    setSearches(filtered);
    localStorage.setItem("recentSearches", JSON.stringify(filtered));
  };

  const handleSearchClick = (keyword) => {
    navigate(`/search/${encodeURIComponent(keyword)}`);
  };

  return (
    <>
      <NavBar onSearch={(kw) => navigate(`/search/${kw}`)} />
      <div className="container mt-4">
        <h4>Recent Searches</h4>
        {searches.length === 0 ? (
          <p>No recent searches.</p>
        ) : (
          <ul className="list-group">
            {searches.map(({ keyword, time, timestamp }) => (
              <li
                key={timestamp}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span
                  style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
                  onClick={() => handleSearchClick(keyword)}
                >
                  🔍 {keyword}
                  <br />
                  <small>{time}</small>
                </span>
                <button
                  className="btn btn-sm "
                  onClick={() => handleDelete(timestamp)}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default RecentSearches;
