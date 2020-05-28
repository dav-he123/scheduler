import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial); //useState used set initial mode

  const [history, setHistory] = useState([initial]); //useState used too keep track of history state

  function transition(mode, result = false) {
    //function takes in a new mode to update the state of mode
    if (result) {
      const historyResult = history.slice(0, history.length - 1);
      setHistory((prev) => [...historyResult, mode]);
    } else {
      setHistory((prev) => [...history, mode]);
    }
    setMode(mode);
  }

  function back() {
    // function implemented to be able to go back to previous mode
    if (history.length > 1) {
      const historyResult = history.slice(0, history.length - 1);
      setMode(historyResult[historyResult.length - 1]);
      setHistory(historyResult);
    } else {
      setMode(initial);
    }
  }

  return { mode, transition, back };
}
