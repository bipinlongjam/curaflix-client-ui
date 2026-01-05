import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "../../../utils/axiosConfig";
import { toast } from "react-toastify";

const AllergyHistoryForm = ({ userId }) => {
  const [historyId, setHistoryId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    drug_allergy: "",
    food_allergy: "",
    reaction_nature: ""
  });

  const smallField = {
    "& .MuiInputBase-root": { fontSize: 13 },
    "& .MuiInputLabel-root": { fontSize: 13 },
  };

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    axios.get(`/api/allergy-history/get/${userId}`)
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
        await axios.put(`/api/allergy-history/update/${historyId}`, form);
        toast.success("Allergy history updated!");
      } else {
        await axios.post(`/api/allergy-history/add`, {
          user_id: userId,
          ...form
        });
        toast.success("Allergy history saved!");
      }
    } catch {
      toast.error("Error saving allergy history");
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      
      <TextField
        label="Drug Allergy"
        size="small"
        multiline
        minRows={2}
        sx={smallField}
        value={form.drug_allergy}
        onChange={e => handleChange("drug_allergy", e.target.value)}
      />

      <TextField
        label="Food Allergy"
        size="small"
        multiline
        minRows={2}
        sx={smallField}
        value={form.food_allergy}
        onChange={e => handleChange("food_allergy", e.target.value)}
      />

      <TextField
        label="Nature of Reaction"
        size="small"
        multiline
        minRows={2}
        sx={smallField}
        value={form.reaction_nature}
        onChange={e => handleChange("reaction_nature", e.target.value)}
      />

      <Button variant="contained" sx={{ mt: 1 }} onClick={handleSave}>
        {historyId ? "Update" : "Save"}
      </Button>

    </Box>
  );
};

export default AllergyHistoryForm;
