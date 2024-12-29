import { AiOutlineStar as StartIconEmpty } from "react-icons/ai";
import { AiFillStar as StartIconFull } from "react-icons/ai";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Rate() {
  const [star, setStar] = useState([
    { id: 1, hover: false, clicked: false },
    { id: 2, hover: false, clicked: false },
    { id: 3, hover: false, clicked: false },
    { id: 4, hover: false, clicked: false },
    { id: 5, hover: false, clicked: false },
  ]);

  const hoverHandler = (id) => {
    let hoverData = star.map((item) => {
      return item.id <= id
        ? { ...item, hover: true }
        : { ...item, hover: false };
    });
    setStar(hoverData);
  };

  const blurHandler = () => {
    const blurData = star.map((item) => {
      return { ...item, hover: false };
    });
    setStar(blurData);
  };

  const submitRateHandler = async (id) => {
    // IF Request Error
    // toast.error(message, {
    //     position: "top-left",
    //   });
    // ===============================
    // IF Request Success
    // toast.success(message, {
    //     position: "top-left",
    //   });
    let hoverData = star.map((item) => {
      return item.id <= id
        ? { ...item, clicked: true }
        : { ...item, clicked: false };
    });
    setStar(hoverData);
    const response = await fetch("http://127.0.0.1:8000/posts/", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rate: id }),
    });
    const data = await response.json();
    console.log(data);

    if (data.status === 'success') {
      toast.success(data.message, {
        position: "top-left",
      });
    } else if (data.status === 'error') {
      stepBackward(data.rate)
      toast.error(data.message, {
        position: "top-left",
      });
    }
  };

  const stepBackward = (rate) => {
    // Your code ...
    let hoverData = star.map((item) => {
      return item.id <= rate
        ? { ...item, clicked: true }
        : { ...item, clicked: false };
    });
    setStar(hoverData);
  };

  return (
    <>
      <div className="rate-box">
        <h1>Rate : </h1>
        <div className="rate-container">
          {star.map((item) => (
            <div
              className="rate"
              key={item.id}
              onMouseEnter={() => hoverHandler(item.id)}
              onMouseLeave={blurHandler}
              onClick={() => submitRateHandler(item.id)}
            >
              {item.clicked || item.hover ? (
                <StartIconFull />
              ) : (
                <StartIconEmpty />
              )}
            </div>
          ))}
        </div>
      </div>
      <hr />
      <ToastContainer />
    </>
  );
}

export default Rate;
