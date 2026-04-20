import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import "./TaskInput.css";

function TaskInput({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("normal");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddTask({ id: Date.now(), title: title.trim(), priority });
    setTitle("");
    setPriority("normal");
  };

  return (
    <form onSubmit={handleSubmit} className="task-input-form">
      <div className={"title-field " + (title ? "filled" : "")}>
        <input
          id="task-title"
          type="text"
          placeholder=" "
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="task-title">Task title</label>
      </div>

      <div className="task-form-controls">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          aria-label="Task priority"
        >
          <option value="low">Low priority</option>
          <option value="normal">Normal priority</option>
          <option value="high">High priority</option>
        </select>

        <button type="submit" className="add-task-btn">
          <FiPlus />
          Add Task
        </button>

        <button type="button" className="clear-title-btn" onClick={() => setTitle("")}>
          Clear
        </button>
      </div>

      <div className="task-preview">
        Preview: "{title || "(empty)"}" ({priority} priority)
      </div>
    </form>
  );
}

export default TaskInput;