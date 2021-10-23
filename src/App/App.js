import React, { useState } from "react";
import "../Configs";
import MainContainer from "../Modules/MainContainer";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  LinearProgress,
} from "@mui/material";

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
        <MainContainer setLoader={(status) => setLoader(status)} />
      </div>
    </ThemeProvider>
  );
};

export default App;
