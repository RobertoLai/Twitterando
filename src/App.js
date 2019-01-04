import React, { Component } from "react";
import "./App.css";
import TasksPage from "./components/TasksPage";
import { createTask, editTask, fetchTasks } from "./actions";
import { connect } from "react-redux";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTasks());
  }

  onCreateTask = ({ title, description }) =>
    this.props.dispatch(createTask(title, description));

  onUpdateTaskStatus = (id, status) =>
    this.props.dispatch(editTask(id, { status }));

  render() {
    return (
      <div className="main-content">
        <TasksPage
          tasks={this.props.tasks}
          onCreateTask={this.onCreateTask}
          onUpdateTaskStatus={this.onUpdateTaskStatus}
          isLoading={this.props.isLoading}
          error={this.props.error}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { tasks, isLoading, error } = state.tasks;
  return { tasks, isLoading, error };
}

export default connect(mapStateToProps)(App);

// function mapStateToProps(state) {
//   return {
//     tasks: state.tasks.tasks,
//     isLoading: state.tasks.isLoading
//   };
// }
