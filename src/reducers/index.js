const initialState = {
  projects: { projects: [], isLoading: false, error: null },
  tasks: { tasks: [], isLoading: false, error: null }
};

export function projectsReducer(state = initialState.projects, action) {
  return state;
}

export function tasksReducer(state = initialState.tasks, action) {
  switch (action.type) {
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
      console.log("EDIT_TASK_FAILED",action.payload.error);
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
