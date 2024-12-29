import { useEffect, useState, useRef } from "react";

function SelectBox() {
  const [topicList, setTopicList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const isUserChange = useRef(false);
  const boxRef = useRef(null);

  useEffect(() => {
    if (!isUserChange.current) return;

    const getTopicList = async () => {
      if (inputValue.trim() === "" || !inputValue.trim()) {
        setTopicList([]);
        return;
      }
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/?search=${encodeURIComponent(inputValue.trim())}`
        );
        const { data } = await response.json();
        setTopicList(data.matchedTechs);
      } catch (error) {
        console.error("Error fetching topic list:", error);
      }
    };

    getTopicList();
    isUserChange.current = false;
  }, [inputValue]);

  const closeStyle = {
    padding: 0,
    height: 0,
    overflow: "hidden",
  };

  const itemHandler = (name) => {
    setInputValue(name);
    setTopicList([]);
    isUserChange.current = false;
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    isUserChange.current = true;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setTopicList([]);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={boxRef} className="c-box">
      <input
        value={inputValue}
        onChange={handleInputChange}
        className="tpc"
        placeholder="topic"
        type="text"
      />
      <div
        style={topicList.length < 1 ? closeStyle : null}
        className="c-selectbox"
      >
        {topicList.map((topic) => (
          <div
            onClick={() => itemHandler(topic.name)}
            key={topic.id}
            className="item"
          >
            <label htmlFor={topic.id}>{topic.name}</label>
            <input type="radio" name="" id={topic.id} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectBox;
