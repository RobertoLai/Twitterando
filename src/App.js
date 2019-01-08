import React, { Component } from "react";
import "./App.css";
import TasksPage from "./components/TasksPage";
import { createTask, editTask, fetchTasks, filterTasks } from "./actions";
import { connect } from "react-redux";
import { getGroupedAndFilteredTasks } from "./reducers";
// import { getFilteredTasks } from "./reducers";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTasks());
  }

  onCreateTask = ({ title, description }) =>
    this.props.dispatch(createTask(title, description));

  onUpdateTaskStatus = (id, status) =>
    this.props.dispatch(editTask(id, { status }));

  onSearch = searchTerm => {
    this.props.dispatch(filterTasks(searchTerm));
  };

  render() {
    return (
      <div className="container">
        <div className="main-content">
          <TasksPage
            tasks={this.props.tasks}
            onCreateTask={this.onCreateTask}
            onUpdateTaskStatus={this.onUpdateTaskStatus}
            onSearch={this.onSearch}
            isLoading={this.props.isLoading}
            error={this.props.error}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // const { tasks, isLoading, error, filter } = state.tasks;
  // return { tasks: getFilteredState(tasks, filter), isLoading, error };
  const { isLoading, error } = state.tasks;
  return { tasks: getGroupedAndFilteredTasks(state), isLoading, error };
}

export default connect(mapStateToProps)(App);

// function mapStateToProps(state) {
//   return {
//     tasks: state.tasks.tasks,
//     isLoading: state.tasks.isLoading
//   };
// }
