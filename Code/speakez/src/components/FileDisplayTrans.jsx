import React, { useState } from "react";
import { AiOutlineCopy } from "react-icons/ai";
import "./FileDisplayTrans.css";
import { ALL_LANGUAGES } from "./LanguageSelection";

export default function FileDisplayTrans({ result }) {
  const [toLanguage, setToLanguage] = useState("Select language");
  const [transcribedCopyStatus, setTranscribedCopyStatus] = useState(false);
  const [translatedCopyStatus, setTranslatedCopyStatus] = useState(false);
  const transcribedText =
    result?.text ||
    (Array.isArray(result) && result.length > 0 ? result[0]?.text : "");

  const copyToClipboard = (text, setCopyStatus) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopyStatus(true); // Show "Copied!" text
        setTimeout(() => setCopyStatus(false), 2000); // Hide "Copied!" after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy: ", err); // Handle error
      });
  };

  const downloadTranslatedText = () => {
    const element = document.createElement("a");
    const file = new Blob(
      [
        /* translated text here */
      ],
      { type: "text/plain" }
    );
    element.href = URL.createObjectURL(file);
    element.download = "translated_text.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="FileDisplayTrans">
      <section className="translator">
        {/* Transcribed Section */}
        <div className="transcribedSection">
          <div className="top-row">
            <button className="sign-in-button">Translate</button>
          </div>
          <form className="transcription-box">
            <div className="text-boxes">
              <div className="text-box-container">
                <textarea
                  className="text-box"
                  value={transcribedText}
                  readOnly
                />
                <div className="inside-copy">
                  {transcribedCopyStatus ? (
                    <span>Copied!</span>
                  ) : (
                    <AiOutlineCopy
                      className="copy-icon"
                      onClick={() =>
                        copyToClipboard(
                          transcribedText,
                          setTranscribedCopyStatus
                        )
                      }
                      style={{
                        cursor: "pointer",
                        fontSize: "20px",
                        marginLeft: "5px",
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Translated Section */}
        <div className="translatedSection">
          <div className="top-row">
            <select
              value={toLanguage}
              className="Select-language-button"
              onChange={(event) => setToLanguage(event.target.value)}
            >
              <option value={"Select language"}>Select language</option>
              {Object.entries(ALL_LANGUAGES).map(([key, value]) => (
                <option key={key} value={value}>
                  {key}
                </option>
              ))}
            </select>
          </div>
          <div className="text-boxes">
            <div className="text-box-container">
              <textarea className="text-box translate-box" readOnly>
                Select Language
              </textarea>
              <div className="inside-copy">
                {translatedCopyStatus ? (
                  <span>Copied!</span>
                ) : (
                  <AiOutlineCopy
                    className="copy-icon"
                    onClick={() =>
                      copyToClipboard(
                        "Select Language",
                        setTranslatedCopyStatus
                      )
                    }
                    style={{
                      cursor: "pointer",
                      fontSize: "20px",
                      marginLeft: "5px",
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Button */}
      <div className="download-button-container">
        <button className="download-button" onClick={downloadTranslatedText}>
          Download Translated Text
        </button>
      </div>
    </div>
  );
}
