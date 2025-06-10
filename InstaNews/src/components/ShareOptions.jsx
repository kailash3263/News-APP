import React from "react";
import Toast from 'bootstrap/js/dist/toast';
const ShareModal = ({ article }) => {
  const showToast = (message) => {
    // This will trigger the toast to appear (Bootstrap toast)
    const toastElement = document.getElementById("liveToast");
    const toastBody = toastElement.querySelector(".toast-body"); // Find the toast body
  
    // Set the dynamic message
    toastBody.textContent = message;
    const toast = new Toast(toastElement);

    toast.show();
  };
  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(article.link)}`;
    window.open(url, "_blank");
  };

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(article.link)}`;
    window.open(url, "_blank");
  };

  const shareToWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(article.title)}%0A${encodeURIComponent(article.link)}`;
    window.open(url, "_blank");
  };

  const shareViaEmail = () => {
    const subject = `Check out this article: ${article.title}`;
    const body = `Hi,\n\nI wanted to share this article with you:\n\n${article.title}\n${article.link}\n\nPublished on: ${article.pubDate}`;
    const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
  };

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(article.link)
      .then(() => {
        showToast("Link copied!")
      })
     ;
  };

  return (
    <>
      <div
        className="modal fade rounded-circle"
        id="shareModal"
        tabIndex="-1"
        aria-labelledby="shareModalLabel"
        aria-hidden="true"
      >
        <div className="container modal-dialog modal-dialog-centered">
          <div className="modal-content bg-dark text-white">
            {/* Modal Header */}
            <div className="modal-header border-0 position-relative">
              <h5 className="modal-title w-100 text-center" id="shareModalLabel">
                Share to...
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white ml-0"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <hr className="text-white w-100 my-0" />
            {/* Modal Body */}
            <div className="modal-body">
              <ul className="list-unstyled align-items-center">
                <li
                  className="d-flex align-items-center mb-3 fs-5 justify-content-center"
                  onClick={shareToLinkedIn}
                >
                  <i className="fab fa-linkedin me-3"></i> Share to LinkedIn
                </li>
                <li
                  className="d-flex align-items-center mb-3 fs-5 justify-content-center"
                  onClick={shareToTwitter}
                >
                  <i className="fab fa-twitter me-3"></i> Share to X
                </li>
                <li
                  className="d-flex align-items-center mb-3 fs-5 justify-content-center"
                  onClick={shareToWhatsApp}
                >
                  <i className="fab fa-whatsapp fa-lg me-3"></i> Share to WhatsApp
                </li>
                <li
                  className="d-flex align-items-center mb-3 fs-5 justify-content-center"
                  onClick={shareViaEmail}
                >
                  <i className="fas fa-envelope me-3"></i> Share via Email
                </li>
                <li
                  className="d-flex align-items-center mb-3 fs-5 justify-content-center"
                  onClick={copyLinkToClipboard}
                >
                  <i className="fas fa-link me-3"></i> Copy Link
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShareModal;
