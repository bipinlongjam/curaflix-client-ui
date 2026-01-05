// import React from "react";
// import { Link } from "react-router-dom";
// import {
//   Drawer,
//   List,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
// } from "@mui/material";

// import DashboardIcon from "@mui/icons-material/Dashboard";
// import PeopleIcon from "@mui/icons-material/People";
// import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

// const drawerWidth = 240;

// const AdminSidebar = () => {
//   return (
//     <Drawer
//       variant="permanent"
//       anchor="left"
//       sx={{
//         width: drawerWidth,
//         "& .MuiDrawer-paper": {
//           width: drawerWidth,
//           marginTop: "64px",
//           boxSizing: "border-box",
//         },
//       }}
//     >
//       <List>

//         <ListItemButton component={Link} to="/admin">
//           <ListItemIcon><DashboardIcon /></ListItemIcon>
//           <ListItemText primary="Dashboard" />
//         </ListItemButton>

//         <ListItemButton component={Link} to="/admin/users">
//           <ListItemIcon><PeopleIcon /></ListItemIcon>
//           <ListItemText primary="Users" />
//         </ListItemButton>

//         <ListItemButton component={Link} to="/admin/doctors">
//           <ListItemIcon><MedicalServicesIcon /></ListItemIcon>
//           {/* <ListItemText primary="Doctors" /> */}
//         </ListItemButton>

//       </List>
//     </Drawer>
//   );
// };

// export default AdminSidebar;

import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CategoryIcon from "@mui/icons-material/Category";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AssignmentIcon from "@mui/icons-material/Assignment";

const drawerWidth = 240;

const AdminSidebar = () => {
  const [openMedical, setOpenMedical] = useState(false);

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          marginTop: "64px",
          boxSizing: "border-box",
        },
      }}
    >
      <List>
        {/* DASHBOARD */}
        <ListItemButton component={Link} to="/admin">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        {/* USERS */}
        <ListItemButton component={Link} to="/admin/users">
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItemButton>

        {/* DOCTORS */}
        {/* <ListItemButton component={Link} to="/admin/doctors">
          <ListItemIcon><MedicalServicesIcon /></ListItemIcon>
          <ListItemText primary="Doctors" />
        </ListItemButton> */}

        <ListItemButton onClick={() => setOpenMedical(!openMedical)}>
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary="Medical Master" />
          {openMedical ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openMedical} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              component={Link}
              to="/admin/medical/laboratory-parameters"
            >
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Laboratory Parameters" />
            </ListItemButton>
            {/* Specialties */}
            <ListItemButton
              sx={{ pl: 4 }}
              component={Link}
              to="/admin/medical/specialties"
            >
              <ListItemIcon>
                <ListAltIcon />
              </ListItemIcon>
              <ListItemText primary="Specialties" />
            </ListItemButton>

            {/* Sub-specialties */}
            <ListItemButton
              sx={{ pl: 4 }}
              component={Link}
              to="/admin/medical/sub-specialties"
            >
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Sub-specialties" />
            </ListItemButton>

            {/* Procedures */}
            <ListItemButton
              sx={{ pl: 4 }}
              component={Link}
              to="/admin/medical/procedures"
            >
              <ListItemIcon>
                <MedicalServicesIcon />
              </ListItemIcon>
              <ListItemText primary="Procedures" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
};

export default AdminSidebar;
