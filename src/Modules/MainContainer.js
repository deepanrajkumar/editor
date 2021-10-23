import React from "react";
import { Box } from "@mui/material";
import Notes from "./Notes";

const MainContainer = ({ setLoader }) => {
  return (
    <Box>
      <Notes setLoader={setLoader} />
    </Box>
  );
};

MainContainer.propTypes = {};

export default MainContainer;
