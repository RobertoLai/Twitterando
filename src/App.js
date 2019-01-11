import React, { Component } from "react";
import "./App.css";
import TasksPage from "./components/TasksPage";
import Header from "./components/Header";
import {
  createTask,
  editTask,
  fetchProjects,
  filterTasks,
  setCurrentProjectId
} from "./actions";
// import { fetchTasks } from "./actions";
import { connect } from "react-redux";
import { getGroupedAndFilteredTasks, getPage, getProjects } from "./reducers";
// import { getFilteredTasks } from "./reducers";

export class App extends Component {
  componentDidMount() {
    // this.props.dispatch(fetchTasks());
    this.props.dispatch(fetchProjects());
  }

  onCreateTask = ({ title, description }) =>
    {
      this.props.dispatch(
      createTask(title, description, this.props.page.currentProjectId)
    )};

  onUpdateTaskStatus = (task, status) =>
    this.props.dispatch(editTask(task, { status }));

  onSearch = searchTerm => {
    this.props.dispatch(filterTasks(searchTerm));
  };

  onCurrentProjectChange = e => {
    this.props.dispatch(setCurrentProjectId(Number(e.target.value)));
  };

  render() {
    return (
      <div className="container">
        <div className="main-content">
          <Header
            projects={this.props.projects}
            onCurrentProjectChange={this.onCurrentProjectChange}
          />
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
  // const { isLoading, error, items } = state.tasks;
  const { isLoading, error } = state.projects;
  return {
    tasks: getGroupedAndFilteredTasks(state),
    projects: getProjects(state),
    page: getPage(state),
    isLoading,
    error
  };
}

export default connect(mapStateToProps)(App);

// function mapStateToProps(state) {
//   return {
//     tasks: state.tasks.tasks,
//     isLoading: state.tasks.isLoading
//   };
// }
