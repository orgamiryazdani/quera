import { useReducer } from "react";
import "./App.css";

const borderActiveStepStyle = {
  border: "5px solid rgb(70, 92, 216)"
}

const borderDisabledStepStyle = {
  border: "5px solid gray"
}

const bgActiveStyle = {
  backgroundColor: "rgb(70, 92, 216)"
}

const bgDisabledStyle = {
  backgroundColor: "gray"
}

function App() {
  const [state, dispatch] = useReducer(reducer, { step: 1 })

  function reducer(state, action) {
    if (action.type === 'incremented_step') {
      return {
        step: state.step - 1
      };
    } else if (action.type === 'increase_step') {
      return {
        step: state.step + 1
      };
    }

  }

  return (
    <div className="container">
      <div className="pages">
        <div style={state.step >= 1 ? borderActiveStepStyle : borderDisabledStepStyle}>1</div>
        <span style={state.step >= 2 ? bgActiveStyle : bgDisabledStyle}></span>
        <div style={state.step >= 2 ? borderActiveStepStyle : borderDisabledStepStyle}>2</div>
        <span style={state.step >= 3 ? bgActiveStyle : bgDisabledStyle}></span>
        <div style={state.step >= 3 ? borderActiveStepStyle : borderDisabledStepStyle}>3</div>
        <span style={state.step >= 4 ? bgActiveStyle : bgDisabledStyle}></span>
        <div style={state.step >= 4 ? borderActiveStepStyle : borderDisabledStepStyle}>4</div>
      </div>
      <div className="btns">
        <button
          disabled={state.step <= 1}
          style={state.step === 1 ? bgDisabledStyle : bgActiveStyle}
          onClick={() => {
            dispatch({ type: 'incremented_step' })
          }}
          data-testid="prevBtn" className="prevBtn">
          Prev
        </button>
        <button
          data-testid="nextBtn"
          disabled={state.step >= 4}
          style={state.step >= 4 ? bgDisabledStyle : bgActiveStyle}
          onClick={() => {
            dispatch({ type: 'increase_step' })
          }}
        >Next</button>
      </div>
    </div>
  );
}

export default App;

