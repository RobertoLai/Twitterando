import React from "react";
import ReactDOM from "react-dom";
// import App from "./App";
import ConnectedApp, { App } from "./App";

import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });
//

Enzyme.configure({ adapter: new Adapter() });

describe("App container:", () => {
  it("should return a FlashMessage it there is an error", () => {
    const wrapper = shallow(
      <App dispatch={() => {}} error="problem!" tasks={[]} />
    );
    expect(wrapper.find("FlashMessage").exists()).toBe(false);
  });

  it("should dispatch fetchProject on mount", () => {
    const spy = jest.fn();

    const wrapper = shallow(<App dispatch={spy} error="problem!" tasks={[]} />);
    expect(spy).toHaveBeenCalled();
  });

  xit("should fetch projects on mount", () => {
    const middleware = [thunk];
    const initialState = {
      tasks: { tasks: [], isLoading: false, error: null, filter: "" },
      projects: { items: [], isLoading: false, error: null, filter: "" }
    };
    // const initialState = {
    //   items: [],
    //   isLoading: false,
    //   error: null,
    //   filter: ""
    // };
    const mockStore = configureMockStore(middleware)(initialState);

    const wrapper = shallow(
      <Provider store={mockStore}>
        <ConnectedApp />
      </Provider>
    );

    const expectedAction = { type: "FETCH_PROJECTS_STARTED" };
    console.log(wrapper.debug());
    expect(mockStore.getActions()[0]).toEqual(expectedAction);
  });
});
