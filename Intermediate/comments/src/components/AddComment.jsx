import React from "react";
import SelectBox from "./SelectBox";
// import SelectBox from "./SelectBox";
function AddComment({ nameValue, refElement, setName }) {
  return (
    <div ref={refElement} className="ac-wrapper">
      <h2 className="addCommentTitle">Write your comment{nameValue ? " " + nameValue : ""}: </h2>
      <form action="" className="form">
        <input placeholder="name" type="text" />
        <input placeholder="email" type="text" />
        {/* SelectBox */}
        {!nameValue &&
          <SelectBox />
        }
        <textarea
          placeholder="message..."
          name=""
          id=""
          cols="30"
          rows="10"
        ></textarea>
        <button>Send</button>
        {/* Cancel Button */}
        {nameValue &&
          <button onClick={() => setName('')}>cancel</button>
        }
      </form>
    </div>
  );
}

export default AddComment;
