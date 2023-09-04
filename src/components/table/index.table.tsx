import React, { useState, FC, useEffect } from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableSortLabel from "@mui/material/TableSortLabel";
import Button from "@mui/material/Button";

interface Props {
  tabledata: any[]; //need to define exact object structure of the api response
}

export const TableWithSorting: FC<Props> = ({ tabledata }) => {
  const [data, setData] = useState(tabledata);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const rowStyle = { width: "158px" };

  useEffect(() => {
    setData(tabledata);
  }, [tabledata]);
  const handleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const createAccountButton = () => {
    return (
      <Button size="small" variant="contained" disableElevation>
        Create Account
      </Button>
    );
  };

  const sortedRows = data.sort((a, b) => {
    const _a = a?.card?.cardNumber;
    const _b = b?.card?.cardNumber;
    // equal items sort equally
    if (_a === _b) {
      return 0;
    }

    // nulls sort after anything else
    if (_a === null) {
      return 1;
    }
    if (_b === null) {
      return -1;
    }

    // otherwise, if we're ascending, lowest sorts first
    if (sortOrder === "asc") {
      return _a < _b ? -1 : 1;
    }

    // if descending, highest sorts first
    return _a < _b ? 1 : -1;
  });

  useEffect(() => {
    if (data.length > 0) {
      setData(sortedRows);
    }
  }, [sortOrder]);

  return (
    <Table
      style={{
        background: "white",
        margin: 20,
        padding: 20,
        borderRadius: 8,
        width: "97%",
      }}
    >
      <TableHead>
        <TableRow>
          <TableCell style={rowStyle}>Customer Name</TableCell>
          <TableCell style={rowStyle}>
            <TableSortLabel
              active={true}
              direction={sortOrder}
              onClick={handleSort}
            >
              Card No.
            </TableSortLabel>
          </TableCell>
          <TableCell style={rowStyle}>Email</TableCell>
          <TableCell style={rowStyle}>Mobile No.</TableCell>
          <TableCell style={rowStyle}>Card Network</TableCell>
          <TableCell style={rowStyle}>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data?.length > 0 &&
          data.map((item, index) => {
            const { card, customer, account } = item ?? {
              card: {},
              customer: {},
            };
            const { cardNumber, network } = card || {};
            const { fullName, emailId, mobileNumber } = customer || {};
            return (
              <TableRow key={index}>
                <TableCell style={rowStyle}>{fullName}</TableCell>
                <TableCell style={rowStyle}>{cardNumber}</TableCell>
                <TableCell style={rowStyle}>{emailId}</TableCell>
                <TableCell style={rowStyle}>{mobileNumber}</TableCell>
                <TableCell style={rowStyle}>{network}</TableCell>
                <TableCell style={rowStyle}>
                  {!account && createAccountButton()}
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
};
