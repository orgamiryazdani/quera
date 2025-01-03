import React from "react";

function OrderbookHeader() {
  return (
    <div className="header">
      <div className="header-row1">
        <h2>Sell</h2>
        <h2>Buy</h2>
      </div>
      <div className="header-row2">
        <span>Total (SAT)</span>
        <span>Amount (SAT)</span>
        <span>PRICE (RIAL)</span>
        <span>Amount (SAT)</span>
        <span>Total (SAT)</span>
      </div>
    </div>
  );
}

export default OrderbookHeader;
