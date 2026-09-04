import React, { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import NavBar from "./NavBar";
import Footer from "./footer";
import Toast from "bootstrap/js/dist/toast";

const LikedNews = () => {
  const [likedArticles, setLikedArticles] = useState([]);
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
        `https://instanews-backend.onrender.com/api/articles/delete-liked-article/${encodeURIComponent(id)}`,
        {
          method:"DELETE",
          credentials: "include",
        }
      );
       if (response.ok) {
        setLikedArticles((prevArticles) =>
        prevArticles.filter((article) => article._id !== id)
      );
      console.log("deleted")
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
    const fetchLikedArticles = async () => {
      try {
        const response = await fetch(
          "https://instanews-backend.onrender.com/api/articles/liked",
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        if (!response.ok) {
          console.error(data.message);
          setLikedArticles([]);
          return;
        }
        setLikedArticles(data);
      } catch (error) {
        console.error("Error fetching liked articles:", error);
        setLikedArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedArticles();
  }, []);

  return (
    <>
      <NavBar onSearch={() => {}} />

      <div className="container mt-5">
        <h3 className="text-center display-4 mb-4">
          <b>Liked News</b>
        </h3>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : likedArticles.length === 0 ? (
          <p className="text-center">No liked articles yet.</p>
        ) : (
          <div className="d-flex flex-wrap justify-content-center gap-4">
            {likedArticles.map((article) => (
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

export default LikedNews;