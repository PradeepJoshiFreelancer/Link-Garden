import React, { useState } from "react";
import TextBox from "./TextBox";
import Button from "./Button";
import IconLink from "./IconLink";
import "./TableCard.css";

const randomHeaderColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 90%, 85%)`;
};

function isValidURL(str) {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

export default function TableCard({
  heading,
  links,
  onChangeHeading,
  onAddLink,
  onUpdateLink,
  onDeleteLink,
  onDeleteTable,
}) {
  const [newLabel, setNewLabel] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [editingIdx, setEditingIdx] = useState(-1);
  const [editLabel, setEditLabel] = useState("");
  const [editUrl, setEditUrl] = useState("");

  const headerStyle = { background: randomHeaderColor() };

  return (
    <div className="table-card">
      <div className="heading-row" style={headerStyle}>
        <TextBox value={heading} onChange={onChangeHeading} />
        <Button onClick={onDeleteTable}>Delete Table</Button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Links</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link, idx) =>
            editingIdx === idx ? (
              <tr key={idx}>
                <td>
                  <TextBox value={editLabel} onChange={setEditLabel} />
                  <TextBox
                    value={editUrl}
                    onChange={setEditUrl}
                    placeholder="URL"
                  />
                </td>
                <td className="actions-cell">
                  <IconLink
                    icon="💾"
                    title="Save"
                    onClick={() => {
                      if (!editLabel.trim()) {
                        alert("Label cannot be empty");
                        return;
                      }
                      if (!isValidURL(editUrl)) {
                        alert("Please enter a valid URL");
                        return;
                      }
                      onUpdateLink(idx, editLabel, editUrl);
                      setEditingIdx(-1);
                    }}
                  />
                  <IconLink
                    icon="❌"
                    title="Cancel"
                    onClick={() => setEditingIdx(-1)}
                  />
                </td>
              </tr>
            ) : (
              <tr key={idx}>
                <td>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label-link"
                  >
                    {link.label}
                  </a>
                </td>
                <td className="actions-cell">
                  <IconLink
                    icon="✏️"
                    title="Edit"
                    onClick={() => {
                      setEditingIdx(idx);
                      setEditLabel(link.label);
                      setEditUrl(link.url);
                    }}
                  />
                  <IconLink
                    icon="🗑️"
                    title="Delete"
                    onClick={() => onDeleteLink(idx)}
                  />
                </td>
              </tr>
            )
          )}
          <tr>
            <td>
              <TextBox
                value={newLabel}
                onChange={setNewLabel}
                placeholder="New Label"
              />
              <TextBox
                value={newUrl}
                onChange={setNewUrl}
                placeholder="New URL"
              />
            </td>
            <td className="actions-cell">
              <IconLink
                icon="➕"
                title="Add"
                onClick={() => {
                  if (!newLabel.trim()) {
                    alert("Label cannot be empty");
                    return;
                  }
                  if (!isValidURL(newUrl)) {
                    alert("Please enter a valid URL");
                    return;
                  }
                  onAddLink(newLabel, newUrl);
                  setNewLabel("");
                  setNewUrl("");
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
