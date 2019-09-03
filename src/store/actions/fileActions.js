import * as actionTypes from "./actionTypes";
import * as CSV from "csv-string";
const XMLParser = require("react-xml-parser");

export const fetchFileContent = (
  fileContent = [],
  fileExt = ""
) => dispatch => {
  dispatch({
    type: actionTypes.FETCH_FILE_CONTENT_REQUEST
  });
  getFileContent(fileContent, fileExt)
    .then(res => {
      dispatch({
        type: actionTypes.FETCH_FILE_CONTENT_SUCCESS,
        fileContent: res || []
      });
    })
    .catch(error => {
      console.log("error", error);
      dispatch({
        type: actionTypes.FETCH_FILE_CONTENT_FAILURE,
        error
      });
    });
};

function getFileContent(fileContent, fileExt) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const rand = Math.random * 100;
      if (rand === 0) {
        reject("error message");
      } else {
        if (fileExt === "csv" || fileExt === "vnd.ms-excel") {
          resolve(getCsvFileContent(fileContent));
        } else {
          resolve(getXmlFileContent(fileContent));
        }
      }
    }, 2000);
  });
}

function getCsvFileContent(fileContent) {
  const csvContent = CSV.parse(fileContent).filter(
    content => content[0] !== "Reference"
  );

  const refList = csvContent.reduce((list, el) => {
    list[el[0]] = el[0] in list ? ++list[el[0]] : 0;
    return list;
  }, {});

  const nonUniqueRefList = csvContent.filter(el => refList[el[0]]);
  const balanceList = csvContent.filter(record => {
    const fixed = handleFloatNumber(record[3], record[4]);
    return (
      mathOperation[record[4].charAt(0)](
        record[3],
        record[4].substr(1)
      ).toFixed(fixed) !== parseFloat(record[5]).toFixed(fixed)
    );
  });
  const result = [...nonUniqueRefList, ...balanceList];
  return result;
}

function getXmlFileContent(fileContent) {
  const json = new XMLParser().parseFromString(fileContent);
  const refList = json.children.reduce((list, el) => {
    list[el.attributes.reference] =
      el.attributes.reference in list ? ++list[el.attributes.reference] : 0;
    return list;
  }, {});

  const nonUniqueRefList = json.children.filter(
    el => refList[el.attributes.reference]
  );

  const balanceList = json.children.filter(record => {
    const start = record.children[2].value;
    const mutation = record.children[3].value;
    const fixed = handleFloatNumber(start, mutation);
    return (
      mathOperation[mutation.charAt(0)](start, mutation.substr(1)).toFixed(
        fixed
      ) !== parseFloat(record.children[4].value).toFixed(fixed)
    );
  });
  const result = [...nonUniqueRefList, ...balanceList];
  return result;
}

function handleFloatNumber(startBalance, mutation) {
  const startFixed =
    startBalance.indexOf(".") === -1 ? 0 : startBalance.split(".")[1].length;
  const mutationFixed =
    mutation.indexOf(".") === -1 ? 0 : mutation.split(".")[1].length;
  let fixed = 0;
  if (startFixed >= mutationFixed) {
    fixed = startFixed;
  } else {
    fixed = mutationFixed;
  }
  return fixed;
}

const mathOperation = {
  "+": function(x, y) {
    return parseFloat(x) + parseFloat(y);
  },
  "-": function(x, y) {
    return parseFloat(x) - parseFloat(y);
  }
};
