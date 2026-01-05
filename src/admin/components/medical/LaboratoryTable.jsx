import React, { useEffect, useState } from "react";
import {
  Table, TableHead, TableRow, TableCell, TableBody,
  Button, TextField, Box
} from "@mui/material";
import axios from "../../../utils/axiosConfig";
import { toast } from "react-toastify";

const LaboratoryTable = ({ userId }) => {
  const [rows, setRows] = useState([]);
  const [parameters, setParameters] = useState([]);

  const [newRow, setNewRow] = useState({
    parameter_id: "",
    value: "",
    lab_name: "",
    report_date: ""
  });

  useEffect(() => {
    loadParameters();
    loadData();
  }, [userId]);

  const loadParameters = async () => {
    const res = await axios.get("/api/laboratory/parameters");
    setParameters(res.data.data);
  };

  const loadData = async () => {
    const res = await axios.get(`/api/laboratory/get/${userId}`);
    setRows(res.data.data);
  };

  const addRow = async () => {
    try {
      await axios.post("/api/laboratory/add", {
        user_id: userId,
        ...newRow
      });
      toast.success("Added!");
      loadData();
    } catch {
      toast.error("Failed!");
    }
  };

  return (
    <Box>

      <Box sx={{ display:"flex", gap:1, mb:2 }}>
        <select
          value={newRow.parameter_id}
          onChange={(e) => setNewRow({ ...newRow, parameter_id:e.target.value })}
        >
          <option>Select Parameter</option>
          {parameters.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>

        <TextField size="small" label="Value"
          onChange={e => setNewRow({ ...newRow, value:e.target.value })}
        />

        <TextField size="small" label="Lab Name"
          onChange={e => setNewRow({ ...newRow, lab_name:e.target.value })}
        />

        <TextField size="small" type="date"
          onChange={e => setNewRow({ ...newRow, report_date:e.target.value })}
        />

        <Button variant="contained" onClick={addRow}>
          Add
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Parameter</b></TableCell>
            <TableCell><b>Value</b></TableCell>
            <TableCell><b>Lab</b></TableCell>
            <TableCell><b>Date</b></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map(r => (
            <TableRow key={r.id}>
              <TableCell>{r.parameter}</TableCell>
              <TableCell>{r.value}</TableCell>
              <TableCell>{r.lab_name}</TableCell>
              <TableCell>{r.report_date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </Box>
  );
};

export default LaboratoryTable;
