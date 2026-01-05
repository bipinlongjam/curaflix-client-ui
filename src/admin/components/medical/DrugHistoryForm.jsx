import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "../../../utils/axiosConfig";
import { toast } from "react-toastify";

const DrugHistoryForm = ({ userId }) => {
  const [historyId, setHistoryId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    current_medication: "",
    long_term_drugs: "",
    otc_drugs: "",
    alternative_medications: ""
  });

  const smallField = {
    "& .MuiInputBase-root": { fontSize: 13 },
    "& .MuiInputLabel-root": { fontSize: 13 }
  };

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    axios.get(`/api/drug-history/get/${userId}`)
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
        await axios.put(`/api/drug-history/update/${historyId}`, form);
        toast.success("Drug history updated!");
      } else {
        await axios.post(`/api/drug-history/add`, {
          user_id: userId,
          ...form
        });
        toast.success("Drug history saved!");
      }
    } catch {
      toast.error("Error saving drug history");
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      
      <TextField
        label="Current Medication"
        size="small"
        multiline
        minRows={2}
        sx={smallField}
        value={form.current_medication}
        onChange={e => handleChange("current_medication", e.target.value)}
      />

      <TextField
        label="Long Term Drugs"
        size="small"
        multiline
        minRows={2}
        sx={smallField}
        value={form.long_term_drugs}
        onChange={e => handleChange("long_term_drugs", e.target.value)}
      />

      <TextField
        label="OTC Drugs"
        size="small"
        multiline
        minRows={2}
        sx={smallField}
        value={form.otc_drugs}
        onChange={e => handleChange("otc_drugs", e.target.value)}
      />

      <TextField
        label="Alternative Medications"
        size="small"
        multiline
        minRows={2}
        sx={smallField}
        value={form.alternative_medications}
        onChange={e => handleChange("alternative_medications", e.target.value)}
      />

      <Button variant="contained" sx={{ mt: 1 }} onClick={handleSave}>
        {historyId ? "Update" : "Save"}
      </Button>

    </Box>
  );
};

export default DrugHistoryForm;
