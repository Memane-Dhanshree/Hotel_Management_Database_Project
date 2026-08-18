import { Box, Toolbar } from "@mui/material";
import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        <Toolbar />

        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;