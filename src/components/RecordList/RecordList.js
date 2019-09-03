import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const RecordList = ({ records }) => {
  return (
    <Wrapper>
      <TableContainer>
        {records.length > 0 ? (
          <Table>
            <thead>
              <tr>
                <th>Reference</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {records.map(record => (
                <tr
                  key={
                    record.attributes
                      ? record.attributes.reference + record.children[0].value
                      : record[0] + record[1]
                  }
                >
                  <td>
                    {record.attributes
                      ? record.attributes.reference
                      : record[0]}
                  </td>
                  <td>
                    {record.children ? record.children[1].value : record[2]}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <WarningText>No results</WarningText>
        )}
      </TableContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  border: 1px solid #c7c8c8;
  background: white;
`;

const TableContainer = styled.div`
  padding: 16px;
`;

const Table = styled.table`
  width: 100%;
  thead {
    background-color: #f8f8f8;
  }
  th {
    border: 1px solid #ececec;
    text-transform: capitalize;
    padding: 5px 15px;
    font-size: 16px;
  }
  td {
    text-align: center;
    vertical-align: middle;
    padding: 15px 15px 10px;
    border-bottom: 1px solid #ececec;
    color: #1f2223;
    font-size: 16px;
  }
`;

const WarningText = styled.div`
  text-align: center;
`;

RecordList.propTypes = {
  records: PropTypes.array
};

RecordList.defaultProps = {
  records: []
};
export default RecordList;
