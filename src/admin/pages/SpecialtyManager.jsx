import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import axios from "../../utils/axiosConfig";

import ModalForm from "../components/medical/ModalForm";
import TableLayout from "../components/medical/TableLayout";

const SpecialtyManager = () => {
  const [data, setData] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [formValues, setFormValues] = useState({ name: "" });

  const loadData = () =>
    axios.get("/api/admin/specialties").then((res) => setData(res.data.data));

  useEffect(() => loadData(), []);

  const handleSave = () => {
    const request = editItem
      ? axios.put(`/api/admin/specialties/${editItem.id}`, formValues)
      : axios.post(`/api/admin/specialties`, formValues);

    request.then(() => {
      loadData();
      setModalOpen(false);
      setEditItem(null);
      setFormValues({ name: "" });
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Specialty Manager</Typography>

      <Button variant="contained" onClick={() => setModalOpen(true)} sx={{ mb: 2 }}>
        Add Specialty
      </Button>

      <TableLayout
        columns={[
          { key: "id", label: "ID" },
          { key: "name", label: "Specialty Name" }
        ]}
        data={data}
        onEdit={(item) => {
          setEditItem(item);
          setFormValues({ name: item.name });
          setModalOpen(true);
        }}
        onDelete={(id) => {
          if (window.confirm("Delete specialty?")) {
            axios.delete(`/api/admin/specialties/${id}`).then(loadData);
          }
        }}
      />

      {modalOpen && (
        <ModalForm
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          title={editItem ? "Edit Specialty" : "Add Specialty"}
          values={formValues}
          setValues={setFormValues}
          fields={[
            { label: "Specialty Name", name: "name" }
          ]}
        />
      )}
    </Box>
  );
};

export default SpecialtyManager;
