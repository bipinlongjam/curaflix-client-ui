import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "../../../utils/axiosConfig";
import { toast } from "react-toastify";

const TreatmentHistoryForm = ({ userId }) => {
  const [treatment, setTreatment] = useState("");
  const [historyId, setHistoryId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/treatment-history/get/${userId}`)
      .then((res) => {
        const data = res.data?.data;

        if (data && data.length > 0) {
          setTreatment(data[0].treatmenthistory);
          setHistoryId(data[0].id);
        }
      })
      .finally(() => setLoading(false));
  }, [userId]);

  const handleSave = async () => {
    try {
      if (historyId) {
        await axios.put(`/api/treatment-history/update/${historyId}`, {
          treatmenthistory: treatment,
        });
        toast.success("Treatment history updated!");
      } else {
        await axios.post(`/api/treatment-history/add`, {
          user_id: userId,
          treatmenthistory: treatment,
        });
        toast.success("Treatment history saved!");
      }
    } catch (err) {
      toast.error("Error saving treatment history");
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        label="Treatment History"
        multiline
        minRows={4}
        fullWidth
        value={treatment}
        onChange={(e) => setTreatment(e.target.value)}
      />

      <Button variant="contained" onClick={handleSave}>
        {historyId ? "Update" : "Save"}
      </Button>
    </Box>
  );
};

export default TreatmentHistoryForm;
