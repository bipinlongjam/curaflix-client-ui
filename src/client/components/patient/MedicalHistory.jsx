import React, { useState } from "react";
import { sectionComponentMap } from "./MedicalSectionMapper";

const sections = [
  { id: "demographicProfile", name: "Demographic Profile" },
  { id: "chiefComplaints", name: "Chief Complaints" },
  { id: "presentIllness", name: "History of Present Illness" },
  { id: "treatmentHistory", name: "Treatment History" },
  { id: "history", name: "History" },
  { id: "personalHistory", name: "Personal History" },

  { id: "menstrualObstetric", name: "Menstrual / Obstetric History" },
  { id: "familyHistory", name: "Family History" },
  { id: "drugHistory", name: "Drug History" },
  { id: "allergyHistory", name: "Allergy History" },
  { id: "immunizationHistory", name: "Immunization History" },
  { id: "travelHistory", name: "Travel History" },

  { id: "generalPhysicalExamination", name: "General Physical Examination" },
  { id: "laboratoryData", name: "Laboratory Data" },
  { id: "aiSummary", name: "AI Generated Summary" },
];

const MedicalHistory = ({ user }) => {
  const [selectedSection, setSelectedSection] = useState(sections[0]);

  const CurrentSectionComponent =
    sectionComponentMap[selectedSection.id] || null;

  return (
    <main className="flex-1 p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* LEFT MENU */}
        <div className="bg-white border rounded-lg shadow-sm p-4 h-fit">
          <h2 className="text-lg font-semibold mb-3">Medical Categories</h2>

          <ul className="space-y-2">
            {sections.map((section) => (
              <li
                key={section.id}
                onClick={() => setSelectedSection(section)}
                className={`cursor-pointer p-2 rounded-md border transition 
                  ${
                    selectedSection.id === section.id
                      ? "bg-blue-100 border-blue-400 text-blue-700"
                      : "hover:bg-gray-100"
                  }
                `}
              >
                {section.name}
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT SIDE */}
        <div className="md:col-span-2 bg-white border rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            {selectedSection.name}
          </h2>

          {CurrentSectionComponent ? (
            <CurrentSectionComponent userId={user?.id} />
          ) : (
            <p>No section available</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default MedicalHistory;
