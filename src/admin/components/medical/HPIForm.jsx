import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "../../../utils/axiosConfig";

const HPIForm = ({ userId }) => {
  const [illness, setIllness] = useState("");
  const [hpiId, setHpiId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/hpi/get/${userId}`)
      .then((res) => {
        const data = res.data?.data;

        if (data && data.length > 0) {
          setIllness(data[0].patiendillness);
          setHpiId(data[0].id);
        }
      })
      .finally(() => setLoading(false));
  }, [userId]);

  const handleSave = async () => {
    try {
      if (hpiId) {
        await axios.put(`/api/hpi/update/${hpiId}`, {
          patiendillness: illness,
        });
        alert("History Updated!");
      } else {
        await axios.post(`/api/hpi/add`, {
          user_id: userId,
          patiendillness: illness,
        });
        alert("History Saved!");
      }
    } catch (err) {
      alert("Error saving history");
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        label="History of Present Illness"
        multiline
        minRows={4}
        fullWidth
        value={illness}
        onChange={(e) => setIllness(e.target.value)}
      />

      <Button variant="contained" onClick={handleSave}>
        {hpiId ? "Update" : "Save"}
      </Button>
    </Box>
  );
};

export default HPIForm;
