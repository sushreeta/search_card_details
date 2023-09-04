import React from "react";
import Typography from "@mui/material/Typography";

type Dtos = {
  type:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "button"
    | "caption"
    | "overline";
  // | "inherit" // inherit the typography variant from its parent element
  // | "allCaps";
  title: string;
  customStyle?: object;
  gutterBottom?: boolean;
};

export const TypographyCustom: React.FC<Dtos> = ({
  type = "body1",
  title = "",
  customStyle = {},
  gutterBottom = false,
}) => {
  return (
    <div>
      <Typography
        variant={type}
        gutterBottom={gutterBottom}
        style={customStyle}
      >
        {title}
      </Typography>
    </div>
  );
};
