import React, { useReducer, useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function App() {
  const [state, actions] = useCountReducer();
  const value = useFormInput(0);
  return (
    <div className="App">
      <input {...value} />
      <button onClick={actions.set(value.value)}>SET</button>
      <div>
        <button disabled={!state.isValid} onClick={actions.inc}>
          +
        </button>
        <h2>{state.count}</h2>
        <button disabled={!state.isValid} onClick={actions.dec}>
          -
        </button>
      </div>
    </div>
  );
}

const useCountReducer = (initialState = { count: 1, isValid: true }) => {
  const INC = "INC";
  const DEC = "DEC";
  const SET = "SET";
  const CLR = "CLR";

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case INC:
        return { ...state, count: state.count + 1 };
      case DEC:
        return { ...state, count: state.count - 1 };
      case SET:
        return { ...state, count: +action.value, isValid: true };
      case CLR:
        return { ...state, count: "Put number", isValid: false };
      default:
        return state;
    }
  }, initialState);

  const actions = {
    inc: () => dispatch({ type: INC }),
    dec: () => dispatch({ type: DEC }),
    set: value => () =>
      isNaN(+value) ? dispatch({ type: CLR }) : dispatch({ type: SET, value })
  };

  return [state, actions];
};

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const onChange = event => {
    setValue(event.target.value);
  };

  return {
    value,
    onChange
  };
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
