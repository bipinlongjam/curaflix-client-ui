import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";

import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import axios from "../../utils/axiosConfig";
import { toast } from "react-toastify";

const LaboratoryParametersPage = () => {
  const [parameters, setParameters] = useState([]);
  const [newParam, setNewParam] = useState("");

  const [editOpen, setEditOpen] = useState(false);
  const [editParam, setEditParam] = useState({ id: null, name: "" });

  const loadParameters = async () => {
    const res = await axios.get("/api/laboratory/parameters");
    setParameters(res.data.data);
  };

  useEffect(() => {
    loadParameters();
  }, []);

  const addParameter = async () => {
    try {
      await axios.post("/api/laboratory/parameters/add", { name: newParam });
      toast.success("Parameter added");
      setNewParam("");
      loadParameters();
    } catch {
      toast.error("Failed to add");
    }
  };

  const updateParameter = async () => {
    try {
      await axios.put(`/api/laboratory/parameters/update/${editParam.id}`, {
        name: editParam.name,
      });
      toast.success("Updated");
      setEditOpen(false);
      loadParameters();
    } catch {
      toast.error("Failed to update");
    }
  };

  const deleteParameter = async (id) => {
    if (!window.confirm("Delete parameter?")) return;
    try {
      await axios.delete(`/api/laboratory/parameters/${id}`);
      toast.success("Deleted");
      loadParameters();
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 1, fontSize: 16 }}>
        Laboratory Parameters
      </Typography>

      {/* Add New */}
      <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
        <TextField
          size="small"
          label="New Parameter"
          value={newParam}
          sx={{ "& .MuiInputBase-root": { fontSize: 13 } }}
          onChange={(e) => setNewParam(e.target.value)}
        />
        <Button variant="contained" size="small">
          Add
        </Button>
      </Box>

      {/* Table */}
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: 13 }}><b>#</b></TableCell>
            <TableCell sx={{ fontSize: 13 }}><b>Parameter</b></TableCell>
            <TableCell sx={{ fontSize: 13 }} align="center">
              <b>Actions</b>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {parameters.map((p, index) => (
            <TableRow key={p.id} hover>
              <TableCell sx={{ fontSize: 13 }}>{index + 1}</TableCell>
              <TableCell sx={{ fontSize: 13 }}>{p.name}</TableCell>

              <TableCell align="center">
                <IconButton
                  size="small"
                  color="primary"
                  onClick={() => {
                    setEditParam(p);
                    setEditOpen(true);
                  }}
                >
                  <DriveFileRenameOutlineIcon fontSize="small" />
                </IconButton>

                <IconButton
                  size="small"
                  color="error"
                  onClick={() => deleteParameter(p.id)}
                >
                  <DeleteForeverIcon fontSize="small" />
                </IconButton>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle sx={{ fontSize: 15 }}>
          Edit Parameter
        </DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            size="small"
            label="Parameter Name"
            value={editParam.name}
            sx={{ "& .MuiInputBase-root": { fontSize: 13 } }}
            onChange={(e) =>
              setEditParam({ ...editParam, name: e.target.value })
            }
          />
        </DialogContent>

        <DialogActions>
          <Button size="small" onClick={() => setEditOpen(false)}>
            Cancel
          </Button>
          <Button size="small" variant="contained" onClick={updateParameter}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LaboratoryParametersPage;
