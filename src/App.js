import React, { useEffect, useState } from "react";
import TableCard from "./components/TableCard";
import Button from "./components/Button";
import "./App.css";

const LOCAL_STORAGE_KEY = "linkGardenFinalJSON";

const fetchJSON = async () => {
  let cached = null;
  if (typeof window !== "undefined") {
    cached = localStorage.getItem(LOCAL_STORAGE_KEY);
  }

  if (cached) {
    // Step 2: Use localStorage value
    return JSON.parse(cached);
  } else {
    const resp = await fetch("/data.json");
    return resp.json();
  }
};
const saveJSON = async (data) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "data.json";
  a.click();
};

function App() {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    fetchJSON().then(setTables);
  }, []);

  // useEffect(() => {
  //   console.log(2);

  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tables));
  // }, [tables]);

  const handleAddTable = () =>
    setTables([...tables, { heading: "New Table", links: [] }]);
  const handleDeleteTable = (idx) =>
    setTables(tables.filter((_, i) => i !== idx));
  const updateTableHeading = (idx, heading) =>
    setTables((tables) => {
      const copy = [...tables];
      copy[idx].heading = heading;
      return copy;
    });
  const addTableLink = (idx, label, url) =>
    setTables((tables) => {
      const copy = [...tables];
      copy[idx].links.push({ label, url });
      return copy;
    });
  const updateTableLink = (idx, linkIdx, label, url) =>
    setTables((tables) => {
      const copy = [...tables];
      copy[idx].links[linkIdx] = { label, url };
      return copy;
    });
  const deleteTableLink = (idx, linkIdx) =>
    setTables((tables) => {
      const copy = [...tables];
      copy[idx].links.splice(linkIdx, 1);
      return copy;
    });

  // JSON upload handler
  const handleJSONUpload = (e) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (!Array.isArray(data)) throw new Error("JSON should be an array.");
        setTables(data);
        if (typeof window !== "undefined") {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
        }
      } catch {
        alert("Invalid JSON file for this app.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="app-root">
      <h1>Link Tables Manager</h1>
      <div className="controls-row">
        <Button onClick={handleAddTable}>+ Add New Table</Button>
        <Button onClick={() => saveJSON(tables)}>Save JSON</Button>
        <Button asLabelHtmlFor="upload-json-input">Upload JSON</Button>
        <input
          id="upload-json-input"
          type="file"
          accept=".json,application/json"
          style={{ display: "none" }}
          onChange={handleJSONUpload}
        />
      </div>
      <div className="tables-wrap">
        {tables.map((tbl, idx) => (
          <TableCard
            key={idx}
            heading={tbl.heading}
            links={tbl.links}
            onChangeHeading={(heading) => updateTableHeading(idx, heading)}
            onAddLink={(label, url) => addTableLink(idx, label, url)}
            onUpdateLink={(linkIdx, label, url) =>
              updateTableLink(idx, linkIdx, label, url)
            }
            onDeleteLink={(linkIdx) => deleteTableLink(idx, linkIdx)}
            onDeleteTable={() => handleDeleteTable(idx)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
