import React, { useState, useEffect } from "react";
import { GoogleGenAI } from "@google/genai";
import geminiLogo from "./geminiLogo.png";

const AISummaryModal = ({ show, handleClose, url, newsTitle,discription }) => {
  const [loading, setLoading] = useState(true);
  const [displayedText, setDisplayedText] = useState("");
  const [fullText, setFullText] = useState("");

  // Function to clean extracted text
  function cleanExtractedText(rawText) {
    const garbagePatterns = [
      /also read/i,
      /advertisement/i,
      /read more/i,
      /subscribe/i,
      /newsletter/i,
      /comments/i,
      /publications|education|distribution|events|television|gaming/i,
      /follow us/i,
      /share this/i,
      /click here/i,
      /listen to story/i,
      /watch now/i,
      /^\s*$/, // blank lines
    ];

    const MIN_LINE_LENGTH = 40;
    const MAX_CHARACTERS = 4000;

    const lines = Array.isArray(rawText) ? rawText : rawText.split("\n");

    const cleaned = lines
      .map((line) => line.trim())
      .filter(
        (line) =>
          line.length >= MIN_LINE_LENGTH &&
          !garbagePatterns.some((pattern) => pattern.test(line))
      )
      .join("\n\n");

    return cleaned.slice(0, MAX_CHARACTERS);
  }

  // Function to extract all text from a URL
  async function extractAllText(url) {
    const proxyUrl = `https://app.scrapingbee.com/api/v1/?api_key=GBI9ZYYQW6J0ORLF9YWRM8T2HYVP2KJZSQ3KG577WP25QO3VQ1ELIS3UJYMK5UA96ENYBBGHMI6WQT0N&url=${encodeURIComponent(url)}`;
    
    try {
      const response = await fetch(proxyUrl);
      const html = await response.text(); // 👈 Use text instead of json
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
  
      const elements = doc.querySelectorAll("h1, h2, h3, p");
      let text = Array.from(elements)
        .map((el) => el.textContent.trim())
        .filter(Boolean)
        .join("\n\n");
  
      let cleanedtt = cleanExtractedText(text);
  
      console.log("text from url: " + cleanedtt + "\ntext finish from url\n");
  
      if (!cleanedtt || cleanedtt.length < 150) {
        cleanedtt = discription || newsTitle;
      }
  
      return cleanedtt;
    } catch (err) {
      console.error("Error extracting:", err);
      return discription || newsTitle;
    }
  }
  

  // Function to call the Gemini API
  // const ai = new GoogleGenAI({ apiKey: "AIzaSyCXMWTKolfnWjHwJ6CekGsCvX8LYRWpkzs" });

  const [reply, setReply] = useState("");

  async function geminiApi(content) {
    // useEffect(() => {
      const ai = new GoogleGenAI({ apiKey: "AIzaSyBilyRG7jAEqcStdRKE-I1ksZjBopcOSBQ" });
      try {
        const response = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: content,
        }); 

        console.log( "reply from gemini api "+response.text + 'text finished from gemini api')  
        // setReply(response.text);
        console.log("API call successful");
        return response.text;

      } catch (error) {
        console.error("Error fetching AI explanation:", error);
        setReply("Error fetching response.");
      }
      // main();
    // }, []);
  // console.log( 'response from geminin api ', reply)
    // return reply;
    // return response.text;
  }

  // Fetch and process data when the modal is shown
  useEffect(() => {
    if (show) {
      setLoading(true);
      setDisplayedText("");

      const processSummary = async () => {
        const cleanedText = await extractAllText(url);
      
        if (cleanedText) {
          const fullPrompt = `Title: ${newsTitle}

The following text was extracted from a news website and may contain unrelated sections like ads, navigation links, or promotional lines.

Ignore all irrelevant content and summarize only the part that relates to the actual news based on the given title. Focus on extracting the core news information — what happened, where, when, and who was involved.

Be concise and ignore any unrelated phrases or web content in very simple and easy to understanding words.  Start your answer directly explaining the content.

Text extracted from website:
${cleanedText}`;
          
          // console.log(fullPrompt)
          // let fullPrompt2 = 'explain me what pythogaras theroem '
          let aiResponse  =  await geminiApi(fullPrompt);
          setFullText(aiResponse);
        } else {

          setFullText("Unable to extract text from the provided URL.");
        }

        setLoading(false);
      };

      processSummary();
    }
  }, [show, url, newsTitle]);

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
            <h5 className="modal-title">{newsTitle}</h5>
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