import React from "react";
import styled from "styled-components";
import Spinner from "../../../assets/images/spinner.gif";

const Loader = () => {
  return (
    <StyledLoader>
      <img src={Spinner} alt="loading" />
    </StyledLoader>
  );
};

const StyledLoader = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  background: 50% 50% no-repeat rgb(249, 249, 249, 0.5);
`;

export default Loader;
