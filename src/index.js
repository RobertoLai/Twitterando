import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { tasksReducer, projectsReducer, pageReducer } from "./reducers";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

import rootSaga from "./sagas";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = (state = {}, action) => {
  return {
    tasks: tasksReducer(state.tasks, action),
    projects: projectsReducer(state.projects, action),
    page:pageReducer(state.page ,action)
  };
};
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
