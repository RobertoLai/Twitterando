import React from "react";

export default class Header extends React.Component {
  render() {
    const onCurrentProjectChange = this.props.onCurrentProjectChange;
    const projects = this.props.projects;
    // const project =
    //   this.props.projects.length > 0 ? this.props.projects[0] : null;

    return (
      <div>

        <select className="projects-item" onChange={onCurrentProjectChange}>

          {projects.map(project => (
            <option value={project.id} key={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
}
