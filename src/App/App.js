import React from "react";
import Styled from "styled-components";
import CheckApis from "../Modules/CheckApis";
import "./styles.css";

const Title = Styled.h2`
  font-size: 1.5em;
  text-align: center;
  color: red;
`;

const App = () => {
  return (
    <div>
      <Title>Notes</Title>
      <CheckApis />
    </div>
  );
};

export default App;
