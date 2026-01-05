import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  Box
} from "@mui/material";

/**
 * Reusable Dynamic Modal Form Component
 *
 * Props:
 * - open        : Boolean → opens/closes modal
 * - onClose     : Function → close handler
 * - onSave      : Function → save handler
 * - title       : String → form title
 * - fields      : Array → [{ label, name, type, options }]
 * - values      : Object → form values
 * - setValues   : Function → update form values
 */

const ModalForm = ({ open, onClose, onSave, title, fields, values, setValues }) => {
  
  const handleChange = (key, value) => {
    setValues({ ...values, [key]: value });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent
        sx={{
          mt: 1,
          display: "flex",
          flexDirection: "column",
          gap: 2
        }}
      >
        {fields.map((field) => (
          <Box key={field.name}>
            <TextField
              fullWidth
              label={field.label}
              variant="outlined"
              type={field.type || "text"}
              select={!!field.options}
              value={values[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
            >
              {field.options &&
                field.options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
            </TextField>
          </Box>
        ))}
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={onSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalForm;
