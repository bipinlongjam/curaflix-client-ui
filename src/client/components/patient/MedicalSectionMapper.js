import DemographicProfile from "../medicalSection/DemographicProfile";
import ChiefComplaints from "../medicalSection/ChiefComplaints";
import PresentIllness from "../medicalSection/PresentIllness";
import TreatmentHistory from "../medicalSection/TreatmentHistory";
import History from "../medicalSection//History";
import PersonalHistory from "../medicalSection/PersonalHistory";
import MenstrualObstetricHistory from "../medicalSection/MenstrualObstetricHistory";
import FamilyHistory from "../medicalSection/FamilyHistory";
import DrugHistory from "../medicalSection/DrugHistory";
import AllergyHistory from "../medicalSection/AllergyHistory";
import ImmunizationHistory from "../medicalSection/ImmunizationHistory";
import TravelHistory from "../medicalSection/TravelHistory";
import GeneralPhysicalExamination from "../medicalSection/GeneralPhysicalExamination";
import LaboratoryData from "../medicalSection/LaboratoryData";
import AISummary from "../medicalSection/AISummary";

export const sectionComponentMap = {
  demographicProfile: DemographicProfile,
  chiefComplaints: ChiefComplaints,
  presentIllness: PresentIllness,
  treatmentHistory: TreatmentHistory,
  history: History,
  personalHistory: PersonalHistory,
  menstrualObstetric: MenstrualObstetricHistory,
  familyHistory: FamilyHistory,
  drugHistory: DrugHistory,
  allergyHistory: AllergyHistory,
  immunizationHistory: ImmunizationHistory,
  travelHistory: TravelHistory,
  generalPhysicalExamination: GeneralPhysicalExamination,
  laboratoryData: LaboratoryData,
  aiSummary: AISummary,
};
