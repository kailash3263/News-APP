import React from "react";
import { createPortal } from "react-dom";
import Toast from 'bootstrap/js/dist/toast';
const ShareModal = ({ article ,show, setShow}) => {
  const handleClose = ()=>{
    setShow(false);
  }
  const showToast = (message) => {
    const toastElements = document.querySelectorAll("#liveToast");
    if (toastElements.length > 1) {
      toastElements.forEach((element, index) => {
        if (index < toastElements.length - 1) element.remove();
      });
    }
    const toastElement = document.getElementById("liveToast");
    if (!toastElement) return;

    const toastBody = toastElement.querySelector(".toast-body");
    if (!toastBody) return;
    
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
  if(!show) return;
  return createPortal(
    <>
      <div
        className="modal fade show d-block share-modal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="shareModalLabel"
        aria-modal="true"
      >
        <div className="modal-dialog modal-dialog-centered share-modal__dialog">
          <div className="modal-content share-modal__content">
            <div className="modal-header share-modal__header">
              <div>
                <span className="share-modal__eyebrow">Send this story</span>
                <h5 className="modal-title" id="shareModalLabel">
                  Share article
                </h5>
              </div>
              <button
                type="button"
                className="btn-close share-modal__close"
                onClick={handleClose}
                aria-label="Close share options"
              ></button>
            </div>
            <div className="modal-body share-modal__body">
              <div className="share-modal__options">
                <button
                  type="button"
                  className="share-modal__option"
                  onClick={shareToLinkedIn}
                >
                  <i className="fab fa-linkedin share-modal__icon share-modal__icon--linkedin"></i>
                  <span>Share to LinkedIn</span>
                  <i className="fas fa-arrow-up-right-from-square share-modal__arrow"></i>
                </button>
                <button
                  type="button"
                  className="share-modal__option"
                  onClick={shareToTwitter}
                >
                  <i className="fab fa-twitter share-modal__icon share-modal__icon--twitter"></i>
                  <span>Share to X</span>
                  <i className="fas fa-arrow-up-right-from-square share-modal__arrow"></i>
                </button>
                <button
                  type="button"
                  className="share-modal__option"
                  onClick={shareToWhatsApp}
                >
                  <i className="fab fa-whatsapp share-modal__icon share-modal__icon--whatsapp"></i>
                  <span>Share to WhatsApp</span>
                  <i className="fas fa-arrow-up-right-from-square share-modal__arrow"></i>
                </button>
                <button
                  type="button"
                  className="share-modal__option"
                  onClick={shareViaEmail}
                >
                  <i className="fas fa-envelope share-modal__icon share-modal__icon--email"></i>
                  <span>Share via Email</span>
                  <i className="fas fa-arrow-up-right-from-square share-modal__arrow"></i>
                </button>
                <button
                  type="button"
                  className="share-modal__option"
                  onClick={copyLinkToClipboard}
                >
                  <i className="fas fa-link share-modal__icon share-modal__icon--link"></i>
                  <span>Copy link</span>
                  <i className="fas fa-copy share-modal__arrow"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" onClick={handleClose}></div>
    </>,
    document.body
  );
};

export default ShareModal;
