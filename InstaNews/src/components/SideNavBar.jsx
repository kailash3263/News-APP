import React, { useState } from "react";
import { Link } from "react-router-dom";
// import "./SideNavBar.css"; // optional for custom styling
import "./App.css"
import icon from  "./news-report.png"

const SideNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
<div className="offcanvas offcanvas-start" tabIndex="-1" id="sideNav">
  <div className="offcanvas-header">
  <img className="mt-4" style={{width: "3rem"}} src={icon} alt="" />
    <h5 className="offcanvas-title mt-4 fs-1"><b>InstaNews</b> </h5>
    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"></button>
  </div>
  <div className="offcanvas-body mt-5">
    <div className="list-group  my-1">
      <Link to="/" className="list-group-item list-group-item-action fs-5 py-3"><b>Home</b></Link>
      <Link to="/liked" className="list-group-item list-group-item-action fs-5 py-3" ><b>Liked News</b></Link>
      <Link to="/read-later" className="list-group-item list-group-item-action fs-5 py-3" ><b>Read Later</b></Link>
      <Link to="/recent-searches" className="list-group-item list-group-item-action fs-5 py-3" ><b>Recent Searches</b></Link>
    </div>
  </div>
</div>
    </>
  );
};

export default SideNavBar;
