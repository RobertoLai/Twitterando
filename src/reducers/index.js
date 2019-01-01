const initialState = {
  tasks: [],
  isLoading: false,
  error: null
};

export default function tasks(state = initialState, action) {
  switch (action.type) {
    // case "CREATE_TASK": {
    //   return { ...state, tasks: state.tasks.concat(action.payload) };
    // }
    case "CREATE_TASK_SUCCEEDED": {
      console.log("CREATE_TASK_SUCCEEDED",state.tasks.concat(action.payload));
      return { ...state, tasks: state.tasks.concat(action.payload) };
    }

    // case "EDIT_TASK": {
    //   const tasks = state.tasks.map(task =>
    //     task.id === action.payload.id
    //       ? Object.assign({}, task, action.payload)
    //       : task
    //   );
    //   return { ...state, tasks };
    // }

    case "EDIT_TASK_SUCCEEDED": {
      const tasks = state.tasks.map(task =>
        task.id === action.payload.id
          ? Object.assign({}, task, action.payload)
          : task
      );
      return { ...state, tasks };
    }

    case "FETCH_TASKS_SUCCEEDED": {
      return { ...state, tasks: action.payload.tasks };
    }

    default: {
      return state;
    }
  }

  // return state;
}
