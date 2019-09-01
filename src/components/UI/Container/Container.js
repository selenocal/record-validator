import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = ({ children }) => <ContainerDiv>{children}</ContainerDiv>;

const ContainerDiv = styled.div`
  max-width: 1100px;
  display: flex;
  margin: 0 auto;
`;

Container.propTypes = {
  children: PropTypes.node
};

export default Container;
