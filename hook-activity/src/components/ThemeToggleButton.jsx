import React from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import "./ThemeToggleButton.css";

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      type="button"
      role="switch"
      aria-checked={theme === "dark"}
      aria-label="Toggle color theme"
    >
      <span className={"toggle-track " + (theme === "dark" ? "dark" : "light")}>
        <span className="toggle-thumb">
          {theme === "light" ? <FiSun /> : <FiMoon />}
        </span>
      </span>
      <span className="toggle-label">{theme === "light" ? "Light" : "Dark"} Mode</span>
    </button>
  );
}

export default ThemeToggleButton;