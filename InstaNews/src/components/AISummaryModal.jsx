import React, { useState, useEffect } from "react";
import { GoogleGenAI } from "@google/genai";
import geminiLogo from "./geminiLogo.png";

const AISummaryModal = ({ show, handleClose, URL, newsTitl}) => {
  const [loading, setLoading] = useState(true);
  const [displayedText, setDisplayedText] = useState("");
  const [fullText, setFullText] = useState("");

  // const [reply, setReply] = useState("");
  // Fetch and process data when the modal is shown
  useEffect(() => {
    if (show) {
      console.log("request send to backend",show)
      setLoading(true);
      setDisplayedText("");
      
      const processSummary = async () => {
        const response = await fetch('http://localhost:5000/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: `${URL}`, newsTitle: `${newsTitl}` })
      });
      
      const result = await response.json();
      console.log(result)
        setFullText(result.explanation)
       setLoading(false);
      };
      processSummary()
    }
  }, [URL,show]);

  // Display the text word by word
  useEffect(() => {
    if (!loading && show) {
      let index = 0; // Initialize index
      setDisplayedText(""); // Reset displayed text
      // if(!fullText)
      //   setFullText("The model is overloaded. Please try again later.")
      const words = (fullText || "The model is overloaded. Please try again later.").split(" "); // Split fullText into words 
      console.log(words);

      const typingInterval = setInterval(() => {
        if (index < words.length-1) {
          setDisplayedText(function updateText(prev) {
            let space = " "; // Default: add a space before the word
            if (index === 0) {
              space = ""; // No space before the first word
            }
            if(index=== 2)
            {
               prev = prev + ' ' + words[1];
               console.log(prev) 
            }
            return prev + space + words[index];
          });
          // console.log(index)
          index++; // Increment index after updating the state
        } else {
          clearInterval(typingInterval); // Clear interval when all words are displayed
        }
      }, 150); // Adjust typing speed here (150ms per word)

      return () => clearInterval(typingInterval); // Cleanup interval on unmount
    }
  }, [loading, show, fullText]);
  
  

  if (!show) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        zIndex: "1050",
      }}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        style={{ maxWidth: "800px", width: "90%", margin: "auto" }}
      >
        <div className="modal-content" style={{ maxHeight: "100vh", overflowY: "auto" }}>
          <div className="modal-header">
            <h5 className="modal-title">{newsTitl}</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body d-flex flex-column justify-content-center align-items-center">
            {loading ? (
              <>
              <img
                className="mb-4 animate__animated animate__pulse animate__infinite"
                src={geminiLogo}
                style={{ width: "4.5rem" }}
                alt="Loading"
              />
              <p className= 'text-center' style={{fontSize: '2rem'}}>please wait...</p>
              </>
            ) : (
              <p style={{ fontSize: "1.1rem", textAlign: "justify", padding: "0px" }}>
                {displayedText}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISummaryModal;
