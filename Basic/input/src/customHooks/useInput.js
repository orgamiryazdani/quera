import { useState } from "react";

const useInput = (initialValue) => {

  // control state here
  // return value and onChange to handle state
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value)
  };

  return {
    value,
    onChange,
  };
};

export default useInput;
