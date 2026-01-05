import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "../../../utils/axiosConfig";
import { toast } from "react-toastify";

const MenstrualObstetricForm = ({ userId }) => {
  const [historyId, setHistoryId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    age_menarche: "",
    cycle_regularity: "",
    duration: "",
    flow: "",
    lmp: "",
    gravida_para_abortions: "",
    mode_delivery: "",
    complications: ""
  });

  const smallField = {
    "& .MuiInputBase-root": { fontSize: 13 },
    "& .MuiInputLabel-root": { fontSize: 13 }
  };

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    axios.get(`/api/menstrual-obstetric/get/${userId}`)
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
        await axios.put(`/api/menstrual-obstetric/update/${historyId}`, form);
        toast.success("History updated!");
      } else {
        await axios.post(`/api/menstrual-obstetric/add`, {
          user_id: userId,
          ...form
        });
        toast.success("History saved!");
      }
    } catch {
      toast.error("Error saving history");
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      
      <Typography sx={{ fontWeight: "bold", fontSize: 14 }}>
        Menstrual History
      </Typography>

      <TextField label="Age at Menarche" size="small" sx={smallField}
        value={form.age_menarche}
        onChange={e => handleChange("age_menarche", e.target.value)}
      />

      <TextField label="Cycle Regularity" size="small" sx={smallField}
        value={form.cycle_regularity}
        onChange={e => handleChange("cycle_regularity", e.target.value)}
      />

      <TextField label="Duration" size="small" sx={smallField}
        value={form.duration}
        onChange={e => handleChange("duration", e.target.value)}
      />

      <TextField label="Flow" size="small" sx={smallField}
        value={form.flow}
        onChange={e => handleChange("flow", e.target.value)}
      />

      <TextField label="LMP" size="small" sx={smallField}
        value={form.lmp}
        onChange={e => handleChange("lmp", e.target.value)}
      />


      <Typography sx={{ fontWeight: "bold", fontSize: 14, mt: 1 }}>
        Obstetric History
      </Typography>

      <TextField label="Gravida / Para / Abortions" size="small" sx={smallField}
        value={form.gravida_para_abortions}
        onChange={e => handleChange("gravida_para_abortions", e.target.value)}
      />

      <TextField label="Mode of Delivery" size="small" sx={smallField}
        value={form.mode_delivery}
        onChange={e => handleChange("mode_delivery", e.target.value)}
      />

      <TextField label="Complications" multiline minRows={2} size="small" sx={smallField}
        value={form.complications}
        onChange={e => handleChange("complications", e.target.value)}
      />

      <Button variant="contained" sx={{ mt: 1 }} onClick={handleSave}>
        {historyId ? "Update" : "Save"}
      </Button>

    </Box>
  );
};

export default MenstrualObstetricForm;
