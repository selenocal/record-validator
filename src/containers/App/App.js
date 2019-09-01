import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";

import { fetchFileContent } from "../../store/actions/fileActions";
import UploadFile from "../../components/UploadFile/UploadFile";
import Loader from "../../components/UI/Loader/Loader";
import Container from "../../components/UI/Container/Container";
import RecordList from "../../components/RecordList/RecordList";

class App extends Component {
  render() {
    const { isLoading, fileContent } = this.props;
    return (
      <Wrapper>
        {isLoading && <Loader />}
        <UploadFile fetchFileContent={this.props.fetchFileContent} />
        <Content>
          <Container>
            <RecordList records={fileContent} />
          </Container>
        </Content>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Content = styled.div`
  background-color: #f1f1f1;
  padding-top: 16px;
  padding-bottom: 16px;
  height: 100%;
  overflow: auto;
`;

App.propTypes = {
  fetchFileContent: PropTypes.func.isRequired,
  fileContent: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object
};

App.defaultProps = {
  error: null
};

const mapStateToProps = state => ({
  fileContent: state.fileContent.fileContent,
  isLoading: state.fileContent.isLoading,
  error: state.fileContent.error
});

export default connect(
  mapStateToProps,
  { fetchFileContent }
)(App);
