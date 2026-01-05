import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography, Grid } from "@mui/material";
import axios from "../../../utils/axiosConfig";
import { toast } from "react-toastify";

const GeneralPhysicalExamForm = ({ userId }) => {
  const [historyId, setHistoryId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    height: "",
    weight: "",
    bmi: "",
    pulse: "",
    blood_pressure: "",
    respiratory_rate: "",
    temperature: "",
    pallor: "",
    icterus: "",
    cyanosis: "",
    clubbing: "",
    lymphadenopathy: "",
    edema: "",
    remarks: ""
  });

  const smallField = {
    "& .MuiInputBase-root": { fontSize: 13 },
    "& .MuiInputLabel-root": { fontSize: 13 },
  };

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    axios
      .get(`/api/gpe/get/${userId}`)
      .then(res => {
        const data = res.data?.data;
        if (data && data.length > 0) {
          setForm(data[0]);
          setHistoryId(data[0].id);
        }
      })
      .finally(() => setLoading(false));
  }, [userId]);

  const handleSave = async () => {
    try {
      if (historyId) {
        await axios.put(`/api/gpe/update/${historyId}`, form);
        toast.success("General Physical Examination updated!");
      } else {
        await axios.post(`/api/gpe/add`, {
          user_id: userId,
          ...form
        });
        toast.success("General Physical Examination saved!");
      }
    } catch {
      toast.error("Error saving General Physical Examination");
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>

      <Grid container spacing={1}>
        <Grid item xs={6}>
          <TextField label="Height" size="small" sx={smallField}
            value={form.height}
            onChange={e => handleChange("height", e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <TextField label="Weight" size="small" sx={smallField}
            value={form.weight}
            onChange={e => handleChange("weight", e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <TextField label="BMI" size="small" sx={smallField}
            value={form.bmi}
            onChange={e => handleChange("bmi", e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <TextField label="Pulse" size="small" sx={smallField}
            value={form.pulse}
            onChange={e => handleChange("pulse", e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <TextField label="Blood Pressure" size="small" sx={smallField}
            value={form.blood_pressure}
            onChange={e => handleChange("blood_pressure", e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <TextField label="Respiratory Rate" size="small" sx={smallField}
            value={form.respiratory_rate}
            onChange={e => handleChange("respiratory_rate", e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <TextField label="Temperature" size="small" sx={smallField}
            value={form.temperature}
            onChange={e => handleChange("temperature", e.target.value)}
            fullWidth
          />
        </Grid>
      </Grid>

      <Typography sx={{ fontWeight: "bold", mt: 1, fontSize: 14 }}>
        General Signs
      </Typography>

      <Grid container spacing={1}>
        <Grid item xs={4}>
          <TextField label="Pallor" size="small" sx={smallField}
            value={form.pallor}
            onChange={e => handleChange("pallor", e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={4}>
          <TextField label="Icterus" size="small" sx={smallField}
            value={form.icterus}
            onChange={e => handleChange("icterus", e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={4}>
          <TextField label="Cyanosis" size="small" sx={smallField}
            value={form.cyanosis}
            onChange={e => handleChange("cyanosis", e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={4}>
          <TextField label="Clubbing" size="small" sx={smallField}
            value={form.clubbing}
            onChange={e => handleChange("clubbing", e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={4}>
          <TextField label="Lymphadenopathy" size="small" sx={smallField}
            value={form.lymphadenopathy}
            onChange={e => handleChange("lymphadenopathy", e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={4}>
          <TextField label="Edema" size="small" sx={smallField}
            value={form.edema}
            onChange={e => handleChange("edema", e.target.value)}
            fullWidth
          />
        </Grid>
      </Grid>

      <TextField
        label="Remarks"
        size="small"
        multiline
        minRows={2}
        sx={smallField}
        value={form.remarks}
        onChange={e => handleChange("remarks", e.target.value)}
      />

      <Button variant="contained" sx={{ mt: 1 }} onClick={handleSave}>
        {historyId ? "Update" : "Save"}
      </Button>

    </Box>
  );
};

export default GeneralPhysicalExamForm;
