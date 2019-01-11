import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import TaskList from "./TaskList";
import toJson from "enzyme-to-json";

Enzyme.configure({ adapter: new Adapter() });

describe("#TaskList component", () => {
  it("should render a status", () => {
    const wrapper = shallow(<TaskList status="In Progress" tasks={[]} />);
    expect(wrapper.find("strong").text()).toEqual("In Progress");
  });

  it("should render a Task component for eash task", () => {
    const tasks = [
      {
        id: 1,
        title: "task 1",
        description: "descr 1",
        status: "Unstarted",
        timer: "0"
      },
      {
        id: 2,
        title: "task 2",
        description: "descr 2",
        status: "Unstarted",
        timer: "0"
      },
      {
        id: 3,
        title: "task 3",
        description: "descr 3",
        status: "Unstarted",
        timer: "0"
      }
    ];
    const wrapper = shallow(<TaskList status="Unstarted" tasks={tasks} />);
    expect(wrapper.find("Task").length).toEqual(3);
  });

  it("#snapshot: should match the last snapshot", () => {
    const wrapper = shallow(<TaskList status="In Progress" tasks={[]} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it("#snapshot: should match the last snapshot with 3 tasks", () => {
    const tasks = [
      {
        id: 1,
        title: "task 1",
        description: "descr 1",
        status: "Unstarted",
        timer: "0"
      },
      {
        id: 2,
        title: "task 2",
        description: "descr 2",
        status: "Unstarted",
        timer: "0"
      },
      {
        id: 3,
        title: "task 3",
        description: "descr 3",
        status: "Unstarted",
        timer: "0"
      }
    ];
    const wrapper = shallow(<TaskList status="Unstarted" tasks={tasks} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
