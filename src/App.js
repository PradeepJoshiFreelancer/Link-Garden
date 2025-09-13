import React, { useState } from "react";
import "./App.css";
import BookmarkUploader from "./components/BookmarkExtractor/BookmarkUploader";
import BookmarkOutput from "./components/BookmarkExtractor/BookmarkOutput";
import LinkGardenContainer from "./components/LinkGarden/LinkGardenContainer";

function App() {
  const [activeTab, setActiveTab] = useState(1);
  const [jsonOutput, setJsonOutput] = useState(null);
  const [error, setError] = useState(null);

  //Extractor supporting methods
  function renderTabContent() {
    if (activeTab === 1) {
      return (
        <div className="tab-content">
          <LinkGardenContainer />
        </div>
      );
    } else if (activeTab === 2) {
      return (
        <div className="tab-content">
          <BookmarkUploader setJsonOutput={setJsonOutput} setError={setError} />
          {error && <p className="error">{error}</p>}
          {jsonOutput && <BookmarkOutput jsonOutput={jsonOutput} />}
        </div>
      );
    }
  }

  return (
    <div className="app-container">
      <h1 className="title">
        {activeTab === 1
          ? "Link Tables Manager"
          : "Bookmark Extractor - HTML to JSON"}
      </h1>
      <div className="tabs">
        <button
          className={activeTab === 1 ? "tab active" : "tab"}
          onClick={() => setActiveTab(1)}
        >
          Link Garden
        </button>
        <button
          className={activeTab === 2 ? "tab active" : "tab"}
          onClick={() => setActiveTab(2)}
        >
          Bookmark Extractor
        </button>
      </div>

      {renderTabContent()}
    </div>
  );
}

export default App;
