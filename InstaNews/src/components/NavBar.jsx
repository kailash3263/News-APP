import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import SideNavBar from "./SideNavBar";

const NavBar = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      const searchRecord = {
        keyword: keyword.trim(),
      };
      navigate(`/search/${keyword}`)
      setKeyword("");
    }
  }
  return (
    <>
      <SideNavBar />
      <nav className="navbar navbar-expand-lg navbar-light bg-primary px-3">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          {/* Left: Side Navbar Toggle Button */}
          <button
            className="btn me-2 bg-white"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#sideNav"
            aria-controls="sideNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Center: Title */}
          <div className="mx-auto">
            <Link to="/" className="text-decoration-none">
              <h4 className="mb-0 text-white fs-1">InstaNews</h4>
            </Link>
          </div>

          {/* Right: Search toggle button for mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        {/* Collapsible search form */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
          <form className="d-flex my-2 my-lg-0" onSubmit={handleSearch}>
            <input
              className="form-control me-4 w-100"
              type="search"
              placeholder="Search"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button className="btn btn-outline-light" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
