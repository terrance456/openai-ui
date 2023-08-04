import React from "react";
import "./timer-progressive-bar.scss";

interface TimerProgressiveBar {
  /** seconds */
  duration?: number;
}

export default function TimerProgressiveBar({ duration = 5 }: TimerProgressiveBar) {
  return (
    <div className="timer-bar-container">
      <div className="timer-bar" style={{ animation: `roundtime ${duration}s linear` }} />
    </div>
  );
}
