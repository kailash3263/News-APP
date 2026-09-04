import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

const RecentSearches = () => {
  const [searches, setSearches] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchSearches();
  }, []);

  const fetchSearches = async () => {
    try {
      const response = await fetch(
        "https://instanews-backend.onrender.com/api/articles/search-history",
        {
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(data.message);
        return;
      }

      setSearches(data);
    } catch (error) {
      console.error("Error fetching search history:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://instanews-backend.onrender.com/api/articles/search-history/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(data.message);
        return;
      }

      // Remove from UI immediately
      setSearches((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.error("Error deleting search:", error);
    }
  };

  const handleSearchClick = (keyword) => {
    navigate(`/search/${encodeURIComponent(keyword)}`);
  };

  return (
    <>
      <NavBar onSearch={(kw) => navigate(`/search/${kw}`)} />

      <div className="container mt-4">
        <h4>Recent Searches</h4>

        {loading ? (
          <p>Loading...</p>
        ) : searches.length === 0 ? (
          <p>No recent searches.</p>
        ) : (
          <ul className="list-group">
            {searches.map((search) => (
              <li
                key={search._id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span
                  style={{
                    cursor: "pointer",
                    color: "blue",
                    textDecoration: "underline",
                  }}
                  onClick={() => handleSearchClick(search.keyword)}
                >
                  🔍 {search.keyword}
                  <br />

                  <small>
                    {(new Date(search.searchedAt)).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                  </small>
                </span>

                <button
                  className="btn btn-sm"
                  onClick={() => handleDelete(search._id)}
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