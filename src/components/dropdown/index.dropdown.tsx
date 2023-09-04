import { useState, FC, ReactNode } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { TypographyCustom } from "../index.components";

type Dtos = {
  labelT: string;
  options: string[];
  defaultSelected: string;
};

export const Dropdown: FC<Dtos> = ({
  labelT = "Select an Option",
  options,
  defaultSelected = "",
}) => {
  const [selectedValue, setSelectedValue] = useState<string>(defaultSelected);

  const handleChange: (
    event: SelectChangeEvent<string>,
    child: ReactNode
  ) => void = (event, child) => {
    setSelectedValue(event.target.value as string);
  };

  return (
    <FormControl variant="outlined" style={{ width: "200px" }}>
      <InputLabel id="dropdown-label">{labelT}</InputLabel>
      <Select
        labelId="dropdown-label"
        id="dropdown"
        value={selectedValue}
        onChange={handleChange}
        label={labelT}
      >
        {/* <MenuItem value="">None</MenuItem>{" "} */}
        {/* Add this if you want an initial "None" option, I assume there is no such scenaio */}
        {options.map((item: string) => {
          return (
            <>
              <MenuItem value={item}>{item}</MenuItem>
              {/* This can be further customized */}
              <TypographyCustom
                type={"caption"}
                title={"dfgertg"}
                customStyle={{ alignSelf: "flex-start", marginTop: 4 }}
              />
            </>
          );
        })}
      </Select>
    </FormControl>
  );
};
