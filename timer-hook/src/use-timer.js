import { useState } from "react"

export function useTimer() {
  const [seconds, setSeconds] = useState(0);

  let timer = setTimeout(() => {
    setSeconds(seconds + 1);
  }, 1000);

  const reset = () => {
    clearTimeout(timer);
    setSeconds(0);
  };

  const stop = () => {
    clearTimeout(timer);
  }

  const resume = () => {
    timer = setTimeout(() => {
      setSeconds(seconds + 1);
    }, 1000);
  }

  return {
    seconds,
    reset,
    stop,
    resume
  };
};