import React from "react";
import OrderbookHeader from "./components/OrderbookHeader";
import OrderbookListItem from "./components/OrderbookListItem";
import { calculateOrderBookData} from "./functions";

function App({ data }) {
  const { buyData, sellData } = calculateOrderBookData(data);

  return (
    <div className="container">
      <div className="wrapper">
        <OrderbookHeader />
        <div className="table">
          <div className="sell-side side">
            {buyData.map((order, index) => (
              <OrderbookListItem
                key={index}
                index={index}
                type="sell"
                price={order.price}
                amount={order.quantity}
                total={order.total}
                bgWidth={order.bgWidth}
              />
            ))}
          </div>
          <div className="buy-side side">
            {sellData.map((order, index) => (
              <OrderbookListItem
                key={index}
                index={index}
                type="buy"
                price={order.price}
                amount={order.quantity}
                total={order.total}
                bgWidth={order.bgWidth}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
