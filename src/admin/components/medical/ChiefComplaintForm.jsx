import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from '../../../utils/axiosConfig';


const ChiefComplaintForm = ({ userId }) => {
  const [complaint, setComplaint] = useState("");
  const [complaintId, setComplaintId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/chief-complaints/get/${userId}`)
      .then((res) => {
        const data = res.data?.data;

        if (data && data.length > 0) {
          setComplaint(data[0].complaint);
          setComplaintId(data[0].id); // store complaint id for update
        }
      })
      .catch(() => {
        console.log("No complaint found");
      })
      .finally(() => setLoading(false));
  }, [userId]);

  const handleSave = async () => {
    try {
      if (complaintId) {
        // UPDATE
        await axios.put(`/api/chief-complaints/update/${complaintId}`, {
          complaint,
        });
        alert("Chief complaint updated!");
      } else {
        // CREATE
        await axios.post(`/api/chief-complaints/add`, {
          user_id: userId,
          complaint,
        });
        alert("Chief complaint saved!");
      }
    } catch (err) {
      alert("Error saving chief complaint.");
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        label="Chief Complaint"
        fullWidth
        multiline
        minRows={3}
        value={complaint}
        onChange={(e) => setComplaint(e.target.value)}
      />

      <Button variant="contained" onClick={handleSave}>
        {complaintId ? "Update" : "Save"}
      </Button>
    </Box>
  );
};

export default ChiefComplaintForm;
