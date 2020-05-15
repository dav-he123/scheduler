import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, result = false) {
    if (result) {
      const historyResult = history.slice(0, history.length - 1);
      setHistory((prev) => [...historyResult, mode]);
    } else {
      setHistory((prev) => [...history, mode]);
    }
    setMode(mode);
  }

  function back() {
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
