import React, { Component } from "react";
import logo from "./logo.svg";
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
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { tasks: state.tasks };
}

// function mapStateToProps(state) {
//   const { tasks } = state.tasks;
//   return tasks ;
// }

export default connect(mapStateToProps)(App);