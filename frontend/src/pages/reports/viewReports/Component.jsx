import React from "react";
import ReportsFunc from "./Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { formatCase } from "../../../utils/helpers";
import { Button } from "@mui/material";

export default function Reports() {
  const { reports, editReport, deleteReport, tableHeader } = ReportsFunc();
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#e0e0e0" }}>
            {tableHeader.map((each) => {
              return (
                <TableCell align="center" key={each}>
                  {formatCase(each)}
                </TableCell>
              );
            })}
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reports.map((row) => (
            <TableRow
              key={row.report_name}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "&:hover": { backgroundColor: "#f5f5f5", cursor: "pointer" },
              }}
            >
              {tableHeader.map((each) => {
                if (each == "report_type")
                  return (
                    <TableCell align="center" key={row?.[each]}>
                      {row?.[each]?.type}
                    </TableCell>
                  );
                return (
                  <TableCell align="center" key={row?.[each]}>
                    {row?.[each]}
                  </TableCell>
                );
              })}
              <TableCell align="center">
                <Button onClick={() => editReport(row)}>Edit</Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => deleteReport(row?._id)}
                  
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
