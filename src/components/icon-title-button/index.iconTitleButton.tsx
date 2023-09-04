import React, { FC } from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

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
  CustomIcon?: FC<any>;
  textCustomStyle?: object;
  boxCustomStyle?: object;
  gutterBottom?: boolean;
  isSelected: boolean;
  onClick?: (value: string) => void;
};

export const IconTitleButton: React.FC<Dtos> = ({
  type = "body1",
  title = "",
  CustomIcon,
  textCustomStyle = {},
  boxCustomStyle = {},
  gutterBottom = false,
  isSelected = false,
  onClick = (_: string) => {},
}) => {
  const showIcon = !!CustomIcon;
  const _onClick = () => {
    onClick(title);
  };
  return (
    <div
      style={{
        border: "1px solid #e0e0e0", // Add an outline by setting the border
        borderRadius: 8,
        padding: "8px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: isSelected ? "grey" : "white",
        ...boxCustomStyle,
      }}
      onClick={_onClick}
    >
      {showIcon && <CustomIcon />}
      <Typography
        variant={type}
        gutterBottom={gutterBottom}
        style={{ marginLeft: showIcon ? 4 : 0, ...textCustomStyle }}
      >
        {title}
      </Typography>
    </div>
  );
};
