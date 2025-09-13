import React from "react";
import "./BookmarkOutput.css";

export default function BookmarkOutput({ jsonOutput }) {
  function copyToClipboard() {
    navigator.clipboard
      .writeText(JSON.stringify(jsonOutput, null, 2))
      .then(() => {
        alert("JSON copied to clipboard!");
      });
  }

  function downloadJson() {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(jsonOutput, null, 2));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "data.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  return (
    <div className="output-container">
      <h2>Extracted Bookmarks JSON</h2>
      <div className="button-group">
        <button className="btn copy-btn" onClick={copyToClipboard}>
          Copy JSON
        </button>
        <button className="btn download-btn" onClick={downloadJson}>
          Download JSON
        </button>
      </div>
      <pre className="json-output">{JSON.stringify(jsonOutput, null, 2)}</pre>
    </div>
  );
}
