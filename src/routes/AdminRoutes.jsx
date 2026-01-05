// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// import AdminLogin from "../admin/pages/AdminLogin";
// import AdminRegister from "../admin/pages/AdminRegister";
// import AdminLayout from "../admin/layout/AdminLayout";
// import AdminDashboard from "../admin/pages/AdminDashboard";
// import Users from "../admin/pages/Users";
// import Doctors from "../admin/pages/Doctors";

// const AdminRoutes = () => {
//   const admin = useSelector((state) => state.admin.admin);
//   console.log("Admin in AdminRoutes:", admin);
//   return (
//     <Routes>
//       {/* PUBLIC ROUTES */}
//       <Route path="login" element={<AdminLogin />} />
//       <Route path="register" element={<AdminRegister />} />

//       {/* PROTECTED ROUTES */}
//       <Route
//         path="/"
//         element={
//           admin ? <AdminLayout /> : <Navigate to="/admin/login" replace />
//         }
//       >
//         <Route index element={<AdminDashboard />} />
//         <Route path="users" element={<Users />} />
//         <Route path="doctors" element={<Doctors />} />
//       </Route>

//       {/* fallback */}
//       <Route
//         path="*"
//         element={<Navigate to="/admin/login" replace />}
//       />
//     </Routes>
//   );
// };

// export default AdminRoutes;

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import AdminLogin from "../admin/pages/AdminLogin";
import AdminRegister from "../admin/pages/AdminRegister";
import AdminLayout from "../admin/layout/AdminLayout";

import AdminDashboard from "../admin/pages/AdminDashboard";
import Users from "../admin/pages/Users";
import Doctors from "../admin/pages/Doctors";
import MedicalRecordPage from "../admin/pages/MedicalRecordPage";

import SpecialtyManager from "../admin/pages/SpecialtyManager";
import SubSpecialtyManager from "../admin/pages/SubSpecialtyManager";
import SpecialtyItemManager from "../admin/pages/SpecialtyItemManager";
import LaboratoryParametersPage from "../admin/pages/LaboratoryParametersPage";

const AdminRoutes = () => {
  const admin = useSelector((state) => state.admin.admin);

  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="login" element={<AdminLogin />} />
      <Route path="register" element={<AdminRegister />} />

      {/* PROTECTED ROUTES */}
      <Route
        path="/"
        element={admin ? <AdminLayout /> : <Navigate to="/admin/login" replace />}
      >
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="doctors" element={<Doctors />} />
        <Route path="users/:id/medical-record" element={<MedicalRecordPage />} />

        <Route path="medical/specialties" element={<SpecialtyManager />} />
        <Route path="medical/sub-specialties" element={<SubSpecialtyManager />} />
        <Route path="medical/procedures" element={<SpecialtyItemManager />} />
        <Route path="medical/laboratory-parameters" element={<LaboratoryParametersPage />} />
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  );
};

export default AdminRoutes;
