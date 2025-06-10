import React from "react";

const Footer = () => {
  return (
    <div className="w-100 ">
      <footer className="bg-light text-center text-white" >
        {/* Grid container */}
        <div className="w-100 p-4 pb-2" style={{ backgroundColor: "#cccccc" }}>
          {/* Section: Social media */}
          <section className="mb-3 d-flex flex-wrap justify-content-center gap-2 gap-md-3">
            {/* Facebook */}
            <a
              className="btn btn-primary m-1 mx-2"
              style={{ backgroundColor: "#3b5998", borderRadius: "50%",
  width: "3em",
  height: "3em",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center", borderColor: "#cccccc" }}
              href="#!"
              role="button"
            >
              <i className="fab fa-facebook-f"></i>
            </a>

            {/* Twitter */}
            <a
              className="btn btn-primary m-1 mx-3"
              style={{ backgroundColor: "#55acee", borderRadius: "50%",
  width: "3em",
  height: "3em",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center", borderColor: "#cccccc" }}
              href="#!"
              role="button"
            >
              <i className="fab fa-twitter"></i>
            </a>

            {/* gmail */}
            <a
              className="btn btn-primary m-1 mx-3"
              style={{ backgroundColor: "#D44638", borderRadius: "50%",
  width: "3em",
  height: "3em",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center", borderColor: "#cccccc" }}
              href="#!"
              role="button"
            >
              <i className="far fa-envelope"></i>
            </a>

            {/* Instagram */}
            <a
              className="btn btn-primary m-1 mx-3"
              style={{ backgroundColor: "#C13584", borderRadius: "50%",
  width: "3em",
  height: "3em",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center", borderColor: "#cccccc" }}
              href="#!"
              role="button"
            >
              <i className="fab fa-instagram"></i>
            </a>

            {/* Linkedin */}
            <a
              className="btn btn-primary m-1 mx-3"
              style={{ backgroundColor: "#0082ca", borderRadius: "50%",
  width: "3em",
  height: "3em",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center", borderColor: "#cccccc" }}
              href="#!"
              role="button"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>

            {/* Github */}
            <a
              className="btn btn-primary m-1 mx-3"
              style={{ backgroundColor: "#333333", borderRadius: "50%",
  width: "3em",
  height: "3em",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center", borderColor: "#cccccc" }}
              href="#!"
              role="button"
            >
              <i className="fab fa-github"></i>
            </a>
          </section>
          {/* Section: Social media */}
        </div>
        {/* Grid container */}

        {/* Copyright */}
        <div
          className="text-center p-3"
          style={{ backgroundColor: "#a6a6a6" }}
        >
          © 2020 Copyright:
          <a className="text-white" href="https://mdbootstrap.com/">
            MDBootstrap.com
          </a>
        </div>
        {/* Copyright */}
      </footer>
    </div>
  );
};

export default Footer;
