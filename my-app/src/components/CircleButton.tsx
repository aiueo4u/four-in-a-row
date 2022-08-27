import * as React from "react";

import { Box } from "@mui/material";

export const CircleButton = ({
  color,
}: {
  color: "hole" | "red" | "green";
}) => {
  const bgcolor = color === "hole" ? "grey.200" : color;

  return (
    <Box
      sx={{
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        bgcolor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    />
  );
};
