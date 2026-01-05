import React from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DemographicsForm from "../components/medical/DemographicsForm";
import ChiefComplaintForm from "../components/medical/ChiefComplaintForm";
import HPIForm from "../components/medical/HPIForm";
import TreatmentHistoryForm from "../components/medical/TreatmentHistoryForm";
import PatientHistoryForm from "../components/medical/PatientHistoryForm";
import PersonalHistoryForm from "../components/medical/PersonalHistoryForm";
import MenstrualObstetricForm from "../components/medical/MenstrualObstetricForm";
import FamilyHistoryForm from "../components/medical/FamilyHistoryForm";
import DrugHistoryForm from "../components/medical/DrugHistoryForm";
import AllergyHistoryForm from "../components/medical/AllergyHistoryForm";
import ImmunizationHistoryForm from "../components/medical/ImmunizationHistoryForm";
import TravelHistoryForm from "../components/medical/TravelHistoryForm";
import GeneralPhysicalExamForm from "../components/medical/GeneralPhysicalExamForm";
import LaboratoryTable from "../components/medical/LaboratoryTable";

const MedicalRecordPage = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const patientName = state?.name;

  const sections = [
    { title: "1. Demographic Profile", component: <DemographicsForm userId={id} /> },
    { title: "2. Chief Complaints", component: <ChiefComplaintForm userId={id} /> },
    { title: "3. History of Present Illness", component: <HPIForm userId={id} /> },
    { title: "4. Treatment History", component: <TreatmentHistoryForm userId={id} /> },
    { title: "5. Patient History", component: <PatientHistoryForm userId={id} /> },
    { title: "6. Personal History", component: <PersonalHistoryForm userId={id} /> },
    { title: "7. Menstrual and Obstetric History", component: <MenstrualObstetricForm userId={id} /> },
    { title: "8. Family History", component: <FamilyHistoryForm userId={id} /> },
    { title: "9. Drug History", component: <DrugHistoryForm userId={id} /> },
    { title: "10. Allergy History", component: <AllergyHistoryForm userId={id} /> },
    { title: "11. Immunization History", component: <ImmunizationHistoryForm userId={id} /> },
    { title: "12. Travel History", component: <TravelHistoryForm userId={id} /> },
    { title: "13. General Physical Examination", component: <GeneralPhysicalExamForm userId={id} /> },
    { title: "14. Laboratory Investigations", component: <LaboratoryTable userId={id} /> },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Medical Record — {patientName || `User #${id}`}
      </Typography>

      {sections.map((sec, index) => (
        <Accordion key={index} sx={{ mb: 1 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ fontSize: 18 }} />}
            sx={{
              minHeight: 36,
              "&.Mui-expanded": { minHeight: 36 },
              ".MuiAccordionSummary-content": {
                margin: 0,
                "&.Mui-expanded": { margin: 0 },
              },
              py: 0.5,
            }}
          >
            <Typography variant="subtitle1" sx={{ fontSize: 14 }}>
              {sec.title}
            </Typography>
          </AccordionSummary>

          <AccordionDetails sx={{ py: 1 }}>
            {sec.component}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default MedicalRecordPage;
