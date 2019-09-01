import * as actionTypes from "./actionTypes";
const XMLParser = require("react-xml-parser");
const csv = require("csvtojson");

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
        if (fileExt === "csv") {
          resolve(getCsvFileContent(fileContent));
        } else {
          resolve(getXmlFileContent(fileContent));
        }
      }
    }, 2000);
  });
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

function getCsvFileContent(fileContent) {
  csv({
    noheader: true,
    output: "csv"
  })
    .fromString(fileContent)
    .then(csvRow => {
      const arr = csvRow.filter(a => {
        return a[0] !== "Reference";
      });
      const list = arr.filter(record => {
        let fixed = handleFloatNumber(record[3], record[4]);
        return (
          eval(record[3] + record[4]).toFixed(fixed) !==
          parseFloat(record[5]).toFixed(fixed)
        );
      });
      const uniqueReferenceNumbers = Array.from(
        new Set(list.map(rn => rn[0]))
      ).map(ref => {
        return list.find(rn => rn[0] === ref);
      });
      return uniqueReferenceNumbers;
    });
}

function getXmlFileContent(fileContent) {
  const json = new XMLParser().parseFromString(fileContent);
  const list = json.children.filter(record => {
    const start = record.children[2].value;
    const mutation = record.children[3].value;
    const fixed = handleFloatNumber(start, mutation);
    return (
      eval(start + mutation).toFixed(fixed) !==
      parseFloat(record.children[4].value).toFixed(fixed)
    );
  });

  const uniqueReferenceNumbers = Array.from(
    new Set(list.map(rn => rn.attributes.reference))
  ).map(ref => {
    return list.find(rn => rn.attributes.reference === ref);
  });
  return uniqueReferenceNumbers;
}
