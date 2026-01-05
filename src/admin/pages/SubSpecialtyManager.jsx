import React, { useEffect, useState } from "react";
import { Box, Typography, Button, TextField, MenuItem } from "@mui/material";
import axios from "axios";

import ModalForm from "../components/medical/ModalForm";
import TableLayout from "../components/medical/TableLayout";

const SubSpecialtyManager = () => {
  const [specialties, setSpecialties] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");

  const [data, setData] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [formValues, setFormValues] = useState({ name: "" });

  useEffect(() => {
    axios.get("/api/admin/specialties").then((res) => setSpecialties(res.data.data));
  }, []);

  const loadData = () => {
    if (!selectedSpecialty) return;
    axios
      .get("/api/admin/sub-specialties", {
        params: { specialty_id: selectedSpecialty },
      })
      .then((res) => setData(res.data.data));
  };

  useEffect(() => loadData(), [selectedSpecialty]);

  const handleSave = () => {
    const payload = { specialty_id: selectedSpecialty, name: formValues.name };

    const request = editItem
      ? axios.put(`/api/admin/sub-specialties/${editItem.id}`, { name: formValues.name })
      : axios.post(`/api/admin/sub-specialties`, payload);

    request.then(() => {
      loadData();
      setModalOpen(false);
      setEditItem(null);
      setFormValues({ name: "" });
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Sub-Specialty Manager</Typography>

      <TextField
        select
        label="Select Specialty"
        value={selectedSpecialty}
        onChange={(e) => setSelectedSpecialty(e.target.value)}
        sx={{ mb: 3, width: 300 }}
      >
        {specialties?.map((sp) => (
          <MenuItem key={sp.id} value={sp.id}>{sp.name}</MenuItem>
        ))}
      </TextField>

      {selectedSpecialty && (
        <>
          <Button variant="contained" onClick={() => setModalOpen(true)} sx={{ mb: 2 }}>
            Add Sub-specialty
          </Button>

          <TableLayout
            columns={[
              { key: "id", label: "ID" },
              { key: "name", label: "Sub-specialty Name" },
            ]}
            data={data}
            onEdit={(item) => {
              setEditItem(item);
              setFormValues({ name: item.name });
              setModalOpen(true);
            }}
            onDelete={(id) => {
              if (window.confirm("Delete sub-specialty?")) {
                axios.delete(`/api/admin/sub-specialties/${id}`).then(loadData);
              }
            }}
          />
        </>
      )}

      {modalOpen && (
        <ModalForm
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          title={editItem ? "Edit Sub-specialty" : "Add Sub-specialty"}
          values={formValues}
          setValues={setFormValues}
          fields={[
            { label: "Sub-specialty Name", name: "name" },
          ]}
        />
      )}
    </Box>
  );
};

export default SubSpecialtyManager;
