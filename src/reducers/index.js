import { createSelector } from "reselect";
import { TASK_STATUSES } from "../constants";

const initialState = {
  projects: { projects: [], isLoading: false, error: null, filter: "" },
  tasks: { tasks: [], isLoading: false, error: null, filter: "" }
};

export function projectsReducer(state = initialState.projects, action) {
  return state;
}

export function tasksReducer(state = initialState.tasks, action) {
  switch (action.type) {
    case "FILTER_TASKS": {
      return { ...state, filter: action.payload.filter };
    }
    case "TIMER_INCREMENT": {
      const editedTasks = state.tasks.map(task =>
        task.id === action.payload.id
          ? Object.assign({}, task, { timer: ++task.timer })
          : task
      );
      return { ...state, tasks: editedTasks, isLoading: false };
    }
    case "TIMER_RESET": {
      const editedTasks = state.tasks.map(task =>
        task.id === action.payload.id
          ? Object.assign({}, task, {
              timer: task.status === "Unstarted" ? 0 : task.timer
            })
          : task
      );

      return { ...state, tasks: editedTasks, isLoading: false };
    }
    case "CREATE_TASK_STARTED": {
      return { ...state, isLoading: true };
    }
    case "CREATE_TASK_SUCCEEDED": {
      return {
        ...state,
        isLoading: false,
        tasks: state.tasks.concat(action.payload)
      };
    }
    case "CREATE_TASK_FAILED": {
      return { ...state, isLoading: false, error: action.payload.error };
    }

    case "EDIT_TASK_STARTED": {
      return { ...state, isLoading: true };
    }
    case "EDIT_TASK_SUCCEEDED": {
      const editedTasks = state.tasks.map(task =>
        task.id === action.payload.id
          ? Object.assign({}, task, action.payload)
          : task
      );
      return { ...state, tasks: editedTasks, isLoading: false };
    }
    case "EDIT_TASK_FAILED": {
      console.log("EDIT_TASK_FAILED", action.payload.error);
      return { ...state, isLoading: false, error: action.payload.error };
    }

    case "FETCH_TASKS_STARTED": {
      return { ...state, isLoading: true };
    }
    case "FETCH_TASKS_FAILED": {
      return { ...state, isLoading: false, error: action.payload.error };
    }
    case "FETCH_TASKS_SUCCEEDED": {
      return { ...state, isLoading: false, tasks: action.payload.tasks };
    }

    default: {
      return state;
    }
  }

  // return state;
}

//NB Selectors
const getTasks = state => state.tasks.tasks;
const getFilter = state => state.tasks.filter;
// export function getFilteredState(tasks, filter) {
//   return tasks.filter(task => task.title.match(new RegExp(filter, "i")));
// }
export const getFilteredTasks = createSelector(
  [getTasks, getFilter],
  (tasks, filter) =>
    tasks.filter(task => task.title.match(new RegExp(filter, "i")))
);

export const getGroupedAndFilteredTasks = createSelector(
  [getFilteredTasks],
  tasks => {
    const grouped = {};
    TASK_STATUSES.forEach(status => {
      grouped[status] = tasks.filter(task => task.status === status);
    });
    return grouped;
  }
);
