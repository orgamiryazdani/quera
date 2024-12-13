import React from "react";

export const Input = ({ label, ...props }) => {
  return (
    <div className="app-input">
      <input className="input" placeholder={label} {...props} />
      <div className="input-icon"></div>
    </div>
  );
};
