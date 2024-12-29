import React, { useRef, useState } from "react";
import AddComment from "./components/AddComment";
import Comments from "./container/Comments";
import Post from "./components/Post";
import "./App.css";
import Rate from "./components/Rate";
function App() {
  const [nameValue, setNameValue] = useState("");
  const ref = useRef(null);

  const setName = (value) => {
    setNameValue(value);
  }

  return (
    <div className="app">
      <Post />
      <Rate />
      <AddComment setName={setName} refElement={ref} nameValue={nameValue} />
      <Comments refElement={ref} setName={setName} />
    </div>
  );
}

export default App;
