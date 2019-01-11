import * as api from "../api";
import { normalize, schema } from "normalizr";

const taskSchema = new schema.Entity("tasks");
const projectSchema = new schema.Entity("projects", { tasks: [taskSchema] });

function receivedEntities(entities) {
  return { type: "RECEIVED_ENTITIES", payload: entities };
}

// export function createTask({ title, description, status = 'Unstarted' }) {
//   return dispatch => {
//     dispatch(createTaskStarted());
//     return api.createTask({ title, description, status }).then(resp => {
//       dispatch(createTaskSucceeded(resp.data));
//     });
//   };
// }

export function createTask(title, description, projectId) {
  return dispatch => {
    dispatch(createTaskStarted());

    return api
      .createTask({
        title,
        description,
        status: "Unstarted",
        timer: 0,
        projectId
      })
      .then(resp => {
        setTimeout(() => dispatch(createTaskSucceeded(resp.data)), 400);

        // dispatch(createTaskSucceeded(resp.data))
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

export function createTaskSucceeded(tasks) {
  return {
    type: "CREATE_TASK_SUCCEEDED",
    payload: tasks
  };
}

export function createTaskFailed(error) {
  return {
    type: "CREATE_TASK_FAILED",
    payload: { error }
  };
}

function progressTimerStart(id) {
  return {
    type: "TIMER_STARTED",
    payload: { id }
  };
}
function progressTimerStop(id) {
  return {
    type: "TIMER_STOPPED",
    payload: { id }
  };
}

export function editTask(task, params = {}) {
  return (dispatch, getState) => {
    const updatedTask = Object.assign({}, task, params);
    dispatch(editTaskStarted());
    api
      .editTask(task.id, updatedTask)
      .then(resp => {
        setTimeout(
          () => {
            dispatch(edit_task_succeeded(task.id, resp.data));
            if (resp.data.status === "In Progress") {
              dispatch(progressTimerStart(task.id));
            }

            if (
              task.status === "In Progress" ||
              resp.data.status === "Unstarted"
            ) {
              dispatch(progressTimerStop(task.id));
            }
          },

          400
        );

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

// function getTaskById(tasks, id) {
//    return tasks.find(task => task.id === id);
//   return tasks[id];
// }

export function fetchTasksStarted() {
  return {
    type: "FETCH_TASKS_STARTED"
  };
}

//NB managed with sagas
export function fetchTasks() {
  return {
    type: "FETCH_TASKS_STARTED"
  };
}
// export function fetchTasks() {
//   return dispatch => {
//     dispatch(fetchTasksStarted());
//     api
//       .fetchTasks()
//       .then(resp => {
//         setTimeout(() => dispatch(fetchTasksSucceeded(resp.data)), 600);
//         // throw new Error("fetchTasks: An error occurred while fetching!");
//       })
//       .catch(err => {
//         dispatch(fetchTasksFailed(err.message));
//       });
//   };
// }
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

export function fetchProjects() {
  return (dispatch, getState) => {
    dispatch(fetchProjectsStarted());
    api
      .fetchProjects()
      .then(resp => {
        const projects = resp.data;
        const normalizedData = normalize(projects, [projectSchema]);

        // dispatch(receivedEntities(normalizedData))
        setTimeout(() => dispatch(receivedEntities(normalizedData)), 600);
        if (!getState().page.currentProjectId) {
          const defaultProjectId = projects[0].id;
          dispatch(setCurrentProjectId(defaultProjectId));
        }

        // throw new Error("fetchTasks: An error occurred while fetching!");
      })
      .catch(err => {
        dispatch(fetchProjectsFailed(err.message));
      });
  };
}
export function fetchProjectsStarted(boards) {
  return {
    type: "FETCH_PROJECTS_STARTED",
    payload: { boards }
  };
}
export function fetchProjectsSucceeded(projects) {
  return {
    type: "FETCH_PROJECTS_SUCCEEDED",
    payload: { projects }
  };
}
export function fetchProjectsFailed(error) {
  return {
    type: "FETCH_PROJECTS_FAILED",
    payload: { error }
  };
}

export function setCurrentProjectId(id) {
  return {
    type: "SET_CURRENT_PROJECT_ID",
    payload: { id }
  };
}

export function filterTasks(filter) {
  return {
    type: "FILTER_TASKS",
    payload: { filter }
  };
}
