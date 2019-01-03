const initialState = {
  tasks: [],
  isLoading: false,
  error: null
};

export function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case "CREATE_TASK_SUCCEEDED": {
      return { ...state, tasks: state.tasks.concat(action.payload) };
    }

    case "EDIT_TASK_SUCCEEDED": {
      const editedTasks = state.tasks.map(task =>
        task.id === action.payload.id
          ? Object.assign({}, task, action.payload)
          : task
      );
      return { ...state, tasks: editedTasks };
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
