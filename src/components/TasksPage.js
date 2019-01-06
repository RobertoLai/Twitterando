import React from "react";
import TaskList from "./TaskList";
import FlashMessage from "./FlashMessage";
import { TASK_STATUSES } from "../constants";

class TasksPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNewCardForm: false,
      title: "",
      description: ""
    };
  }

  onTitleChange = e => this.setState({ title: e.target.value });

  onDescriptionChange = e => this.setState({ description: e.target.value });

  resetForm = e =>
    this.setState({
      showNewCardForm: false,
      title: "",
      description: ""
    });

  toggleForm = e =>
    this.setState({
      showNewCardForm: !this.state.showNewCardForm
    });

  onCreateTask = e => {
    e.preventDefault();
    this.props.onCreateTask({
      title: this.state.title,
      description: this.state.description
    });
    this.resetForm();
  };

  renderTaskList() {
    const { tasks } = this.props;

    return TASK_STATUSES.map(status => {
      const statusTasks = tasks.filter(task => task.status === status);
      return (
        <TaskList
          key={status}
          status={status}
          tasks={statusTasks}
          onUpdateTaskStatus={this.props.onUpdateTaskStatus}
        />
      );
    });
  }

  render() {
    return this.props.isLoading ? (
      <div className="tasks-loading">Loading....</div>
    ) : (
      <div className="tasks">
        <div className="tasks-header">
          <button className="button button-default" onClick={this.toggleForm}>
            + New task
          </button>
        </div>

        {this.state.showNewCardForm && (
          <form className="task-list-form" onSubmit={this.onCreateTask}>
            <input
              className="full-width-input"
              onChange={this.onTitleChange}
              type="text"
              placeholder="title"
              value={this.state.title}
            />
            <input
              className="full-width-input"
              onChange={this.onDescriptionChange}
              type="text"
              placeholder="description"
              value={this.state.description}
            />
            <button className="button" type="submit">
              Save
            </button>
          </form>
        )}

        <div className="task-lists">
          {this.props.error !== null ? (
            <FlashMessage message={this.props.error} />
          ) : (
            this.renderTaskList()
          )}
        </div>
      </div>
    );
  }
}

export default TasksPage;
