import React, { useEffect, useState } from "react";
import {
  Box, Typography, Button, TextField, MenuItem
} from "@mui/material";
import axios from "axios";

import ModalForm from "../components/medical/ModalForm";
import TableLayout from "../components/medical/TableLayout";

const SpecialtyItemManager = () => {
  const [specialties, setSpecialties] = useState([]);
  const [subSpecialties, setSubSpecialties] = useState([]);

  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedSubSpecialty, setSelectedSubSpecialty] = useState("");

  const [data, setData] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [formValues, setFormValues] = useState({
    item_type: "",
    item_name: "",
    description: "",
    procedure_code: "",
    complexity_level: "",
    price: ""
  });

  // Load specialties
  useEffect(() => {
    axios.get("/api/admin/specialties").then((res) =>
      setSpecialties(res.data.data)
    );
  }, []);

  // Load sub-specialties on specialty change
  useEffect(() => {
    if (!selectedSpecialty) return;

    axios
      .get("/api/admin/sub-specialties", {
        params: { specialty_id: selectedSpecialty },
      })
      .then((res) => setSubSpecialties(res.data.data));
  }, [selectedSpecialty]);

  // Load procedures
  const loadData = () => {
    if (!selectedSubSpecialty) return;

    axios
      .get("/api/admin/specialty-items", {
        params: {
          specialty_id: selectedSpecialty,
          sub_specialty_id: selectedSubSpecialty,
        },
      })
      .then((res) => setData(res.data.data));
  };

  useEffect(() => loadData(), [selectedSubSpecialty]);

  const handleSave = () => {
    const payload = {
      specialty_id: selectedSpecialty,
      sub_specialty_id: selectedSubSpecialty,
      ...formValues,
    };

    const request = editItem
      ? axios.put(`/api/admin/specialty-items/${editItem.id}`, payload)
      : axios.post(`/api/admin/specialty-items`, payload);

    request.then(() => {
      loadData();
      setModalOpen(false);
      setEditItem(null);
      setFormValues({
        item_type: "",
        item_name: "",
        description: "",
        procedure_code: "",
        complexity_level: "",
        price: ""
      });
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Procedures (Investigations & Interventions)
      </Typography>

      {/* Dropdowns */}
      <Box sx={{ display: "flex", gap: 3, mb: 3 }}>
        <TextField
          select label="Specialty"
          value={selectedSpecialty}
          onChange={(e) => setSelectedSpecialty(e.target.value)}
          sx={{ width: 300 }}
        >
          {specialties?.map((sp) => (
            <MenuItem value={sp.id} key={sp.id}>{sp.name}</MenuItem>
          ))}
        </TextField>

        <TextField
          select label="Sub-Specialty"
          value={selectedSubSpecialty}
          onChange={(e) => setSelectedSubSpecialty(e.target.value)}
          sx={{ width: 300 }}
        >
          {subSpecialties?.map((ss) => (
            <MenuItem value={ss.id} key={ss.id}>{ss.name}</MenuItem>
          ))}
        </TextField>
      </Box>

      {selectedSubSpecialty && (
        <>
          <Button variant="contained" onClick={() => setModalOpen(true)} sx={{ mb: 2 }}>
            Add Procedure
          </Button>

          <TableLayout
            columns={[
              { key: "id", label: "ID" },
              { key: "item_type", label: "Type" },
              { key: "item_name", label: "Name" },
              { key: "procedure_code", label: "Code" },
              { key: "complexity_level", label: "Complexity" },
              { key: "price", label: "Price" }
            ]}
            data={data}
            onEdit={(item) => {
              setEditItem(item);
              setFormValues(item);
              setModalOpen(true);
            }}
            onDelete={(id) => {
              if (window.confirm("Delete this procedure?")) {
                axios.delete(`/api/admin/specialty-items/${id}`).then(loadData);
              }
            }}
          />
        </>
      )}

      {/* Modal */}
      {modalOpen && (
        <ModalForm
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          title={editItem ? "Edit Procedure" : "Add Procedure"}
          values={formValues}
          setValues={setFormValues}
          fields={[
            {
              label: "Type",
              name: "item_type",
              options: [
                { label: "Investigation", value: "Investigation" },
                { label: "Intervention", value: "Intervention" }
              ]
            },
            { label: "Procedure Name", name: "item_name" },
            { label: "Procedure Code", name: "procedure_code" },
            {
              label: "Complexity Level",
              name: "complexity_level",
              options: [
                { label: "Low", value: "Low" },
                { label: "Medium", value: "Medium" },
                { label: "High", value: "High" }
              ]
            },
            { label: "Price", name: "price", type: "number" },
            { label: "Description", name: "description" },
          ]}
        />
      )}
    </Box>
  );
};

export default SpecialtyItemManager;
