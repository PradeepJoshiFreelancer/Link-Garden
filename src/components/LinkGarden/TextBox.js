import React from "react";
import "./TextBox.css";
export default function TextBox({ value, onChange, placeholder, disabled }) {
  return (
    <input
      className="textbox"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
}
