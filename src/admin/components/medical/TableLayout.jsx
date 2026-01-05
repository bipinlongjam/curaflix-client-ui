import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  IconButton,
  Typography,
  Box
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

/**
 * Reusable Table Component
 *
 * Props:
 * - columns   : Array → [{ key, label }]
 * - data      : Array → table rows
 * - onEdit    : Function → edit handler
 * - onDelete  : Function → delete handler
 */

const TableLayout = ({ columns, data, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ background: "#f5f5f5" }}>
            {columns.map((col) => (
              <TableCell key={col.key}>
                <b>{col.label}</b>
              </TableCell>
            ))}
            <TableCell>
              <b>Actions</b>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.length > 0 ? (
            data.map((row) => (
              <TableRow key={row.id} hover>
                {columns.map((col) => (
                  <TableCell key={col.key}>
                    {row[col.key]}
                  </TableCell>
                ))}

                <TableCell>
                  <IconButton color="primary" onClick={() => onEdit(row)}>
                    <EditIcon />
                  </IconButton>

                  <IconButton color="error" onClick={() => onDelete(row.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length + 1}>
                <Typography
                  sx={{
                    textAlign: "center",
                    py: 2,
                    color: "gray"
                  }}
                >
                  No data found
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableLayout;
