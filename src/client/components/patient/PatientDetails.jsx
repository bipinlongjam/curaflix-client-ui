import React, { useState, useEffect } from "react";
import useFetchUser from "../../hooks/useFetchUser";

const PatientDetails = ({ user, onSave }) => {
  const BASE_URL = "http://localhost:5000";

  const { userData, loading, error, refetch } = useFetchUser(user?.id);

  const [formData, setFormData] = useState({
    patientId: "",
    full_name: "",
    gender: "",
    age: "",
    phone: "",
    email: "",
    subscription: "",
  });

  const [preview, setPreview] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);


  useEffect(() => {
    if (!userData) return;

    setFormData({
      patientId: userData.patientId || "",
      full_name: userData.full_name || "",
      gender: userData.gender || "",
      age: userData.age || "",
      phone: userData.phone || "",
      email: userData.email || "",
      subscription: userData.subscription || "" ,
    });

    setPreview(userData.photo ? `${BASE_URL}${userData.photo}` : "");
  }, [userData]);

  // ------------------------------
  // Handle Input Change
  // ------------------------------
  const handleChange = (e) => {
    if (!isEditing) return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ------------------------------
  // Photo Upload Change
  // ------------------------------
  const handlePhotoChange = (e) => {
    if (!isEditing) return;

    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // ------------------------------
  // Update Save / Edit Toggle
  // ------------------------------
  const handleUpdateClick = async () => {
    if (isEditing) {
      if (onSave) {
        await onSave(formData, photoFile);
        refetch(); 
      }
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  // ------------------------------
  // Loading UI
  // ------------------------------
  if (loading) {
    return (
      <aside className="w-64 p-6 bg-white shadow rounded-lg hidden md:block">
        <p className="text-center text-gray-600">Loading...</p>
      </aside>
    );
  }

  if (error) {
    return (
      <aside className="w-64 p-6 bg-white shadow rounded-lg hidden md:block">
        <p className="text-red-500 text-center">{error}</p>
      </aside>
    );
  }

  return (
    <aside className="w-64 bg-white shadow-md p-6 rounded-lg hidden md:block">

      {/* Profile Photo */}
      <div className="w-28 h-28 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
        {preview ? (
          <img src={preview} alt="Patient" className="w-full h-full object-cover" />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            No Photo
          </div>
        )}
      </div>

      {/* Upload Option */}
      {isEditing && (
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="w-full mb-4"
        />
      )}

      {/* FORM DETAILS */}
      <div className="text-gray-700 space-y-3">
        <InputField 
         label="Patient ID"
         name="patientId"
         value={formData.patientId}
         readOnly={true}
         />

        <InputField label="Full Name" name="full_name" value={formData.full_name} onChange={handleChange} readOnly={!isEditing} />

        {/* Gender Dropdown */}
        <div>
          <label className="text-sm font-semibold">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full border rounded-md px-2 py-1 mt-1 ${!isEditing && "bg-gray-100 cursor-not-allowed"}`}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <InputField label="Age" name="age" type="number" value={formData.age} onChange={handleChange} readOnly={!isEditing} />

        <InputField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} readOnly={!isEditing} />

        <InputField label="Email ID" name="email" type="email" value={formData.email} onChange={handleChange} readOnly={!isEditing} />

        <InputField 
        label="Subscription" 
        name="subscription"
        value={formData.subscription ? "Yes" : "No"}
        readOnly={true}
        />
      </div>

      {/* BUTTON */}
      <button
        onClick={handleUpdateClick}
        className={`mt-6 w-full text-white py-2 rounded-md transition ${
          isEditing ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-700 hover:bg-gray-800"
        }`}
      >
        {isEditing ? "Update" : "Edit"}
      </button>
    </aside>
  );
};


const InputField = ({ label, name, value, onChange, type = "text", readOnly }) => (
  <div>
    <label className="text-sm font-semibold">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      readOnly={readOnly}
      onChange={onChange}
      className={`w-full border rounded-md px-2 py-1 mt-1 ${
        readOnly ? "bg-gray-100 cursor-not-allowed" : ""
      }`}
    />
  </div>
);

export default PatientDetails;
