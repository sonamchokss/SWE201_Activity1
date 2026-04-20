export const initialTaskState = {
  tasks: [],
};

export function taskReducer(state, action) {
  switch (action.type) {
    case "LOAD_FROM_STORAGE":
      return { ...state, tasks: action.tasks };
      
    case "ADD_TASK":
      return { 
        ...state, 
        tasks: [...state.tasks, action.task] 
      };
      
    case "TOGGLE_DONE":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.id ? { ...t, done: !t.done } : t
        ),
      };
      
    case "CLEAR_COMPLETED":
      return {
        ...state,
        tasks: state.tasks.filter((t) => !t.done),
      };
      
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.id),
      };
      
    default:
      return state;
  }
}