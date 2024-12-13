import React from "react";

export const TransportLayout = ({ children }) => {
  return (
    <div className="app">
      <div className="app-card">
        <header className="page-top">
          <h2 className="page-title">انتقال وجه کوئرا</h2>
          <img className="logo-img" src="/icons/logo.svg" />
        </header>
        {children}
      </div>
      <p className="ltr quera-pay">Quera Pay</p>
    </div>
  );
};
