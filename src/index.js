import React, { useReducer } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function App() {
  const [state, actions] = useCountReducer();

  return (
    <div className="App">
      <button onClick={actions.inc}>+</button>
      <button onClick={actions.dec}>-</button>
      <h2>{state.count}</h2>
    </div>
  );
}

const useCountReducer = (initialState = { count: 1 }) => {
  const INC = "INC";
  const DEC = "DEC";

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case INC:
        return { ...state, count: state.count + 1 };
      case DEC:
        return { ...state, count: state.count - 1 };
      default:
        return state;
    }
  }, initialState);

  const actions = {
    inc: () => dispatch({ type: INC }),
    dec: () => dispatch({ type: DEC })
  };

  return [state, actions];
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
