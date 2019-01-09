import { createSelector } from "reselect";
import { TASK_STATUSES } from "../constants";

const initialState = {
  projects: { items: [], isLoading: false, error: null, filter: "" },
  tasks: { tasks: [], isLoading: false, error: null, filter: "" }
};

const initialStatePage = {
  currentProjectId: null,
  filter: ""
};

export function pageReducer(state = initialStatePage, action) {
  switch (action.type) {
    case "SET_CURRENT_PROJECT_ID": {
      return { ...state, currentProjectId: action.payload.id };
    }
    case "FILTER_TASKS": {
      return { ...state, filter: action.payload.filter };
    }
    default:
      return state;
  }
}

export function projectsReducer(state = initialState.projects, action) {
  switch (action.type) {
    case "RECEIVED_ENTITIES": {
      const { entities } = action.payload;
      if (entities && entities.projects) {
        return {
          ...state,
          isLoading: false,
          items: entities.projects
        };
      }
      break;
    }

    case "CREATE_TASK_SUCCEEDED": {
      const task = action.payload;
      const project = state.items[task.projectId];
      return {
        ...state,
        items: {
          ...state.items,
          [task.projectId]: {
            ...project,
            tasks: project.tasks.concat(task.id)
          }
        }
      };
    }

    case "FETCH_PROJECTS_STARTED": {
      return { ...state, isLoading: true };
    }
    case "FETCH_PROJECTS_SUCCEEDED": {
      return {
        ...state,
        isLoading: false,
        items: action.payload.projects
      };
    }

    default: {
      return state;
    }
  }
}

export function tasksReducer(state = initialState.tasks, action) {
  switch (action.type) {
    case "RECEIVED_ENTITIES": {
      const { entities } = action.payload;
      if (entities && entities.tasks) {
        return {
          ...state,
          isLoading: false,
          items: entities.tasks
        };
      }
      break
    }
    case "FILTER_TASKS": {
      return { ...state, filter: action.payload.filter };
    }
    case "TIMER_INCREMENT": {
      const task = state.items[action.payload.id];

      const editedTasks = {
        ...state.items,
        [action.payload.id]: {
          ...task,
          timer: ++task.timer
        }
      };

      return { ...state, items: editedTasks, isLoading: false };
    }
    case "TIMER_RESET": {
      const task = state.items[action.payload.id];
      const timing = task.status === "Unstarted" ? 0 : task.timer;
      const editedTasks = {
        ...state.items,
        [action.payload.id]: { ...task, timer: timing }
      };

      return { ...state, items: editedTasks, isLoading: false };
    }
    case "CREATE_TASK_STARTED": {
      return { ...state, isLoading: true };
    }
    case "CREATE_TASK_SUCCEEDED": {
      const task = action.payload;
      const nextTasks = { ...state.items, [task.id]: task };
      return {
        ...state,
        isLoading: false,
        items: nextTasks
      };
    }

    case "EDIT_TASK_SUCCEEDED": {
      const editedTasks = {
        ...state.items,
        [action.payload.id]: action.payload
      };
      return { ...state, items: editedTasks, isLoading: false };
    }
    case "CREATE_TASK_FAILED": {
      return { ...state, isLoading: false, error: action.payload.error };
    }

    case "EDIT_TASK_STARTED": {
      return { ...state, isLoading: true };
    }
    case "EDIT_TASK_FAILED": {
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
// const getTasks = state => state.tasks.tasks;
const getFilter = state => state.page.filter;

export const getProjects = state => {
  return Object.keys(state.projects.items).map(id => {
    return state.projects.items[id];
  });
};
export const getPage = state => state.page;

export const getTasksByProjectId = state => {
  const { currentProjectId } = state.page;

  if (!currentProjectId || !state.projects.items[currentProjectId]) {
    return [];
  }

  const taskIds = state.projects.items[currentProjectId].tasks;
  return taskIds.map(id => state.tasks.items[id]);
};

export const getFilteredTasks = createSelector(
  [getTasksByProjectId, getFilter],
  (tasks, filter) => {
    return tasks.filter(task => task.title.match(new RegExp(filter, "i")));
  }
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
