// src/components/SearchBar.tsx
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import debounce from "lodash/debounce";

interface SearchBarProps {
  onSearch: (_: object) => void;
  isfullWidth?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  isfullWidth = false,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchTerm(query);

    // Debounce the search function to reduce the number of requests
    debouncedSearch(query);
  };

  // Create a debounced search function with lodash debounce
  const debouncedSearch = debounce((query: string) => {
    onSearch({ value: query, offset: 0, limit: 50 });
  }, 300);

  return (
    <TextField
      sx={{ minWidth: 280 }}
      label="Search"
      variant="outlined"
      fullWidth={isfullWidth}
      value={searchTerm}
      onChange={handleSearch}
    />
  );
};
