import * as api from "../api";

// let _id = 1;
// export function uniqueId() {
//   return _id++;
// }

export function createTask(title, description) {
  return dispatch => {
    api
      .createTask({ title, description, status: "Unstarted" })
      .then(resp => dispatch(createTaskSucceeded(resp.data)))
      .catch(err => {
        console.log("ERROR createTask", err.message);
      });
  };
}
export function createTaskSucceeded(tasks) {
  return {
    type: "CREATE_TASK_SUCCEEDED",
    payload: tasks
  };
}

export function editTask(id, params = {}) {
  return (dispatch, getState) => {
    const task = getTaskById(getState().tasks.tasks, id);
    const updatedTask = Object.assign({}, task, params);
    api
      .editTask(id, updatedTask)
      .then(resp => dispatch(edit_task_succeeded(id, resp.data)));
  };
}
export function edit_task_succeeded(id, params = {}) {
  return {
    type: "EDIT_TASK_SUCCEEDED",
    payload: Object.assign({}, { id }, params)
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
