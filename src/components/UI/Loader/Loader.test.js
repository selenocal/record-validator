import React from "react";
import { shallow } from "enzyme";
import Loader from "./Loader";

describe("<Loader />", () => {
  const wrapper = shallow(<Loader />);

  it("expects render Loader correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
