import React, { useState } from "react";
import Styled from "styled-components";
import "./styles.css";
import "../Configs";
import MainContainer from "../Modules/MainContainer";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  LinearProgress,
} from "@mui/material";

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

  const [loader, setLoader] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <div style={{ height: "4px" }}>{loader && <LinearProgress />}</div>
        <Title>Home server</Title>
        <MainContainer setLoader={(status) => setLoader(status)} />
      </div>
    </ThemeProvider>
  );
};

export default App;
