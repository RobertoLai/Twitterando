import { delay, channel } from "redux-saga";
import {
  // fork,
  call,
  take,
  put,
  takeLatest
  // takeEvery
} from "redux-saga/effects";
import * as api from "../api";

// export default function* rootSaga() {
//   console.log("rootSaga reporting");
//   yield fork(watchFetchTasks);
//   yield fork(watchSomethingElse);
// }
export default function* rootSaga() {
  yield takeLatest("FETCH_TASKS_STARTED", fetchTasks);
  yield takeLatestById(["TIMER_STARTED", "TIMER_STOPPED"], handleProgressTimer);
  // yield takeEvery("TIMER_STARTED", handleProgressTimer);
  // yield takeEvery("TIMER_STOPPED", handleProgressTimerStop);
}

function* takeLatestById(actionType, saga) {
  const channelsMap = {};
  while (true) {
    const action = yield take(actionType);
    const { id } = action.payload;
    if (!channelsMap[id]) {
      channelsMap[id] = channel();
      yield takeLatest(channelsMap[id], saga);
    }
    yield put(channelsMap[id], action);
  }
}

function* handleProgressTimer({ payload, type }) {
  if (type === "TIMER_STARTED") {
    while (true) {
      yield call(delay, 1000);
      yield put({
        type: "TIMER_INCREMENT",
        payload: { id: payload.id }
      });
    }
  }

  if (type === "TIMER_STOPPED") {
    yield put({
      type: "TIMER_RESET",
      payload: { id: payload.id }
    });
  }
}


function* fetchTasks() {
  try {
    const { data } = yield call(api.fetchTasks);
    yield put({
      type: "FETCH_TASKS_SUCCEEDED",
      payload: { tasks: data }
    });
  } catch (e) {
    yield put({
      type: "FETCH_TASKS_FAILED",
      payload: { error: e.message }
    });
  }
}
