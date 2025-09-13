import React, { useState } from "react";
import { bookmarksToJSON } from "bookmarks-to-json";

function BookmarkExtractor() {
  const [jsonOutput, setJsonOutput] = useState(null);
  const [error, setError] = useState(null);

  function handleFileUpload(event) {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const htmlContent = e.target.result;
      try {
        let parsed = bookmarksToJSON(htmlContent);

        console.log(parsed);

        // Transform parsed output to required JSON format
        const transformed = transformToRequiredFormat(parsed);

        setJsonOutput(transformed);
        setError(null);
      } catch (err) {
        setError("Failed to parse bookmarks file");
        setJsonOutput(null);
      }
    };

    reader.readAsText(file);
  }

  // Recursive function to transform bookmarks-to-json structure
  // to desired structure [{heading, links: [{label, url}]}]
  function transformToRequiredFormat(bookmarkNodes) {
    let result = [];

    for (const node of bookmarkNodes) {
      if (node.type === "folder") {
        console.log("Inide Folder");

        let heading = node.name || "New Table";
        let links = [];

        if (Array.isArray(node.children)) {
          // Filter bookmarks inside this folder
          links = node.children
            .filter((child) => child.type === "bookmark")
            .map((bookmark) => ({
              label: bookmark.name,
              url: bookmark.url,
            }));

          // Check for nested folders and flatten them as separate headings
          const nestedFolders = node.children.filter(
            (child) => child.type === "folder"
          );
          if (nestedFolders.length > 0) {
            const nestedTransformed = transformToRequiredFormat(nestedFolders);
            result = result.concat(nestedTransformed);
          }
        }
        result.push({ heading, links });
      } else {
        console.log("Inide else");
        console.log(node);
      }
    }

    return result;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Bookmark Extractor (Using bookmarks-to-json)</h2>
      <input
        type="file"
        accept=".html"
        onChange={handleFileUpload}
        style={{ marginBottom: "20px" }}
      />
      {error && <div style={{ color: "red" }}>{error}</div>}
      {jsonOutput && (
        <>
          <h3>Extracted Bookmarks JSON</h3>
          <pre>{JSON.stringify(jsonOutput, null, 2)}</pre>
        </>
      )}
    </div>
  );
}

export default BookmarkExtractor;
