import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "../../../utils/axiosConfig";

const PatientHistoryForm = ({ userId }) => {
  const [form, setForm] = useState({
    medical_history: "",
    surgical_history: "",
    hospitalization: "",
    blood_transfusion: ""
  });

  const [historyId, setHistoryId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/history/get/${userId}`)
      .then(res => {
        const data = res.data?.data;
        if (data && data.length > 0) {
          setForm({
            medical_history: data[0].medical_history || "",
            surgical_history: data[0].surgical_history || "",
            hospitalization: data[0].hospitalization || "",
            blood_transfusion: data[0].blood_transfusion || ""
          });
          setHistoryId(data[0].id);
        }
      })
      .finally(() => setLoading(false));
  }, [userId]);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      if (historyId) {
        await axios.put(`/api/history/update/${historyId}`, form);
        alert("Patient history updated!");
      } else {
        await axios.post(`/api/history/add`, {
          user_id: userId,
          ...form
        });
        alert("Patient history saved!");
      }
    } catch (err) {
      alert("Error saving patient history");
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      
      <TextField
        label="Medical History"
        multiline
        minRows={3}
        value={form.medical_history}
        onChange={(e) => handleChange("medical_history", e.target.value)}
      />

      <TextField
        label="Surgical History"
        multiline
        minRows={3}
        value={form.surgical_history}
        onChange={(e) => handleChange("surgical_history", e.target.value)}
      />

      <TextField
        label="Hospitalization"
        multiline
        minRows={3}
        value={form.hospitalization}
        onChange={(e) => handleChange("hospitalization", e.target.value)}
      />

      <TextField
        label="History of Blood Transfusion"
        multiline
        minRows={3}
        value={form.blood_transfusion}
        onChange={(e) => handleChange("blood_transfusion", e.target.value)}
      />

      <Button variant="contained" onClick={handleSave}>
        {historyId ? "Update" : "Save"}
      </Button>
    </Box>
  );
};

export default PatientHistoryForm;
