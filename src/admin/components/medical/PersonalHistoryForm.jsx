import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "../../../utils/axiosConfig";
import { toast } from "react-toastify";

const PersonalHistoryForm = ({ userId }) => {
  const [historyId, setHistoryId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    diet: "",
    appetite_weight_change: "",
    sleep: "",
    bowel_bladder: "",
    alcohol: "",
    smoking: "",
    tobacco: "",
    iv_drug_use: "",
    other_addiction: "",
    safe_practices: "",
    sexual_orientation: "",
    partners: "",
    std_history: "",
    high_risk_behaviours: "",
    contraception: "",
  });

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const smallField = {
    "& .MuiInputBase-root": {
      fontSize: 13,
      paddingRight: 1,
    },
    "& .MuiInputLabel-root": {
      fontSize: 13,
    },
  };

  useEffect(() => {
    axios
      .get(`/api/personal-history/get/${userId}`)
      .then((res) => {
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
        await axios.put(`/api/personal-history/update/${historyId}`, form);
        toast.success("Personal history updated!");
      } else {
        await axios.post(`/api/personal-history/add`, {
          user_id: userId,
          ...form,
        });
        toast.success("Personal history saved!");
      }
    } catch (err) {
      toast.error("Error saving personal history");
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <TextField
        label="Diet"
        size="small"
        sx={smallField}
        value={form.diet}
        onChange={(e) => handleChange("diet", e.target.value)}
      />

      <TextField
        label="Appetite & Weight Change"
        multiline
        minRows={2}
        size="small"
        sx={smallField}
        value={form.appetite_weight_change}
        onChange={(e) => handleChange("appetite_weight_change", e.target.value)}
      />

      <TextField
        label="Sleep"
        size="small"
        sx={smallField}
        value={form.sleep}
        onChange={(e) => handleChange("sleep", e.target.value)}
      />

      <TextField
        label="Bowel & Bladder Habits"
        multiline
        minRows={2}
        size="small"
        sx={smallField}
        value={form.bowel_bladder}
        onChange={(e) => handleChange("bowel_bladder", e.target.value)}
      />

      <Typography sx={{ fontSize: 14, fontWeight: "bold", mt: 1 }}>
        Addiction
      </Typography>

      <TextField
        label="Alcohol"
        size="small"
        sx={smallField}
        value={form.alcohol}
        onChange={(e) => handleChange("alcohol", e.target.value)}
      />

      <TextField
        label="Smoking"
        size="small"
        sx={smallField}
        value={form.smoking}
        onChange={(e) => handleChange("smoking", e.target.value)}
      />

      <TextField
        label="Tobacco"
        size="small"
        sx={smallField}
        value={form.tobacco}
        onChange={(e) => handleChange("tobacco", e.target.value)}
      />

      <TextField
        label="IV Drug Use"
        size="small"
        sx={smallField}
        value={form.iv_drug_use}
        onChange={(e) => handleChange("iv_drug_use", e.target.value)}
      />

      <TextField
        label="Other Addictions"
        size="small"
        sx={smallField}
        value={form.other_addiction}
        onChange={(e) => handleChange("other_addiction", e.target.value)}
      />

      <Typography sx={{ fontSize: 14, fontWeight: "bold", mt: 1 }}>
        Sexual History
      </Typography>

      <TextField
        label="Safe Practices"
        size="small"
        sx={smallField}
        value={form.safe_practices}
        onChange={(e) => handleChange("safe_practices", e.target.value)}
      />

      <TextField
        label="Orientation"
        size="small"
        sx={smallField}
        value={form.sexual_orientation}
        onChange={(e) => handleChange("sexual_orientation", e.target.value)}
      />

      <TextField
        label="Partners"
        size="small"
        sx={smallField}
        value={form.partners}
        onChange={(e) => handleChange("partners", e.target.value)}
      />

      <TextField
        label="History of STDs"
        size="small"
        sx={smallField}
        value={form.std_history}
        onChange={(e) => handleChange("std_history", e.target.value)}
      />

      <TextField
        label="High Risk Behaviours"
        size="small"
        sx={smallField}
        value={form.high_risk_behaviours}
        onChange={(e) =>
          handleChange("high_risk_behaviours", e.target.value)
        }
      />

      <TextField
        label="Contraception"
        size="small"
        sx={smallField}
        value={form.contraception}
        onChange={(e) => handleChange("contraception", e.target.value)}
      />

      <Button variant="contained" sx={{ mt: 1 }} onClick={handleSave}>
        {historyId ? "Update" : "Save"}
      </Button>
    </Box>
  );
};

export default PersonalHistoryForm;
