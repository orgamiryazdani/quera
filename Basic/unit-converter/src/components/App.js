import React, { useCallback, useState } from "react";
import Select from "./Select";
import Input from "./Input";
import { units } from "../units";

function App() {
  const [result, setResult] = useState(0);
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(1);
  const [value, setValue] = useState(0);

  const Calculate = useCallback(() => {
    setResult(value * from / to);
  }, [value, to, from])

  return (
    <>
      <div className="converter-form">
        {/* Input with label "Amount" here */}
        <Input onChange={(e) => setValue(e.target.value)} label="Amount" />
        <div className="row">
          {/* Selects with labels "From" and "To" here */}
          <Select onChange={(e) => setFrom(e.target.value)} label="From" items={units} />
          <Select onChange={(e) => setTo(e.target.value)} label="To" items={units} />
          <button onClick={Calculate}>Convert</button>
        </div>
      </div>
      <div id="result">
        Result is: <span data-testid="result">{result}</span>
      </div>
    </>
  );
}

export default App;