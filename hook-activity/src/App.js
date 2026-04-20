import React, { useEffect, useReducer, useState } from "react";
import {
  FiCheck,
  FiCheckCircle,
  FiCheckSquare,
  FiClock,
  FiList,
  FiSquare,
  FiTrash2,
} from "react-icons/fi";
import { MdTaskAlt } from "react-icons/md";
import TaskInput from "./components/TaskInput";
import ThemeToggleButton from "./components/ThemeToggleButton";
import { useTheme } from "./context/ThemeContext";
import { taskReducer, initialTaskState } from "./reducers/taskReducer";
import { useLocalStorageState } from "./hooks/useLocalStorageState";
import "./App.css";

function App() {
  const { theme } = useTheme();
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);
  const [isInitializing, setIsInitializing] = useState(true);
  const [deletingTaskId, setDeletingTaskId] = useState(null);

  // Use custom hook for localStorage
  const [savedTasks] = useLocalStorageState("tasks", []);

  // Load tasks on mount
  useEffect(() => {
    if (savedTasks.length > 0) {
      dispatch({ type: "LOAD_FROM_STORAGE", tasks: savedTasks });
    }
  }, [savedTasks]);

  useEffect(() => {
    const timer = setTimeout(() => setIsInitializing(false), 380);
    return () => clearTimeout(timer);
  }, []);

  // Save tasks when they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  }, [state.tasks]);

  // Update title
  useEffect(() => {
    document.title = "Tasks: " + state.tasks.length;
  }, [state.tasks]);

  const handleAddTask = (task) => {
    dispatch({ type: "ADD_TASK", task: { ...task, done: false } });
  };

  const handleDeleteTask = (id) => {
    setDeletingTaskId(id);

    setTimeout(() => {
      dispatch({ type: "DELETE_TASK", id });
      setDeletingTaskId((current) => (current === id ? null : current));
    }, 180);
  };

  const completedCount = state.tasks.filter((task) => task.done).length;
  const pendingCount = state.tasks.length - completedCount;

  return (
    <main className={"app-shell " + theme}>
      <section className="task-board-card">
        <header className="app-header-row">
          <h1 className="app-title">
            <MdTaskAlt />
            Reactive Task Board
          </h1>
          <ThemeToggleButton />
        </header>

        <TaskInput onAddTask={handleAddTask} />

        <section className="stats-card">
          <div className="stat-item">
            <FiList />
            <span>Total</span>
            <strong>{state.tasks.length}</strong>
          </div>
          <div className="stat-item">
            <FiCheck />
            <span>Completed</span>
            <strong>{completedCount}</strong>
          </div>
          <div className="stat-item">
            <FiClock />
            <span>Pending</span>
            <strong>{pendingCount}</strong>
          </div>

          {completedCount > 0 && (
            <button
              className="clear-completed-btn"
              onClick={() => dispatch({ type: "CLEAR_COMPLETED" })}
            >
              <FiCheckCircle />
              Clear Completed
            </button>
          )}
        </section>

        {isInitializing ? (
          <div className="task-loading" aria-live="polite">
            Loading tasks...
          </div>
        ) : state.tasks.length === 0 ? (
          <p className="empty-state">No tasks yet. Add your first task above.</p>
        ) : (
          <ul className="task-list">
            {state.tasks.map((task) => (
              <li
                key={task.id}
                className={
                  "task-item " +
                  (task.done ? "done " : "") +
                  (deletingTaskId === task.id ? "removing" : "")
                }
              >
                <div className="task-main">
                  <button
                    className="task-check-btn"
                    onClick={() => dispatch({ type: "TOGGLE_DONE", id: task.id })}
                    aria-label={
                      task.done
                        ? "Mark " + task.title + " as pending"
                        : "Mark " + task.title + " as completed"
                    }
                    type="button"
                  >
                    {task.done ? <FiCheckSquare /> : <FiSquare />}
                  </button>

                  <div className="task-copy">
                    <p className="task-title">{task.title}</p>
                    <span className={"priority-badge " + task.priority}>
                      {task.priority} priority
                    </span>
                  </div>
                </div>

                <button
                  className="delete-task-btn"
                  onClick={() => handleDeleteTask(task.id)}
                  type="button"
                >
                  <FiTrash2 />
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;