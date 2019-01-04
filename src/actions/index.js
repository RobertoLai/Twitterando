import * as api from "../api";

export function createTask(title, description) {
  return dispatch => {
    dispatch(createTaskStarted());

    api
      .createTask({ title, description, status: "Unstarted" })
      .then(resp => {
        setTimeout(() => dispatch(createTaskSucceeded(resp.data)), 400);
        // throw new Error("createTask: error while creating the new task");
      })
      .catch(err => {
        dispatch(createTaskFailed(err.message));
      });
  };
}

export function createTaskStarted() {
  return {
    type: "CREATE_TASK_STARTED"
  };
}

export function createTaskSucceeded(task) {
  return {
    type: "CREATE_TASK_SUCCEEDED",
    payload: task,
    meta: {
      analytics: {
        event: "create_task",
        data: {
          //id: task.id
          task
        }
      }
    }
  };
}

export function createTaskFailed(error) {
  return {
    type: "CREATE_TASK_FAILED",
    payload: { error }
  };
}

export function editTask(id, params = {}) {
  return (dispatch, getState) => {
    const task = getTaskById(getState().tasks.tasks, id);
    const updatedTask = Object.assign({}, task, params);
    dispatch(editTaskStarted());
    api
      .editTask(id, updatedTask)
      .then(resp => {
        setTimeout(() => dispatch(edit_task_succeeded(id, resp.data)), 400);
        //throw new Error("editTask: An error occurred while editing task!");
      })
      .catch(err => {
        dispatch(editTaskFailed(err.message));
      });
  };
}

export function editTaskStarted() {
  return {
    type: "EDIT_TASK_STARTED"
  };
}
export function edit_task_succeeded(id, params = {}) {
  return {
    type: "EDIT_TASK_SUCCEEDED",
    payload: Object.assign({}, { id }, params)
  };
}
export function editTaskFailed(error) {
  return {
    type: "EDIT_TASK_FAILED",
    payload: { error }
  };
}

function getTaskById(tasks, id) {
  return tasks.find(task => task.id === id);
}

export function fetchTasksStarted() {
  return {
    type: "FETCH_TASKS_STARTED"
  };
}
export function fetchTasks() {
  return dispatch => {
    dispatch(fetchTasksStarted());
    api
      .fetchTasks()
      .then(resp => {
        setTimeout(() => dispatch(fetchTasksSucceeded(resp.data)), 600);
        // throw new Error("fetchTasks: An error occurred while fetching!");
      })
      .catch(err => {
        dispatch(fetchTasksFailed(err.message));
      });
  };
}
export function fetchTasksSucceeded(tasks) {
  return {
    type: "FETCH_TASKS_SUCCEEDED",
    payload: { tasks }
  };
}
export function fetchTasksFailed(error) {
  return {
    type: "FETCH_TASKS_FAILED",
    payload: { error }
  };
}
