import { delay } from "redux-saga";
import { call, put } from "redux-saga/effects";
import handleProgressTimer from "./index";

describe("sagas", () => {
  xit("#handleProgressTimer", () => {
    const iterator = handleProgressTimer({
      type: "TIMER_STARTED",
      payload: { id: 2 }
    });

    const expectedAction = {
      type: "TIMER_INCREMENT",
      payload: { id: 2 }
    };

    expect(iterator.next().value).toEqual(call(delay, 1000));
    expect(iterator.next().value).toEqual(put(expectedAction));
    expect(iterator.next().value).toEqual(call(delay, 1000));
    expect(iterator.next().value).toEqual(put(expectedAction));
  });

  xit("#handleProgressTimer TIMER_STOPPED", () => {
    const iterator = handleProgressTimer({
      type: "TIMER_STOPPED",
      payload: { id: 2 }
    });

    const expectedAction = {
      type: "TIMER_RESET",
      payload: { id: 2 }
    };
    expect(iterator.next().value).toEqual(put(expectedAction));
  });
});
