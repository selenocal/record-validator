import React, { Component } from "react";
import styled from "styled-components";
import Container from "../UI/Container/Container";

class UploadFile extends Component {
  state = {
    fileContent: []
  };

  fileReader = new FileReader();

  handleFileRead = e => {
    const { fileContent } = this.state;
    const { fetchFileContent } = this.props;
    const content = this.fileReader.result;
    fetchFileContent(content, fileContent.type.split("/")[1]);
  };

  getResults = () => {
    const { fileContent } = this.state;
    this.fileReader.onloadend = this.handleFileRead;
    this.fileReader.readAsText(fileContent, "utf8");
  };

  render() {
    return (
      <Wrapper>
        <Container>
          <Upload>
            <ChooseFileSpan>
              <input
                type="file"
                name="myFile"
                accept=".csv,.xml"
                onChange={event =>
                  this.setState({ fileContent: event.target.files[0] })
                }
              />
            </ChooseFileSpan>
            <Button type="button" onClick={this.getResults}>
              Results
            </Button>
          </Upload>
        </Container>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  background-color: #f1f1f1;
`;

const ChooseFileSpan = styled.span`
  margin-left: 45px;
`;

const Upload = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 30px;

  @media (min-width: 720px) {
    flex-direction: row;
  }
`;

const Button = styled.button`
  height: 25px;
  font-size: 12px;
  width: 200px;
  color: #fff;
  text-align: center;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
  background: #f1c40f;
  border: 0;
  border-radius: 5px;
  border-bottom: 2px solid #e2b607;
  cursor: pointer;
  box-shadow: inset 0 -2px #e2b607;
  margin: 10px;
`;

export default UploadFile;
