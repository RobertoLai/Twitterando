import React from "react";
import Task from "./Task";

const TaskList = props => {
  const tasks =
    props.tasks.length > 0
      ? props.tasks.map(task => (
          <Task
            key={task.id}
            task={task}
            onUpdateTaskStatus={props.onUpdateTaskStatus}
          />
        ))
      : null;

  return (
    <div className="task-list">
      <div className="task-list-title">
        <strong>{props.status}</strong>
      </div>
      {tasks}
    </div>
  );
};

export default TaskList;
