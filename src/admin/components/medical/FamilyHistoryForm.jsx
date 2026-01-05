import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "../../../utils/axiosConfig";
import { toast } from "react-toastify";

const FamilyHistoryForm = ({ userId }) => {
  const [historyId, setHistoryId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    similar_illness: "",
    autoimmune_disease: "",
    consanguinity: "",
  });

  const smallField = {
    "& .MuiInputBase-root": { fontSize: 13 },
    "& .MuiInputLabel-root": { fontSize: 13 },
  };

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    axios.get(`/api/family-history/get/${userId}`)
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
        await axios.put(`/api/family-history/update/${historyId}`, form);
        toast.success("Family history updated!");
      } else {
        await axios.post(`/api/family-history/add`, {
          user_id: userId,
          ...form
        });
        toast.success("Family history saved!");
      }
    } catch {
      toast.error("Error saving family history");
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <TextField
        label="Similar Illness"
        size="small"
        sx={smallField}
        value={form.similar_illness}
        onChange={e => handleChange("similar_illness", e.target.value)}
      />

      <TextField
        label="Autoimmune Disease"
        size="small"
        sx={smallField}
        value={form.autoimmune_disease}
        onChange={e => handleChange("autoimmune_disease", e.target.value)}
      />

      <TextField
        label="Consanguinity"
        size="small"
        sx={smallField}
        value={form.consanguinity}
        onChange={e => handleChange("consanguinity", e.target.value)}
      />

      <Button variant="contained" sx={{ mt: 1 }} onClick={handleSave}>
        {historyId ? "Update" : "Save"}
      </Button>
    </Box>
  );
};

export default FamilyHistoryForm;
