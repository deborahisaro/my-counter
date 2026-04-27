import { useState, useEffect, useRef } from "react";

const S = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    fontFamily: "'Courier New', monospace",
  },
  card: {
    background: "rgba(255,255,255,0.05)",
    border: "2px solid rgba(255,255,255,0.15)",
    borderRadius: "20px",
    padding: "40px 50px",
    boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
    textAlign: "center",
    minWidth: "320px",
  },
  title: {
    color: "#e0e0e0",
    fontSize: "13px",
    letterSpacing: "4px",
    textTransform: "uppercase",
    marginBottom: "30px",
    opacity: 0.6,
  },
  counterRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "24px",
  },
  iconBtn: (color) => ({
    width: "50px",
    height: "50px",
    borderRadius: "12px",
    border: `2px solid ${color}`,
    background: "transparent",
    color: color,
    fontSize: "24px",
    cursor: "pointer",
    transition: "all 0.15s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  }),
  countDisplay: {
    fontSize: "56px",
    fontWeight: "bold",
    color: "#ffffff",
    minWidth: "70px",
    lineHeight: 1,
  },
  timerDisplay: {
    fontSize: "38px",
    color: "#4fc3f7",
    letterSpacing: "3px",
    marginBottom: "28px",
    fontVariantNumeric: "tabular-nums",
  },
  btnRow: {
    display: "flex",
    gap: "16px",
    justifyContent: "center",
  },
  startBtn: (running) => ({
    padding: "12px 32px",
    borderRadius: "50px",
    border: "none",
    background: running
      ? "linear-gradient(135deg, #ef5350, #c62828)"
      : "linear-gradient(135deg, #66bb6a, #2e7d32)",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
    letterSpacing: "1px",
    transition: "opacity 0.2s",
  }),
  resetBtn: {
    padding: "12px 32px",
    borderRadius: "50px",
    border: "2px solid rgba(255,255,255,0.3)",
    background: "transparent",
    color: "#e0e0e0",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
    letterSpacing: "1px",
    transition: "all 0.2s",
  },
};

function formatTime(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function App() {
  const [count, setCount] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  function handleReset() {
    setRunning(false);
    setSeconds(0);
    setCount(1);
  }

  return (
    <div style={S.page}>
      <div style={S.card}>
        <p style={S.title}>Counter &amp; Timer</p>

        <div style={S.counterRow}>
          <button
            style={S.iconBtn("#ef9a9a")}
            onClick={() => setCount((c) => Math.max(0, c - 1))}
          >
            −
          </button>
          <span style={S.countDisplay}>{count}</span>
          <button
            style={S.iconBtn("#a5d6a7")}
            onClick={() => setCount((c) => c + 1)}
          >
            +
          </button>
        </div>

        <div style={S.timerDisplay}>{formatTime(seconds)}</div>

        <div style={S.btnRow}>
          <button
            style={S.startBtn(running)}
            onClick={() => setRunning((r) => !r)}
          >
            {running ? "Stop" : "Start"}
          </button>
          <button style={S.resetBtn} onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}