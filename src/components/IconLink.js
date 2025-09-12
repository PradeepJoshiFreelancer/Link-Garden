import React from "react";
import "./IconLink.css";
export default function IconLink({ icon, title, onClick }) {
  return (
    <span
      className="icon-link"
      role="button"
      tabIndex={0}
      title={title}
      onClick={onClick}
      style={{ marginLeft: 8, cursor: "pointer", color: "#2186ed" }}
    >
      {icon}
    </span>
  );
}
