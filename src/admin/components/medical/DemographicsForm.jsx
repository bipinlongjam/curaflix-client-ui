import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography, MenuItem } from "@mui/material";
import axios from '../../../utils/axiosConfig';

const DemographicsForm = ({ userId }) => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    sex: "",
    address: "",
    occupation: "",
    marital_status: "",
    religion: "",
    socioeconomic_status: "",
    reliability_of_information: "",
  });

  const [loading, setLoading] = useState(true);
  const [exists, setExists] = useState(false);


useEffect(() => {
  if (!userId) return;

  axios
    .get(`/api/admin/demographic/getuser/${userId}`)
    .then((res) => {
      if (res.data?.data) {
        setForm(res.data.data);
        setExists(true);
      }
    })
    .catch(() => setExists(false))
    .finally(() => setLoading(false));
}, [userId]);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 
  const handleCreate = async () => {
    try {
     await axios.post(`/api/admin/demographic/add-data`, {
        user_id: userId,
        ...form,
      });

      alert("Demographics created successfully!");
      setExists(true);
    } catch (err) {
      alert("Error creating demographics");
    }
  };

  /**
   * UPDATE
   */
  const handleUpdate = async () => {
    try {
     await axios.put(`/api/admin/demographic/update/${userId}`, form);
      alert("Demographics updated successfully!");
    } catch (err) {
      alert("Error updating demographics");
    }
  };

  
  const handleDelete = async () => {
    if (!window.confirm("Delete demographic record?")) return;

    try {
     await axios.delete(`/api/admin/demographic/delete/${userId}`);
      alert("Deleted successfully!");

      setForm({
        name: "",
        age: "",
        sex: "",
        address: "",
        occupation: "",
        marital_status: "",
        religion: "",
        socioeconomic_status: "",
        reliability_of_information: "",
      });

      setExists(false);
    } catch {
      alert("Error deleting record");
    }
  };


  return (
    <Box
      sx={{
        display: "grid",
        gap: 2,
        gridTemplateColumns: "1fr 1fr",
        mt: 1,
      }}
    >
      {/* Name */}
      <TextField
        label="Name"
        name="name"
        value={form.name || ""}
        onChange={handleChange}
        fullWidth
      />

      {/* Age */}
      <TextField
        label="Age"
        name="age"
        value={form.age || ""}
        onChange={handleChange}
        type="number"
        fullWidth
      />

      {/* Sex */}
      <TextField
        select
        label="Sex"
        name="sex"
        value={form.sex || ""}
        onChange={handleChange}
        fullWidth
      >
        <MenuItem value="Male">Male</MenuItem>
        <MenuItem value="Female">Female</MenuItem>
        <MenuItem value="Other">Other</MenuItem>
      </TextField>

      {/* Address */}
      <TextField
        label="Address"
        name="address"
        value={form.address || ""}
        onChange={handleChange}
        fullWidth
        multiline
      />

      {/* Occupation */}
      <TextField
        label="Occupation"
        name="occupation"
        value={form.occupation || ""}
        onChange={handleChange}
        fullWidth
      />

      {/* Marital Status */}
      <TextField
        label="Marital Status"
        name="marital_status"
        value={form.marital_status || ""}
        onChange={handleChange}
        fullWidth
      />

      {/* Religion */}
      <TextField
        label="Religion"
        name="religion"
        value={form.religion || ""}
        onChange={handleChange}
        fullWidth
      />

      {/* Socioeconomic Status */}
      <TextField
        label="Socioeconomic Status"
        name="socioeconomic_status"
        value={form.socioeconomic_status || ""}
        onChange={handleChange}
        fullWidth
      />

      {/* Reliability */}
      <TextField
        select
        label="Reliability of Information"
        name="reliability_of_information"
        value={form.reliability_of_information || ""}
        onChange={handleChange}
        fullWidth
      >
        <MenuItem value={1}>Reliable</MenuItem>
        <MenuItem value={0}>Not Reliable</MenuItem>
      </TextField>

      {/* ACTION BUTTONS */}
      <Box sx={{ gridColumn: "1 / -1", textAlign: "right" }}>
        {!exists ? (
          <Button variant="contained" onClick={handleCreate}>
            Save
          </Button>
        ) : (
          <>
            <Button
              variant="contained"
              color="primary"
              sx={{ mr: 1 }}
              onClick={handleUpdate}
            >
              Update
            </Button>

            <Button variant="outlined" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default DemographicsForm;
