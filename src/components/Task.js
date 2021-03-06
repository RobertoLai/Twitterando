import React from "react";
import { TASK_STATUSES } from "../constants";

const Task = props => {
  const onUpdateTaskStatus = e =>
    props.onUpdateTaskStatus(props.task, e.target.value);


  return (
    <div className="task">
      <div className="task-header">{props.task.title}</div>
    <select className="task-status" value={props.task.status} onChange={onUpdateTaskStatus}>
        {TASK_STATUSES.map(status => (
          <option value={status} key={status}>
            {status}
          </option>
        ))}
      </select>
      <div className="task-body">{props.task.description}</div>
    <div className="task-timer">{props.task.timer}s</div>
    </div>
  );
};

export default Task;
