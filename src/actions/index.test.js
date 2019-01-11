import { createTaskSucceeded, createTask } from "./index";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as api from "../api";

jest.unmock("../api");
api.createTask = jest.fn(
  () =>
    new Promise((resolve, reject) =>
      resolve({
        data: {
          task: "foo"
        }
      })
    )
);


const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("createTaskSucceeded:", () => {
  it("should handle task creation", () => {
    const task = {
      title: "Learn Jest",
      description: "testing library",
      id: 1,
      projectId: 1
    };
    const expectedAction = {
      type: "CREATE_TASK_SUCCEEDED",
      payload: task
    };
    expect(createTaskSucceeded(task)).toEqual(expectedAction);
  });
});

describe("#createTask:", () => {
  //NB there is a setTimeout, it will not work
  xit("works:", () => {
    const expectedActions = [
      { type: "CREATE_TASK_STARTED" },
      { type: "CREATE_TASK_SUCCEEDED", payload: { task: "foo" } }
    ];

    const store = mockStore({
      tasks: {
        items: []
      }
    });

    return store.dispatch(createTask({})).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(api.createTask).toHaveBeenCalled();
    });
  });
});
