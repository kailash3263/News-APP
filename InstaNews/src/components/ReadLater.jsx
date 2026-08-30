import React, { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import NavBar from "./NavBar";
import Footer from "./footer";
import Toast from "bootstrap/js/dist/toast";

const ReadLaterNews = () => {
  const [readLaterArticles, setReadLaterArticles] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleDelete = async(id)=>{
    try{
      const response = await fetch(
        `http://localhost:5000/api/articles/delete-bookmarked-article/${encodeURIComponent(id)}`,
        {
          method:"delete"
        }
      );
       if (response.ok) {
        setReadLaterArticles((prevArticles) =>
        prevArticles.filter((article) => article._id !== id)
      );
        showToast("Deleted");
        return;
      }else{
        showToast("failed to Delete");
      }
    }catch(err){
      console.error(err)
    }
  }


  useEffect(() => {
    const fetchBookmarkedArticles = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/articles/bookmarked",
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          console.error(data.message);
          setReadLaterArticles([]);
          return;
        }

        setReadLaterArticles(data);
      } catch (error) {
        console.error("Error fetching bookmarked articles:", error);
        setReadLaterArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarkedArticles();
  }, []);

  return (
    <>
      <NavBar onSearch={() => {}} />
    
      <div className="container mt-5">
        <h3 className="text-center display-4 mb-4">
          <b>Read Later</b>
        </h3>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : readLaterArticles.length === 0 ? (
          <p className="text-center">
            No bookmarked articles yet.
          </p>
        ) : (
          <div className="d-flex flex-wrap justify-content-center gap-4">
            {readLaterArticles.map((article) => (
              <NewsCard
                key={article._id}
                _id={article._id}
                title={article.title}
                imageUrl={article.image_url}
                sourceName={article.source_name || article.source}
                link={article.link}
                pubDate={article.pubDate || article.publishedAt}
                NewsDescription={article.description}
                showActionIcons={false}
                showDeleteButton = {true}
                onDelete = {handleDelete}
              />
            ))}
          </div>
        )}
      </div>
              <div
        id="liveToast"
        className="toast position-fixed bottom-0 end-0 mb-3 me-3 bg-danger"
        style={{ zIndex: "999999" }}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-body"></div>
      </div>
      <Footer />
    </>
  );
};

export default ReadLaterNews;