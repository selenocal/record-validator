import React from "react";
import { shallow } from "enzyme";
import Container from "./Container";

describe("<Container />", () => {
  const wrapper = shallow(<Container>TEST</Container>);

  it("expects render Container correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("expects Container contains given data", () => {
    expect(wrapper.contains("TEST")).toBe(true);
  });
});
