// import { Routes, Route } from "react-router-dom";
// import AdminLayout from "../layout/AdminLayout";

// import AdminDashboard from "../pages/AdminDashboard";
// import Users from "../pages/Users";
// import Doctors from "../pages/Doctors";

// const AppRoutes = () => {
//   return (
//     <Routes>

//       {/* /admin → Dashboard */}
//       <Route
//         index
//         element={
//           <AdminLayout>
//             <AdminDashboard />
//           </AdminLayout>
//         }
//       />

//       {/* /admin/users */}
//       <Route
//         path="users"
//         element={
//           <AdminLayout>
//             <Users />
//           </AdminLayout>
//         }
//       />

//       {/* /admin/doctors */}
//       <Route
//         path="doctors"
//         element={
//           <AdminLayout>
//             <Doctors />
//           </AdminLayout>
//         }
//       />

//     </Routes>
//   );
// };

// export default AppRoutes;


import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";

import AdminDashboard from "../pages/AdminDashboard";
import Users from "../pages/Users";
import Doctors from "../pages/Doctors";
import MedicalRecordPage from "../pages/MedicalRecordPage";

import SpecialtyManager from "../pages/SpecialtyManager";
import SubSpecialtyManager from "../pages/SubSpecialtyManager";
import SpecialtyItemManager from "../pages/SpecialtyItemManager";
import LaboratoryParametersPage from "../pages/LaboratoryParametersPage";

const AdminRoutes = () => {
  return (
    <Routes>

      {/* /admin → Dashboard */}
      <Route
        index
        element={
          <AdminLayout>
            <AdminDashboard />
          </AdminLayout>
        }
      />

      {/* /admin/users */}
      <Route
        path="users"
        element={
          <AdminLayout>
            <Users />
          </AdminLayout>
        }
      />

      {/* /admin/users/:id/medical-record */}
      <Route
        path="users/:id/medical-record"
        element={
          <AdminLayout>
            <MedicalRecordPage />
          </AdminLayout>
        }
      />

      {/* /admin/doctors */}
      <Route
        path="doctors"
        element={
          <AdminLayout>
            <Doctors />
          </AdminLayout>
        }
      />

      <Route
        path="medical/laboratory-parameters"
        element={
          <AdminLayout>
            <LaboratoryParametersPage />
          </AdminLayout>
        }
      />
      <Route
        path="medical/specialties"
        element={
          <AdminLayout>
            <SpecialtyManager />
          </AdminLayout>
        }
      />

      <Route
        path="medical/sub-specialties"
        element={
          <AdminLayout>
            <SubSpecialtyManager />
          </AdminLayout>
        }
      />

      <Route
        path="medical/procedures"
        element={
          <AdminLayout>
            <SpecialtyItemManager />
          </AdminLayout>
        }
      />
    </Routes>
  );
};

export default AdminRoutes;

