import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "../../../utils/axiosConfig";
import { toast } from "react-toastify";

const TravelHistoryForm = ({ userId }) => {
  const [historyId, setHistoryId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [travel_details, setTravelDetails] = useState("");

  const smallField = {
    "& .MuiInputBase-root": { fontSize: 13 },
    "& .MuiInputLabel-root": { fontSize: 13 },
  };

  useEffect(() => {
    axios
      .get(`/api/travel-history/get/${userId}`)
      .then((res) => {
        const data = res.data?.data;
        if (data && data.length > 0) {
          setTravelDetails(data[0].travel_details);
          setHistoryId(data[0].id);
        }
      })
      .finally(() => setLoading(false));
  }, [userId]);

  const handleSave = async () => {
    try {
      if (historyId) {
        await axios.put(`/api/travel-history/update/${historyId}`, {
          travel_details,
        });
        toast.success("Travel history updated!");
      } else {
        await axios.post(`/api/travel-history/add`, {
          user_id: userId,
          travel_details,
        });
        toast.success("Travel history saved!");
      }
    } catch {
      toast.error("Error saving travel history");
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <TextField
        label="Travelling History"
        size="small"
        multiline
        minRows={3}
        sx={smallField}
        value={travel_details}
        onChange={(e) => setTravelDetails(e.target.value)}
      />

      <Button variant="contained" sx={{ mt: 1 }} onClick={handleSave}>
        {historyId ? "Update" : "Save"}
      </Button>
    </Box>
  );
};

export default TravelHistoryForm;
