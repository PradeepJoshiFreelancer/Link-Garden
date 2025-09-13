import React from "react";
import "./BookmarkUploader.css";

export default function BookmarkUploader({ setJsonOutput, setError }) {
  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const htmlContent = e.target.result;
      try {
        const parsedJson = parseBookmarksHtml(htmlContent);
        setJsonOutput(parsedJson);
        setError(null);
      } catch (err) {
        setError("Error parsing bookmarks HTML: " + err.message);
        setJsonOutput(null);
      }
    };
    reader.readAsText(file);
  }

  function parseBookmarksHtml(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const folderHeaders = Array.from(doc.querySelectorAll("H3"));
    const results = [];

    folderHeaders.forEach((header) => {
      const heading = header.textContent || "New Table";
      let dl = header.nextElementSibling;
      while (dl && dl.tagName !== "DL") dl = dl.nextElementSibling;
      const links = dl ? extractLinksFromDL(dl) : [];
      results.push({ heading, links });
    });

    return results;
  }

  function extractLinksFromDL(dl) {
    const links = [];
    const dtNodes = Array.from(dl.children).filter(
      (child) => child.tagName === "DT"
    );

    dtNodes.forEach((dt) => {
      const aTag = dt.querySelector("A");
      if (aTag) {
        links.push({
          label: aTag.textContent || "No Label",
          url: aTag.href || "",
        });
      }
    });

    return links;
  }

  return (
    <div className="uploader-container">
      <label htmlFor="bookmark-upload" className="upload-label">
        Choose bookmark HTML file to upload
      </label>
      <input
        type="file"
        id="bookmark-upload"
        accept=".html"
        onChange={handleFileUpload}
        className="file-input"
      />
    </div>
  );
}
