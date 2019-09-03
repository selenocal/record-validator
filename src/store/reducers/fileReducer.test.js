import reducer from "./fileReducer";
import * as actionTypes from "../actions/actionTypes";

describe("File Reducer", () => {
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

  const error = { message: "something went wrong" };

  it("FETCH_FILE_CONTENT_REQUEST", () => {
    expect(
      reducer(undefined, {
        type: actionTypes.FETCH_FILE_CONTENT_REQUEST
      })
    ).toEqual({
      fileContent: [],
      isLoading: true,
      error: null
    });
  });

  it("FETCH_FILE_CONTENT_SUCCESS", () => {
    expect(
      reducer(undefined, {
        type: actionTypes.FETCH_FILE_CONTENT_SUCCESS,
        fileContent
      })
    ).toEqual({
      fileContent,
      isLoading: false,
      error: null
    });
  });

  it("FETCH_FILE_CONTENT_FAILURE", () => {
    expect(
      reducer(undefined, {
        type: actionTypes.FETCH_FILE_CONTENT_FAILURE,
        error
      })
    ).toEqual({
      fileContent: [],
      isLoading: false,
      error
    });
  });
});
