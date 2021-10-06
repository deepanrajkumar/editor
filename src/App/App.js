import React from "react";
import Styled from "styled-components";
import "./styles.css";
import "../Configs";
import MainContainer from "../Modules/MainContainer";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const Title = Styled.h2`
  font-size: 1.5em;
  text-align: center;
`;

const App = () => {
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: "dark",
        },
      }),
    []
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <div>
        <Title>Home server</Title>
        <MainContainer />
      </div>
    </ThemeProvider>
  );
};

export default App;
