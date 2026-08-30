import React from "react";

const Footer = () => {
  return (
    <div className="w-100">
      <footer className="site-footer text-center text-white">
        {/* Grid container */}
        <div className="w-100 p-4 pb-2">
          {/* Section: Social media */}
          <section className="mb-3 d-flex flex-wrap justify-content-center gap-2 gap-md-3">
            {/* Facebook */}
            <a
              className="btn btn-primary social-link m-1 mx-2"
              style={{
                backgroundColor: "#3b5998",
                borderRadius: "50%",
                width: "3em",
                height: "3em",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderColor: "transparent",
              }}
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              role="button"
            >
              <i className="fab fa-facebook-f"></i>
            </a>

            {/* Twitter (X) */}
            <a
              className="btn btn-primary social-link m-1 mx-3"
              style={{
                backgroundColor: "#55acee",
                borderRadius: "50%",
                width: "3em",
                height: "3em",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderColor: "transparent",
              }}
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              role="button"
            >
              <i className="fab fa-twitter"></i>
            </a>

            {/* Gmail */}
            <a
              className="btn btn-primary social-link m-1 mx-3"
              style={{
                backgroundColor: "#D44638",
                borderRadius: "50%",
                width: "3em",
                height: "3em",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderColor: "transparent",
              }}
              href="#"
              role="button"
            >
              <i className="far fa-envelope"></i>
            </a>

            {/* Instagram */}
            <a
              className="btn btn-primary social-link m-1 mx-3"
              style={{
                backgroundColor: "#C13584",
                borderRadius: "50%",
                width: "3em",
                height: "3em",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderColor: "transparent",
              }}
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              role="button"
            >
              <i className="fab fa-instagram"></i>
            </a>

            {/* Linkedin (placeholder since not provided) */}
            <a
              className="btn btn-primary social-link m-1 mx-3"
              style={{
                backgroundColor: "#0082ca",
                borderRadius: "50%",
                width: "3em",
                height: "3em",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderColor: "transparent",
              }}
              href="https://www.linkedin.com/in/kailash-choudhary-517aa6198?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              role="button"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>

            {/* Github */}
            <a
              className="btn btn-primary social-link m-1 mx-3"
              style={{
                backgroundColor: "#333333",
                borderRadius: "50%",
                width: "3em",
                height: "3em",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderColor: "transparent",
              }}
              href="https://github.com/kailash3263/News-APP.git"
              target="_blank"
              rel="noopener noreferrer"
              role="button"
            >
              <i className="fab fa-github"></i>
            </a>
          </section>
        </div>

        {/* Copyright */}
        <div className="text-center p-3" style={{ backgroundColor: "#a6a6a6" }}>
          © 2025 News App by&nbsp;
          <a
            className="text-white"
            href="https://github.com/kailash3263"
            target="_blank"
            rel="noopener noreferrer"
          >
            Kailash Choudhary
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
