import React from "react";
import { shallow } from "enzyme";
import RecordList from "./RecordList";

describe("<RecordList />", () => {
  const fileContent = [
    {
      name: "record",
      attributes: {
        reference: "189177"
      },
      children: [
        {
          name: "accountNumber",
          value: "NL27SNSB0917829871"
        },
        {
          name: "description",
          value: "Subscription for Erik Dekker"
        },
        {
          name: "startBalance",
          value: "5429"
        },
        {
          name: "mutation",
          value: "-939"
        },
        {
          name: "endBalance",
          value: "6368"
        }
      ]
    },
    {
      name: "record",
      attributes: {
        reference: "189177"
      },
      children: [
        {
          name: "accountNumber",
          value: "NL27SNSB0917829871"
        },
        {
          name: "description",
          value: "Subscription for Erik Dekker"
        },
        {
          name: "startBalance",
          value: "5429"
        },
        {
          name: "mutation",
          value: "-939"
        },
        {
          name: "endBalance",
          value: "6368"
        }
      ]
    }
  ];

  it("expects render empty RecordList correctly", () => {
    const wrapper = shallow(<RecordList />);
    expect(wrapper).toMatchSnapshot();
  });

  it("expects render RecordList with mock data correctly", () => {
    const wrapper = shallow(<RecordList records={fileContent} />);
    expect(wrapper).toMatchSnapshot();
    fileContent.forEach(record => {
      expect(wrapper.contains(record.attributes.reference)).toBe(true);
      expect(wrapper.contains(record.children[1].value)).toBe(true);
    });
  });
});
