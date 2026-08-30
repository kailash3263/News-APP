import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import SideNavBar from "./SideNavBar";
import WeekCalendar from "./WeekCalendar";
const NavBar = ({ct,date}) => {
  const [keyword, setKeyword] = useState("");
  const [name, setName] = useState("");
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("instaNewsTheme");
    return savedTheme || "light";
  });
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("instaNewsTheme", theme);
  }, [theme]);
  
  const handleSearch = async(e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
      setKeyword("");
    }
  };

  const [user, setUser] = useState(null);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/me", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        let n = data.user.name.charAt(0).toUpperCase() + data.user.name.slice(1);
        setName(n);
        setUser(data.user);
      } else {
        setUser(null);

      }
    } catch (error) {
      setUser(null);
    } 
  };
  
 const handleLogout = () => {
  setShowLogoutConfirmation(true);
};
 const confirmLogout = async () => {
  await fetch("http://localhost:5000/auth/logout", {
    method: "POST",
    credentials: "include",
  });
  setUser(null);
  setName("");
  setShowLogoutConfirmation(false);
};

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (  
    <>
      {showLogoutConfirmation && (
        <div className="logout-confirmation" role="dialog" aria-modal="true" aria-labelledby="logout-confirmation-title">
          <div className="logout-confirmation__panel">
            <h2 id="logout-confirmation-title">Are you sure you want to logout?</h2>
            <div className="logout-confirmation__actions">
              <button type="button" className="btn logout-confirmation__yes" onClick={confirmLogout}>
                Yes, log out
              </button>
              <button type="button" className="btn logout-confirmation__no" onClick={() => setShowLogoutConfirmation(false)}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
      <SideNavBar theme={theme} />
      <nav className="navbar navbar-expand-lg navbar-light bg-primary insta-navbar px-3" data-theme={theme}>
        <div className="container-fluid insta-navbar__main">
          <div className="insta-navbar__left">
            <button
              className="btn me-2 bg-white insta-navbar__menu"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#sideNav"
              aria-controls="sideNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="insta-navbar__brand">
              <Link to="/" className="text-decoration-none">
                <h4 className="text-white fs-1 mb-0">InstaNews</h4>
              </Link>
            </div>
          </div>

          <div className="insta-navbar__right">
            <WeekCalendar selectedDate={date || new Date().toLocaleDateString("en-CA")} />
            <h3 className="pe-2 fs-4 mb-0 insta-navbar__count">total Articles: {ct || 0}</h3>

            <button
              className="btn insta-navbar__theme-toggle"
              type="button"
              onClick={toggleTheme}
              aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
              title={theme === "light" ? "Dark mode" : "Light mode"}
            >
              {theme === "light" ? "☾" : "☀"}
            </button>

            <button
              className="navbar-toggler insta-navbar__search-toggle bg-white"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarContent"
              aria-controls="navbarContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse insta-navbar__search"
              id="navbarContent"
            >
              <form className="d-flex my-2 my-lg-2" onSubmit={handleSearch}>
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <button className="btn insta-navbar__submit" type="submit">
                  Search
                </button>
              </form>
            </div>

            <div className="insta-navbar__auth-group">
              {user ? (
                <>
                  <button onClick={handleLogout} className="btn insta-navbar__auth-button insta-navbar__login-button">
                    LogOut
                  </button>
                  <div className="text-center d-flex align-items-center">
                    <h2 className="fw-bold text-white mb-0 insta-navbar__user">Hi, {name}</h2>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/signin" className="btn btn-light insta-navbar__auth-button">
                    Sign Up
                  </Link>
                  <Link to="/login" className="btn insta-navbar__auth-button insta-navbar__login-button">
                    Log In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
