import React from "react";
import "./Button.css";
export default function Button({
  children,
  onClick,
  type = "button",
  asLabelHtmlFor,
}) {
  if (asLabelHtmlFor)
    return (
      <label className="button" htmlFor={asLabelHtmlFor} style={{ margin: 0 }}>
        {children}
      </label>
    );
  return (
    <button className="button" type={type} onClick={onClick}>
      {children}
    </button>
  );
}
